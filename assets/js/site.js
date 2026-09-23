/* ============================================================
   CLAUDIA SERRANO · site.js
   Solo mejoras: idioma ES/EN, cerrar el menú al tocar un enlace y el año.
   La página funciona completa sin este archivo (enlaces de WhatsApp fijos en el HTML).
   ============================================================ */
window.SITE = {
  whatsapp: '12107935636',               // +1 (210) 793-5636
  instagram: 'claudiasserrano',
  email: 'claudiaserranoinfo@gmail.com'
};

(function () {
  var html = document.documentElement;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Idioma (la traducción al inglés es cortesía; Claudia atiende en español) ---------- */
  var KEY = 'cs-lang';
  function getLang() { try { return localStorage.getItem(KEY) || 'es'; } catch (e) { return 'es'; } }
  function applyLang(lang) {
    html.lang = lang;
    $$('[data-en]').forEach(function (el) {
      if (el.dataset.es === undefined) el.dataset.es = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.es;
    });
    $$('[data-en-aria]').forEach(function (el) {
      if (el.dataset.esAria === undefined) el.dataset.esAria = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.esAria);
    });
    $$('.lang button').forEach(function (b) { b.classList.toggle('is-on', b.dataset.lang === lang); b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    try { document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } })); } catch (e) {}
  }
  window.CS_lang = function () { return html.lang === 'en' ? 'en' : 'es'; };
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.dataset.lang); }); });
  if (getLang() === 'en') applyLang('en');

  /* ---------- Menú móvil (<details>): se cierra al elegir una sección ---------- */
  $$('.menu').forEach(function (menu) {
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.removeAttribute('open'); }); });
    menu.addEventListener('toggle', function () { document.body.style.overflow = menu.open ? 'hidden' : ''; });
  });

  /* ---------- Video de portada: si el navegador no lo reproduce, queda la foto ---------- */
  $$('video[autoplay]').forEach(function (v) {
    var p = v.play && v.play();
    if (p && p.catch) p.catch(function () { v.remove(); });
    v.addEventListener('error', function () { v.remove(); });
  });

  /* ---------- Año ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
