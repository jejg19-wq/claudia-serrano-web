/* ============================================================
   PORTAL DE CLIENTAS Y ALUMNAS (prototipo)
   - Acceso demo («como si ya hubieras pagado») o con código.
   - Si la persona acaba de reservar o inscribirse, entra directo.
   - Todo se guarda en este dispositivo (localStorage). En producción: login real.
   ============================================================ */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var CS = window.CS; if (!CS || !CS.lessons) return;
  var t = function (x) { return CS.t ? CS.t(x) : x; }, EN = !!CS.en;
  var R = CS.root || '';
  var CODES = ['SERRANO2026', 'PACKAGE1', 'PACKAGE2', 'PACKAGE3'];
  var MONTHS = EN ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var motion = window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Acceso ---------- */
  var auth = CS.store.get('cs-portal', null);
  if (!auth && (CS.store.get('cs-enroll', null) || CS.store.get('cs-bookings', []).length)) auth = { via: 'compra' };
  function enter(via, code) {
    auth = { via: via, code: code || null, at: Date.now() };
    CS.store.set('cs-portal', auth);
    if (!CS.store.get('cs-user', null)) CS.store.set('cs-user', { name: 'Alumna', full: 'Alumna demo' });
    if (!CS.store.get('cs-enroll', null)) {
      var pk = code && /PACKAGE(\d)/.exec(code) ? 'p' + /PACKAGE(\d)/.exec(code)[1] : 'p2';
      var p = CS.packages.filter(function (x) { return x.id === pk; })[0];
      CS.store.set('cs-enroll', { pkg: p.id, name: p.name, price: p.price, mode: 'Online', date: Date.now(), demo: true });
    }
    show();
  }
  $('#demo').addEventListener('click', function () { enter('demo'); });
  $('#code-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = ($('#code').value || '').trim().toUpperCase();
    var ok = CODES.indexOf(v) >= 0;
    $('#code-err').hidden = ok; $('#code').setAttribute('aria-invalid', String(!ok));
    if (ok) enter('codigo', v);
  });
  $('#logout').addEventListener('click', function () { try { localStorage.removeItem('cs-portal'); } catch (e) {} location.href = location.pathname; });

  /* ---------- Portal ---------- */
  function show() {
    $('#gate').hidden = true; $('#app').hidden = false;
    var user = CS.store.get('cs-user', { name: 'Alumna' });
    var enroll = CS.store.get('cs-enroll', null) || { name: 'Package 2', pkg: 'p2' };
    $('#user-name').textContent = t(user.name);
    $('#hello').textContent = t('Hola') + ', ' + t(user.name);
    $('#pkg-label').textContent = t('Academia') + ' · ' + enroll.name + (enroll.mode ? ' · ' + t(enroll.mode) : '') + (enroll.lang ? ' · ' + t(enroll.lang) : '');
    $('#cert-name').textContent = t(user.full || user.name);
    $('#cert-pkg').textContent = 'Makeup Class 1:1 · ' + enroll.name;
    renderLessons(); renderSessions(); renderBookings();
    var tab = (location.hash || '#clases').slice(1);
    openTab($('[data-tab="' + tab + '"]') ? tab : 'clases');
    if (motion) gsap.from('.app__main > section:not([hidden]) > *', { y: 30, opacity: 0, stagger: .08, duration: .9, ease: 'expo.out', clearProps: 'all' });
  }
  function openTab(name) {
    $$('.tab').forEach(function (t) { var on = t.dataset.tab === name; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', String(on)); });
    $$('[data-view]').forEach(function (v) { v.hidden = v.dataset.view !== name; });
    if (history.replaceState) history.replaceState(null, '', '#' + name);
    if (motion) gsap.fromTo('[data-view="' + name + '"]', { y: 16, opacity: .3 }, { y: 0, opacity: 1, duration: .5, ease: 'expo.out', clearProps: 'all' });
  }
  $$('.tab').forEach(function (t) { t.addEventListener('click', function () { openTab(t.dataset.tab); }); });

  /* ---------- Clases en video ---------- */
  var done = CS.store.get('cs-progress', []), current = 0;
  function renderLessons() {
    $('#lessons').innerHTML = CS.lessons.map(function (l, i) {
      return '<button type="button" class="lesson' + (i === current ? ' is-on' : '') + (done.indexOf(l.n) >= 0 ? ' is-done' : '') + '" data-i="' + i + '">' +
        '<img src="' + R + l.poster + '" alt="" width="176" height="112" loading="lazy"><div><b>' + String(l.n).padStart(2, '0') + ' · ' + t(l.title) + '</b><span>' + t(l.pkg) + '</span></div><span class="ok" aria-label="' + (done.indexOf(l.n) >= 0 ? (EN ? 'Watched' : 'Vista') : (EN ? 'Pending' : 'Pendiente')) + '">' + (done.indexOf(l.n) >= 0 ? '✓' : '') + '</span></button>';
    }).join('');
    var pct = Math.round(done.length / CS.lessons.length * 100);
    $('#progress-text').textContent = EN ? done.length + ' of ' + CS.lessons.length + ' lessons watched' : done.length + ' de ' + CS.lessons.length + ' clases vistas';
    $('#progress-pct').textContent = pct + ' %';
    $('#progress-bar').style.width = pct + '%';
    $('#cert-state').textContent = pct >= 100 ? t('Completaste todas tus clases.') : (EN ? 'Available when you complete your lessons (' + pct + '%).' : 'Disponible al completar tus clases (' + pct + ' %).');
    $('#cert-btn').disabled = pct < 100;
  }
  function load(i, play) {
    current = i; var l = CS.lessons[i], v = $('#player');
    v.poster = R + l.poster; v.src = R + l.video;
    $('#lesson-num').textContent = (EN ? 'Lesson ' : 'Lección ') + String(l.n).padStart(2, '0');
    $('#lesson-title').textContent = t(l.title);
    $('#lesson-pkg').textContent = (EN ? 'Included in: ' : 'Incluida en: ') + t(l.pkg);
    $('#mark').textContent = done.indexOf(l.n) >= 0 ? t('Vista ✓') : t('Marcar como vista');
    // Subtítulos: se activan en el idioma de la página
    Array.prototype.forEach.call(v.textTracks || [], function (tr) { tr.mode = tr.language === CS.lang ? 'showing' : 'disabled'; });
    renderLessons();
    if (play) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  }
  $('#lessons').addEventListener('click', function (e) { var b = e.target.closest('.lesson'); if (b) { load(+b.dataset.i, true); if (innerWidth < 980) $('.player').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
  $('#mark').addEventListener('click', function () {
    var n = CS.lessons[current].n;
    if (done.indexOf(n) < 0) { done.push(n); CS.store.set('cs-progress', done); CS.toast(t('Clase marcada como vista')); }
    load(current, false);
  });
  $('#next').addEventListener('click', function () { load((current + 1) % CS.lessons.length, true); });
  $('#player').addEventListener('ended', function () { $('#mark').click(); });
  $('#cert-btn').addEventListener('click', function () { CS.toast(t('Prototipo: aquí se descargará tu certificado en PDF')); });
  load(0, false);

  /* ---------- Clases 1:1 ---------- */
  var sessions = CS.store.get('cs-sessions', []), pick = { day: null, time: null, mode: 'Online' };
  var days = []; for (var d = 1; days.length < 10; d++) { var x = new Date(); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() + d); if (x.getDay() !== 1) days.push(x); }
  $('#s-days').innerHTML = days.map(function (x, i) { return '<button class="chip" type="button" data-i="' + i + '">' + (EN ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'])[x.getDay()] + ' ' + x.getDate() + ' ' + MONTHS[x.getMonth()] + '</button>'; }).join('');
  $('#s-days').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    pick.day = days[+b.dataset.i]; pick.time = null;
    $$('#s-days .chip').forEach(function (c) { c.classList.toggle('is-on', c === b); });
    $('#s-slots').innerHTML = (EN ? ['10:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'] : ['10:00 a. m.', '12:00 p. m.', '3:00 p. m.', '6:00 p. m.']).map(function (h) { return '<button class="slot" type="button" data-t="' + h + '">' + h + '</button>'; }).join('');
    $('#s-book').disabled = true;
  });
  $('#s-slots').addEventListener('click', function (e) {
    var b = e.target.closest('.slot'); if (!b) return; pick.time = b.dataset.t;
    $$('#s-slots .slot').forEach(function (s) { s.classList.toggle('is-on', s === b); });
    $('#s-book').disabled = false;
  });
  $('#s-mode').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return; pick.mode = b.dataset.mode;
    $$('#s-mode .chip').forEach(function (c) { c.classList.toggle('is-on', c === b); });
  });
  $('#s-book').addEventListener('click', function () {
    if (!pick.day || !pick.time) return;
    sessions.push({ day: pick.day.getTime(), time: pick.time, mode: pick.mode });
    CS.store.set('cs-sessions', sessions); renderSessions(); CS.toast(t('Sesión 1:1 agendada'));
    pick.time = null; $$('#s-slots .slot').forEach(function (s) { s.classList.remove('is-on'); }); $('#s-book').disabled = true;
  });
  function renderSessions() {
    var list = sessions.slice().sort(function (a, b) { return a.day - b.day; });
    $('#s-list').innerHTML = list.length ? list.map(function (s, i) {
      var dt = new Date(s.day);
      return '<div class="session" style="background:rgba(245,245,245,.06);color:var(--cream)"><div><b>' + dt.getDate() + ' ' + MONTHS[dt.getMonth()] + ' · ' + s.time + '</b><div class="muted small">' + t(s.mode) + (EN ? ' · with Claudia' : ' · con Claudia') + '</div></div>' +
        (s.mode === 'Online' ? '<button class="btn btn--gold btn--sm" type="button" data-join>' + t('Unirse') + '</button>' : '<span class="small muted">San Antonio</span>') + '</div>';
    }).join('') : '<p class="muted">' + t('Aún no tienes sesiones. Elige un día y una hora.') + '</p>';
  }
  $('#s-list').addEventListener('click', function (e) { if (e.target.closest('[data-join]')) CS.toast(t('Prototipo: aquí se abrirá la videollamada con Claudia')); });

  /* ---------- Mis citas (vienen de la agenda) ---------- */
  function renderBookings() {
    var all = CS.store.get('cs-bookings', []).slice().sort(function (a, b) { return a.date - b.date; });
    $('#bookings').innerHTML = all.length ? all.map(function (b) {
      var svc = CS.services.filter(function (s) { return s.id === b.svc; })[0] || {}, dt = new Date(b.date);
      return '<div class="card" style="grid-template-columns:72px 1fr auto;align-items:center"><img src="' + R + (svc.img || 'assets/img/claudia-studio-smile-md.webp') + '" alt="" width="144" height="176" style="width:72px;height:88px;object-fit:cover;border-radius:10px">' +
        '<div><b class="display d-3" style="font-size:1.2rem">' + t(b.name) + '</b><div class="muted small">' + dt.getDate() + ' ' + MONTHS[dt.getMonth()] + ' ' + dt.getFullYear() + ' · ' + b.time + ' · ' + b.id + '</div></div><span class="tag-example" style="color:#2f6b3a">' + t('Pagada') + '</span></div>';
    }).join('') : '<div class="card"><p class="muted">' + t('Todavía no tienes citas. Cuando reserves en la agenda, aparecen aquí.') + '</p></div>';
  }

  if (auth) show();
})();
