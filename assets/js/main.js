/* ============================================================
   CLAUDIA SERRANO · main.js
   Intro cinematográfica · nav flotante · reveals · idioma ES/EN ·
   formularios → WhatsApp · galería · pestañas · utilidades
   ============================================================ */

/* ---------- CONFIGURACIÓN DEL SITIO (cambiar aquí, una sola vez) ---------- */
window.SITE = {
  brand: 'Claudia Serrano · Makeup Studio & Academy',
  whatsapp: '12107935636',            // WhatsApp de Claudia: +1 (210) 793-5636
  phoneDisplay: '(210) 793-5636',     // número visible
  email: 'claudiaserranoinfo@gmail.com', // correo de Claudia
  instagram: 'claudiasserrano',       // instagram.com/claudiasserrano
  tiktok: 'claudiasserrano',          // ← confirmar handle de TikTok
  city: 'San Antonio, TX',
  bookingDeposit: 0.30                // 30% de depósito al reservar
};

(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const html = document.documentElement;
  const forceMotion = location.hash === '#intro';           // #intro fuerza la experiencia completa
  const isStatic = /[?&]static=1/.test(location.search);      // ?static=1 = modo captura, sin animaciones
  const reduced = !forceMotion && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isStatic);
  if (!isStatic) html.classList.add('js'); else html.classList.add('is-static');
  if (forceMotion) html.classList.add('force-motion');

  /* ---------- IDIOMA ---------- */
  const LANG_KEY = 'cs-lang';
  function getLang() { try { return localStorage.getItem(LANG_KEY) || 'es'; } catch (e) { return 'es'; } }
  function applyLang(lang) {
    html.lang = lang;
    html.dataset.lang = lang;
    $$('[data-en]').forEach(el => {
      if (el.dataset.es === undefined) el.dataset.es = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.es;
    });
    $$('[data-en-placeholder]').forEach(el => {
      if (el.dataset.esPlaceholder === undefined) el.dataset.esPlaceholder = el.placeholder;
      el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
    });
    $$('[data-en-aria]').forEach(el => {
      if (el.dataset.esAria === undefined) el.dataset.esAria = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.esAria);
    });
    $$('.lang button').forEach(b => b.classList.toggle('is-on', b.dataset.lang === lang));
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }
  window.CS_applyLang = applyLang;
  window.CS_lang = () => html.dataset.lang || 'es';
  applyLang(getLang());
  $$('.lang button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ---------- WHATSAPP / CONTACTO ---------- */
  function waLink(text) {
    return 'https://wa.me/' + SITE.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  window.CS_waLink = waLink;
  function wireContacts() {
    const lang = CS_lang();
    const hello = lang === 'en'
      ? 'Hi Claudia! I found your website and I would like more information.'
      : '¡Hola Claudia! Vi tu página web y me gustaría más información.';
    $$('[data-wa]').forEach(a => { a.href = waLink(a.dataset.waText || hello); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-phone]').forEach(el => { el.textContent = SITE.phoneDisplay; el.href = 'tel:+' + SITE.whatsapp; });
    $$('[data-email]').forEach(el => { el.textContent = SITE.email; el.href = 'mailto:' + SITE.email; });
    $$('[data-instagram]').forEach(el => { el.href = 'https://instagram.com/' + SITE.instagram; el.target = '_blank'; el.rel = 'noopener'; });
    $$('[data-tiktok]').forEach(el => { el.href = 'https://tiktok.com/@' + SITE.tiktok; el.target = '_blank'; el.rel = 'noopener'; });
    $$('[data-ig-handle]').forEach(el => { el.textContent = '@' + SITE.instagram; });
  }
  wireContacts();
  document.addEventListener('langchange', wireContacts);

  /* ---------- INTRO CINEMATOGRÁFICA (motion de entrada) ---------- */
  const intro = $('#intro');
  const INTRO_KEY = 'cs-intro-seen';
  let seen = false;
  try { seen = sessionStorage.getItem(INTRO_KEY) === '1'; } catch (e) {}
  const forceIntro = forceMotion;
  function finishIntro() {
    if (!intro) return;
    intro.classList.add('is-leaving');
    try { sessionStorage.setItem(INTRO_KEY, '1'); } catch (e) {}
    document.body.classList.remove('is-locked');
    setTimeout(() => { document.body.classList.add('is-ready'); }, 250);
    setTimeout(() => { intro.hidden = true; scrollToHash(); }, 1500);
  }
  function scrollToHash() {
    if (location.hash && location.hash !== '#intro') {
      const t = document.querySelector(location.hash);
      if (t) t.scrollIntoView({ block: 'start' });
    }
  }
  const gated = html.classList.contains('gate-locked');
  if (intro && !gated && !reduced && (!seen || forceIntro)) {
    document.body.classList.add('is-locked');
    setTimeout(() => intro.classList.add('is-playing'), 40);
    const t = setTimeout(finishIntro, 3100);
    const skip = $('.intro__skip', intro);
    if (skip) skip.addEventListener('click', () => { clearTimeout(t); finishIntro(); });
  } else if (intro && !gated && reduced && !isStatic && !seen) {
    // Movimiento reducido: splash estático de marca, breve y sin animación
    const t = setTimeout(finishIntro, 1400);
    const skip = $('.intro__skip', intro);
    if (skip) skip.addEventListener('click', () => { clearTimeout(t); finishIntro(); });
  } else {
    if (intro) intro.hidden = true;
    requestAnimationFrame(() => document.body.classList.add('is-ready'));
  }

  /* ---------- VIDEO HERO (solo escritorio, respeta datos) ---------- */
  const video = $('video[data-src]');
  if (video) {
    const okDevice = window.innerWidth >= 768 && !(navigator.connection && navigator.connection.saveData) && !reduced;
    if (okDevice) {
      const start = () => {
        video.src = video.dataset.src;
        video.addEventListener('canplay', () => { video.classList.add('is-loaded'); video.play().catch(() => {}); }, { once: true });
        video.addEventListener('error', () => video.remove(), { once: true });
        video.play().catch(() => {});
      };
      // Arranca tras la intro para no competir por ancho de banda
      setTimeout(start, intro && !seen ? 1800 : 100);
    } else {
      video.remove();
    }
  }

  /* ---------- NAV FLOTANTE ---------- */
  const nav = $('#nav');
  const menu = $('#menu');
  const burger = $('[data-menu-toggle]');
  let lastY = window.scrollY, ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 40);
      if (y > 320 && y > lastY + 6 && !(menu && menu.classList.contains('is-open'))) nav.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 320) nav.classList.remove('is-hidden');
    }
    const hint = $('.scroll-hint');
    if (hint) hint.style.opacity = y > 120 ? '0' : '';
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  function toggleMenu(force) {
    if (!menu || !burger) return;
    const open = force !== undefined ? force : !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
    if (open) nav.classList.remove('is-hidden');
  }
  if (burger) burger.addEventListener('click', () => toggleMenu());
  if (menu) $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleMenu(false); closeLightbox(); } });
  // Enlace activo
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav__links a, .menu__links a').forEach(a => { if (a.getAttribute('href') === path) a.classList.add('is-active'); });

  /* ---------- REVEALS AL SCROLL ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal], [data-reveal-stagger]').forEach(el => io.observe(el));
  } else {
    $$('[data-reveal], [data-reveal-stagger]').forEach(el => el.classList.add('is-in'));
  }
  // Red de seguridad: lo que ya está en pantalla se muestra aunque el observer no dispare (miniaturas, capturas)
  const revealSafety = () => $$('[data-reveal]:not(.is-in), [data-reveal-stagger]:not(.is-in)').forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in'); });
  setTimeout(revealSafety, 1200);
  window.addEventListener('load', () => setTimeout(revealSafety, 400));
  window.addEventListener('hashchange', () => setTimeout(revealSafety, 200));

  /* ---------- CONTADORES ---------- */
  const counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target, end = parseFloat(el.dataset.count), prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
        const t0 = performance.now(), dur = reduced ? 1 : 1600;
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
          el.textContent = prefix + Math.round(end * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  }

  /* ---------- MARQUESINA (duplicar para loop continuo) ---------- */
  $$('.marquee__track').forEach(track => { track.innerHTML += track.innerHTML; });

  /* ---------- PESTAÑAS ---------- */
  $$('[data-tabs]').forEach(group => {
    const name = group.dataset.tabs;
    const buttons = $$('[data-tab]', group);
    const panels = $$('[data-tab-panel][data-tab-group="' + name + '"]');
    buttons.forEach(b => b.addEventListener('click', () => {
      buttons.forEach(x => x.classList.toggle('is-on', x === b));
      panels.forEach(p => p.classList.toggle('is-on', p.dataset.tabPanel === b.dataset.tab));
      panels.forEach(p => { if (p.classList.contains('is-on')) $$('[data-reveal], [data-reveal-stagger]', p).forEach(r => r.classList.add('is-in')); });
    }));
  });

  /* ---------- GALERÍA: filtros + lightbox ---------- */
  const filters = $('[data-filters]');
  if (filters) {
    const figs = $$('[data-cat]');
    $$('button', filters).forEach(b => b.addEventListener('click', () => {
      $$('button', filters).forEach(x => x.classList.toggle('is-on', x === b));
      const f = b.dataset.filter;
      figs.forEach(fig => fig.classList.toggle('is-hidden', f !== 'all' && fig.dataset.cat !== f));
    }));
  }
  let lightbox = $('#lightbox');
  function closeLightbox() { if (lightbox) lightbox.classList.remove('is-open'); }
  if (lightbox) {
    $$('[data-lightbox]').forEach(el => el.addEventListener('click', (e) => {
      e.preventDefault();
      $('img', lightbox).src = el.dataset.lightbox;
      $('img', lightbox).alt = el.querySelector('img') ? el.querySelector('img').alt : '';
      lightbox.classList.add('is-open');
    }));
    lightbox.addEventListener('click', closeLightbox);
  }

  /* ---------- FORMULARIOS → WhatsApp (sin backend en el prototipo) ---------- */
  $$('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const kind = form.dataset.form;
      const data = Object.fromEntries(new FormData(form).entries());
      const lang = CS_lang();
      let msg = '';
      if (kind === 'inquiry') {
        const lines = lang === 'en'
          ? ['Hi Claudia! I would like a quote:', 'Name: ' + data.nombre, 'Event: ' + (form.dataset.event || ''), 'Date: ' + data.fecha, 'Venue / area: ' + data.lugar, 'People: ' + data.personas, 'Contact: ' + data.contacto]
          : ['¡Hola Claudia! Quisiera una cotización:', 'Nombre: ' + data.nombre, 'Evento: ' + (form.dataset.event || ''), 'Fecha: ' + data.fecha, 'Lugar / zona: ' + data.lugar, 'Personas: ' + data.personas, 'Contacto: ' + data.contacto];
        msg = lines.join('\n');
      } else if (kind === 'academy') {
        const L = lang === 'en';
        msg = [L ? 'Hi Claudia! I want to enroll in the makeup classes.' : '¡Hola Claudia! Quiero inscribirme en los cursos de maquillaje.',
          (L ? 'Name: ' : 'Nombre: ') + data.nombre, (L ? 'Package: ' : 'Paquete: ') + data.paquete,
          (L ? 'Format: ' : 'Modalidad: ') + data.modalidad, (L ? 'Contact: ' : 'Contacto: ') + data.contacto].join(String.fromCharCode(10));
      } else if (kind === 'contact') {
        msg = (lang === 'en' ? 'Hi Claudia! ' : '¡Hola Claudia! ') + (data.nombre ? data.nombre + ' — ' : '') + (data.mensaje || '');
      }
      if (msg) window.open(waLink(msg), '_blank', 'noopener');
      form.classList.add('is-sent');
      try { localStorage.setItem('cs-lead-' + Date.now(), JSON.stringify({ kind, data })); } catch (err) {}
    });
  });

  /* ---------- BOTONES MAGNÉTICOS (solo puntero fino) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    $$('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + x * 0.18 + 'px,' + y * 0.18 + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Año en footer ---------- */
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
