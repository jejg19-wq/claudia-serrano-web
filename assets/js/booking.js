/* ============================================================
   AGENDA EN LÍNEA (prototipo)
   Servicio → fecha y hora → datos → pago simulado → confirmación.
   Guarda la cita en localStorage (cs-bookings) para que aparezca en el portal.
   Al conectar la agenda real se reemplazan: disponibilidad, pago y guardado.
   ============================================================ */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var CS = window.CS;
  if (!CS || !CS.services) return;

  var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DOW = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  var SLOTS = ['8:00 a. m.', '9:30 a. m.', '11:00 a. m.', '12:30 p. m.', '2:00 p. m.', '3:30 p. m.', '5:00 p. m.'];
  var state = { step: 1, svc: null, date: null, time: null, data: {} };
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var view = new Date(today.getFullYear(), today.getMonth(), 1);

  /* ---------- Paso 1: servicios ---------- */
  var list = $('#svc-list');
  list.innerHTML = CS.services.map(function (s) {
    return '<button type="button" class="opt" data-id="' + s.id + '" aria-pressed="false"><img src="' + s.img + '" alt="" width="152" height="184"><div><b>' + s.name + '</b><span>' + s.tag + ' · aprox. ' + dur(s.duration) + '</span></div><span class="price">' + (s.from ? '<small class="muted" style="font-family:var(--body);font-size:.6rem;letter-spacing:.14em;display:block">DESDE</small>' : '') + CS.money(s.price) + '</span></button>';
  }).join('');
  list.addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    pickService(b.dataset.id);
  });
  function pickService(id) {
    state.svc = CS.services.filter(function (s) { return s.id === id; })[0] || null;
    $$('.opt', list).forEach(function (o) { var on = state.svc && o.dataset.id === state.svc.id; o.classList.toggle('is-on', on); o.setAttribute('aria-pressed', String(on)); });
    $('[data-panel="1"] [data-next]').disabled = !state.svc;
    $('#f-venue-wrap').hidden = !(state.svc && state.svc.id === 'novia');
    summary();
  }
  var pre = new URLSearchParams(location.search).get('s');
  if (pre) pickService(pre);

  /* ---------- Paso 2: calendario y horarios (disponibilidad de ejemplo) ---------- */
  function seed(d) { return (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % 97; }
  function available(d) {
    if (d < today) return false;
    var max = new Date(today); max.setDate(max.getDate() + 90); if (d > max) return false;
    return d.getDay() !== 1 && seed(d) % 7 !== 3;           // ejemplo: lunes cerrado y algún día lleno
  }
  function renderCal() {
    $('#cal-title').textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
    var first = (view.getDay() + 6) % 7, days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    var html = DOW.map(function (d) { return '<span class="cal__dow">' + d + '</span>'; }).join('');
    for (var i = 0; i < first; i++) html += '<span></span>';
    for (var n = 1; n <= days; n++) {
      var d = new Date(view.getFullYear(), view.getMonth(), n);
      var on = state.date && d.getTime() === state.date.getTime();
      html += '<button type="button" class="day' + (on ? ' is-on' : '') + '" data-d="' + d.getTime() + '"' + (available(d) ? '' : ' disabled') + ' aria-label="' + n + ' de ' + MONTHS[d.getMonth()] + '">' + n + '</button>';
    }
    $('#cal-grid').innerHTML = html;
    $('#cal-prev').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
  }
  $('#cal-prev').addEventListener('click', function () { view.setMonth(view.getMonth() - 1); renderCal(); });
  $('#cal-next').addEventListener('click', function () { view.setMonth(view.getMonth() + 1); renderCal(); });
  $('#cal-grid').addEventListener('click', function (e) {
    var b = e.target.closest('.day'); if (!b || b.disabled) return;
    state.date = new Date(+b.dataset.d); state.time = null; renderCal(); renderSlots(); summary(); check2();
  });
  function renderSlots() {
    $('#slots-wrap').hidden = !state.date; if (!state.date) return;
    $('#slots-title').textContent = 'Horarios para el ' + longDate(state.date);
    var s = seed(state.date);
    $('#slots').innerHTML = SLOTS.map(function (t, i) {
      var busy = (s + i * 5) % 4 === 0;
      return '<button type="button" class="slot' + (state.time === t ? ' is-on' : '') + '" data-t="' + t + '"' + (busy ? ' disabled aria-label="' + t + ' ocupado"' : '') + '>' + t + '</button>';
    }).join('');
  }
  $('#slots').addEventListener('click', function (e) {
    var b = e.target.closest('.slot'); if (!b || b.disabled) return;
    state.time = b.dataset.t; renderSlots(); summary(); check2();
  });
  function check2() { $('[data-panel="2"] [data-next]').disabled = !(state.date && state.time); }

  /* ---------- Paso 3: datos con validación ---------- */
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, ok = true;
    function flag(input, bad) { input.closest('.field').querySelector('.err').hidden = !bad; input.setAttribute('aria-invalid', String(bad)); if (bad) ok = false; }
    flag(f.name, f.name.value.trim().length < 2);
    flag(f.phone, f.phone.value.replace(/\D/g, '').length < 10);
    flag(f.email, !!f.email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value));
    if (!ok) { var first = f.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }
    state.data = { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), venue: f.venue.value.trim(), notes: f.notes.value.trim() };
    go(4);
  });

  /* ---------- Paso 4: pago simulado ---------- */
  $('#pay').addEventListener('click', function () {
    var btn = this; btn.disabled = true; btn.textContent = 'Procesando…';
    setTimeout(function () {
      var booking = { id: 'CS-' + Date.now().toString(36).toUpperCase(), svc: state.svc.id, name: state.svc.name, price: state.svc.price, date: state.date.getTime(), time: state.time, client: state.data, paid: true, created: Date.now() };
      var all = CS.store.get('cs-bookings', []); all.push(booking); CS.store.set('cs-bookings', all);
      CS.store.set('cs-user', { name: state.data.name.split(' ')[0], full: state.data.name });
      state.booking = booking;
      $('#done-text').textContent = state.svc.name + ' · ' + longDate(state.date) + ' a las ' + state.time + '. Código de reserva: ' + booking.id + '. Claudia te escribirá por WhatsApp para los detalles.';
      $('#wa-confirm').href = CS.wa('¡Hola Claudia! Acabo de reservar en la página: ' + state.svc.name + ', ' + longDate(state.date) + ' a las ' + state.time + '. Código ' + booking.id + '. Soy ' + state.data.name + '.');
      go(5);
      if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.from('.done__check', { scale: 0, rotate: -90, duration: .9, ease: 'back.out(2)' });
    }, 1100);
  });
  $('#ics').addEventListener('click', function () {
    var b = state.booking; if (!b) return;
    var start = toDate(b.date, b.time), end = new Date(start.getTime() + (state.svc.duration || 90) * 60000);
    var fmt = function (d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Claudia Serrano//Agenda//ES', 'BEGIN:VEVENT', 'UID:' + b.id + '@claudiaserrano', 'DTSTAMP:' + fmt(new Date()), 'DTSTART:' + fmt(start), 'DTEND:' + fmt(end),
      'SUMMARY:' + b.name + ' con Claudia Serrano', 'LOCATION:San Antonio, TX', 'DESCRIPTION:Código ' + b.id + '. WhatsApp +1 (210) 793-5636', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'cita-claudia-serrano.ics'; a.click();
  });

  /* ---------- Navegación entre pasos ---------- */
  function go(n) {
    state.step = n;
    $$('[data-panel]').forEach(function (p) { p.hidden = +p.dataset.panel !== n; });
    $$('#steps li').forEach(function (li) { var s = +li.dataset.step; li.classList.toggle('is-on', s === n); li.classList.toggle('is-done', s < n); });
    if (n === 2) { if (state.date) view = new Date(state.date.getFullYear(), state.date.getMonth(), 1); renderCal(); renderSlots(); check2(); }
    if (n === 4) { $('#pay-total').textContent = (state.svc.from ? 'Desde ' : '') + CS.money(state.svc.price); $('#pay-note').textContent = state.svc.from ? 'El precio de novia es desde $350; Claudia confirma el total según tu look.' : 'Precio publicado del servicio.'; }
    var top = $('#wizard').getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
    var panel = $('[data-panel="' + n + '"]');
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(panel, { y: 24, opacity: .2 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', clearProps: 'all' });
  }
  $$('[data-next]').forEach(function (b) { b.addEventListener('click', function () { go(state.step + 1); }); });
  $$('[data-prev]').forEach(function (b) { b.addEventListener('click', function () { go(state.step - 1); }); });

  /* ---------- Resumen ---------- */
  function summary() {
    var s = state.svc;
    $('#sum-name').textContent = s ? s.name : 'Elige un servicio';
    if (s) $('#sum-img').src = s.img;
    $('#sum-date').textContent = state.date ? longDate(state.date) : '—';
    $('#sum-time').textContent = state.time || '—';
    $('#sum-dur').textContent = s ? dur(s.duration) : '—';
    $('#sum-total').textContent = s ? (s.from ? 'Desde ' : '') + CS.money(s.price) : '—';
  }
  function dur(min) { var h = Math.floor(min / 60), m = min % 60; return (h ? h + ' h' : '') + (m ? ' ' + m + ' min' : ''); }
  function longDate(d) { var w = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][d.getDay()]; return w + ' ' + d.getDate() + ' de ' + MONTHS[d.getMonth()]; }
  function toDate(ms, t) { var d = new Date(ms), m = t.match(/(\d+):(\d+)\s*([ap])/i), h = +m[1] % 12 + (m[3].toLowerCase() === 'p' ? 12 : 0); d.setHours(h, +m[2], 0, 0); return d; }

  go(1); summary();
})();
