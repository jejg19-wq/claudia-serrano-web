/* ============================================================
   CLAUDIA SERRANO · app.js (compartido por todas las páginas)
   - Cabecera, menú, carrito (localStorage), avisos
   - Motion design con GSAP + ScrollTrigger + SplitText (+ Lenis en PC)

   Seguridad del motion: nada se oculta en el HTML/CSS. Los estados iniciales
   los pone GSAP solo si cargó y si no hay «reducir movimiento», y una red de
   seguridad completa cualquier animación que no haya disparado.
   ============================================================ */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var CS = window.CS || (window.CS = {});
  var t = function (x) { return CS.t ? CS.t(x) : x; };
  var ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  /* ---------- Aviso breve ---------- */
  var toastEl;
  CS.toast = function (msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2400);
  };

  /* ---------- Almacenamiento seguro ---------- */
  CS.store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- Cabecera: sólida al bajar ---------- */
  var header = $('.header');
  if (header && !header.classList.contains('header--solid')) {
    var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }
  $$('.menu').forEach(function (m) {
    $$('a', m).forEach(function (a) { a.addEventListener('click', function () { m.removeAttribute('open'); }); });
    m.addEventListener('toggle', function () { document.documentElement.style.overflow = m.open ? 'hidden' : ''; if (header) header.classList.toggle('menu-open', m.open); });
  });

  /* ---------- Carrito (prototipo; al conectar Shopify se reemplaza por su API) ---------- */
  var cart = CS.store.get('cs-cart', []);
  function productById(id) { return (CS.products || []).filter(function (p) { return p.id === id; })[0]; }
  function saveCart() { CS.store.set('cs-cart', cart); renderCart(); }
  CS.cartAdd = function (id) {
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.qty += 1; else cart.push({ id: id, qty: 1 });
    saveCart(); var p = productById(id); CS.toast(t(p ? p.name : 'Producto') + ' ' + t('se añadió al carrito'));
  };
  function ensureDrawer() {
    if ($('#cart')) return;
    var d = document.createElement('div');
    d.className = 'drawer'; d.id = 'cart'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="drawer__scrim" data-cart-close></div>' +
      '<aside class="drawer__panel" role="dialog" aria-label="' + t('Carrito') + '">' +
        '<div class="drawer__head"><b class="display d-3">' + t('Tu carrito') + '</b><button class="icon-btn" type="button" data-cart-close aria-label="' + t('Cerrar') + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
        '<div class="drawer__items" id="cart-items"></div>' +
        '<div class="drawer__foot"><div class="total"><span>Subtotal</span><b id="cart-total">$0</b></div>' +
          '<button class="btn btn--block" type="button" id="cart-checkout">' + t('Pagar · Shopify (próximamente)') + '</button>' +
          '<p class="proto">' + t('Prototipo: los productos y precios son de ejemplo. El pago se conectará a la tienda de Shopify.') + '</p></div>' +
      '</aside>';
    document.body.appendChild(d);
    $$('[data-cart-close]', d).forEach(function (b) { b.addEventListener('click', closeCart); });
    $('#cart-checkout').addEventListener('click', function () { CS.toast(t('Prototipo: aquí se abrirá el pago de Shopify')); });
    $('#cart-items').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-q]'); if (!b) return;
      var line = cart.filter(function (l) { return l.id === b.dataset.id; })[0]; if (!line) return;
      line.qty += +b.dataset.q; if (line.qty <= 0) cart = cart.filter(function (l) { return l !== line; });
      saveCart();
    });
  }
  function renderCart() {
    var n = cart.reduce(function (s, l) { return s + l.qty; }, 0);
    $$('.cart-count').forEach(function (c) { c.textContent = n ? n : ''; c.dataset.n = n; });
    var box = $('#cart-items'); if (!box) return;
    if (!cart.length) { box.innerHTML = '<p class="muted">' + t('Tu carrito está vacío. Mira los favoritos de Claudia en la') + ' <a class="link" href="' + (CS.root || '') + 'tienda.html">' + t('tienda') + '</a>.</p>'; }
    else box.innerHTML = cart.map(function (l) {
      var p = productById(l.id); if (!p) return '';
      return '<div class="citem"><img src="' + (CS.root || '') + p.img + '" alt=""><div><b>' + t(p.name) + '</b><div class="muted small">' + CS.money(p.price) + ' · ' + t('ejemplo') + '</div></div>' +
        '<div class="qty"><button type="button" data-q="-1" data-id="' + p.id + '" aria-label="' + t('Quitar uno') + '">−</button><span>' + l.qty + '</span><button type="button" data-q="1" data-id="' + p.id + '" aria-label="' + t('Añadir uno') + '">+</button></div></div>';
    }).join('');
    var total = cart.reduce(function (s, l) { var p = productById(l.id); return s + (p ? p.price * l.qty : 0); }, 0);
    var totEl = $('#cart-total'); if (totEl) totEl.textContent = CS.money(total);
  }
  function openCart() { ensureDrawer(); renderCart(); var d = $('#cart'); d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false'); }
  function closeCart() { var d = $('#cart'); if (!d) return; d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); }
  CS.openCart = openCart;
  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); CS.cartAdd(add.dataset.add); add.classList.add('is-added'); setTimeout(function () { add.classList.remove('is-added'); }, 700); }
    var oc = e.target.closest('[data-cart-open]');
    if (oc) { e.preventDefault(); openCart(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });
  ensureDrawer(); renderCart();

  /* Tarjetas de producto generadas desde los datos (tienda y portada) */
  CS.productCard = function (p) {
    var r = CS.root || '';
    return '<article class="pcard" data-cat="' + p.cat + '" data-anim="up">' +
      '<div class="pcard__img"><img src="' + r + p.img + '" alt="' + t(p.name) + ' (' + t('ejemplo') + ')" width="720" height="900" loading="lazy">' +
      '<span class="tag-example pcard__ex">' + t('Ejemplo') + '</span>' +
      '<button class="pcard__add" type="button" data-add="' + p.id + '" aria-label="+ ' + t(p.name) + '">' + ICON_PLUS + '</button></div>' +
      '<h3>' + t(p.name) + '</h3><div class="pcard__meta"><span>' + t(p.note) + '</span><b>' + CS.money(p.price) + '</b></div></article>';
  };
  $$('[data-products]').forEach(function (box) {
    var list = (CS.products || []).slice(0, +box.dataset.products || 99);
    box.innerHTML = list.map(CS.productCard).join('');
  });


  /* ---------- Visor de fotos del portafolio ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-full]'); if (!b) return;
    var dlg = $('#viewer');
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.className = 'viewer'; dlg.id = 'viewer';
      dlg.innerHTML = '<img alt=""><button type="button" aria-label="' + t('Cerrar') + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
      document.body.appendChild(dlg);
      dlg.addEventListener('click', function (ev) { if (ev.target === dlg || ev.target.closest('button')) dlg.close(); });
    }
    var img = dlg.querySelector('img'); img.src = b.dataset.full; img.alt = b.getAttribute('aria-label') || '';
    if (dlg.showModal) dlg.showModal(); else window.open(b.dataset.full, '_blank');
    if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(img, { scale: .92, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'expo.out' });
  });

  /* ---------- Idioma: traducir textos fijos (antes del motion) ---------- */
  if (CS.translate) CS.translate(document.body);

  /* ---------- Año ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ============================================================
     MOTION DESIGN
     ============================================================ */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 1080px) and (hover: hover) and (pointer: fine)').matches;
  var gsap = window.gsap, ST = window.ScrollTrigger;

  // Videos: se elige horizontal o vertical según la pantalla. Sin JavaScript queda la foto.
  function playVideo(v, src) {
    if (!src) return;
    v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.src = src;
    v.addEventListener('error', function () { v.remove(); }, { once: true });
    v.addEventListener('playing', function () { v.classList.add('is-playing'); }, { once: true });
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  $$('video[data-wide]').forEach(function (v) {
    if (navigator.connection && navigator.connection.saveData) return;
    var tall = window.matchMedia('(max-aspect-ratio: 1/1)').matches, src = tall ? v.dataset.tall : v.dataset.wide;
    if (!('IntersectionObserver' in window)) return playVideo(v, src);
    new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.isIntersecting) { if (!v.src) playVideo(v, src); else { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
        else if (v.src) v.pause();
      });
    }, { rootMargin: '200px 0px' }).observe(v);
  });
  // Video de la sección «El arte del detalle» en teléfono/tableta (en PC se usa la secuencia por scroll)
  $$('video[data-mobile-src]').forEach(function (v) { if (!desktop || reduced || !window.gsap || !window.ScrollTrigger) playVideo(v, v.dataset.mobileSrc); });

  if (!gsap || !ST || reduced) { document.documentElement.classList.add('no-motion'); return; }
  gsap.registerPlugin(ST); if (window.SplitText) gsap.registerPlugin(window.SplitText);
  document.documentElement.classList.add('has-motion');

  var pending = [];   // animaciones de entrada aún no disparadas
  function reveal(el, fromVars, opts) {
    opts = opts || {};
    var targets = opts.targets || el;
    var tl = gsap.from(targets, Object.assign({ duration: 1.1, ease: 'expo.out', paused: true }, fromVars));
    var item = { el: el, tl: tl, done: false };
    pending.push(item);
    ST.create({ trigger: el, start: 'top 96%', once: true, onEnter: function () { item.done = true; tl.play(); } });
  }
  // Red de seguridad: si algo ya está en pantalla o arriba y no se animó, se completa.
  function safety() {
    var vh = window.innerHeight;
    pending.forEach(function (it) {
      if (it.done) return;
      if (it.el.getBoundingClientRect().top < vh * 0.98) { it.done = true; it.tl.play(); }
    });
  }
  var sT; window.addEventListener('scroll', function () { clearTimeout(sT); sT = setTimeout(safety, 160); }, { passive: true });
  window.addEventListener('load', function () { ST.refresh(); setTimeout(safety, 600); });
  setTimeout(safety, 2500);

  // Titulares por líneas (máscara) o por palabras
  $$('[data-split]').forEach(function (el) {
    if (window.SplitText) {
      var split = new window.SplitText(el, { type: 'lines', linesClass: 'split-line' });
      reveal(el, { y: 26, opacity: 0, stagger: 0.1, duration: 1.2 }, { targets: split.lines });
    } else reveal(el, { y: 40, opacity: 0 });
  });
  $$('[data-anim="up"]').forEach(function (el) { reveal(el, { y: 48, opacity: 0 }); });
  $$('[data-anim="fade"]').forEach(function (el) { reveal(el, { opacity: 0, duration: 1.4 }); });
  $$('[data-anim="clip"]').forEach(function (el) {
    reveal(el, { clipPath: 'inset(18% 12% 18% 12% round 24px)', scale: 1.08, duration: 1.5 });
  });
  $$('[data-stagger]').forEach(function (el) {
    reveal(el, { y: 40, opacity: 0, stagger: 0.08 }, { targets: el.children });
  });

  // Parallax suave (solo PC)
  if (desktop) {
    $$('[data-parallax]').forEach(function (el) {
      var amt = +el.dataset.parallax || 10;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------- Portal: intro de marca + entrada del titular ---------- */
  var portal = $('.portal');
  if (portal) {
    var words = $$('.portal__title .word > span');
    var rest = $$('.portal [data-portal]');
    var first = !(sessionStorage && sessionStorage.getItem('cs-intro'));
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (first) {
      try { sessionStorage.setItem('cs-intro', '1'); } catch (e) {}
      var intro = document.createElement('div');
      intro.className = 'intro';
      intro.innerHTML = '<div class="intro__inner"><img class="intro__mono" src="' + (CS.root || '') + 'assets/logo/monogram-gold.png" alt=""><div class="intro__line"></div><div class="intro__word">Makeup Studio &amp; Academy</div></div>';
      document.body.appendChild(intro);
      tl.from('.intro__mono', { opacity: 0, scale: .8, filter: 'blur(8px)', duration: 1 })
        .from('.intro__line', { scaleX: 0, duration: .9 }, '-=.6')
        .from('.intro__word', { opacity: 0, y: 8, duration: .6 }, '-=.5')
        .to(intro, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=.25')
        .add(function () { intro.remove(); });
      setTimeout(function () { if (intro.parentNode) intro.remove(); }, 4500);   // red de seguridad
    }
    tl.fromTo('.portal__frame', { clipPath: 'inset(8% 10% 8% 10% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'expo.inOut', clearProps: 'clipPath' }, first ? '-=1' : 0)
      .from(words, { y: 34, opacity: 0, stagger: .12, duration: 1.3 }, '-=1.9')
      .from(rest, { y: 30, opacity: 0, stagger: .08, duration: 1 }, '-=1');
    setTimeout(function () { tl.progress(1); }, 6000);   // red de seguridad
    if (desktop) gsap.to('.portal__frame', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: portal, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- Reel en arco: crece suave al entrar y el texto circular acompaña (PC) ---------- */
  var arch = $('.reel__arch');
  if (arch && desktop) {
    gsap.fromTo(arch, { scale: .9, borderRadius: '999px 999px 60px 60px' }, { scale: 1, borderRadius: '999px 999px 22px 22px', ease: 'none', scrollTrigger: { trigger: arch, start: 'top 95%', end: 'center 55%', scrub: .6 } });
    gsap.fromTo('.reel__ring', { yPercent: 30 }, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.reel', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- Botones magnéticos y cursor (PC con mouse) ---------- */
  if (desktop) {
    $$('[data-magnetic]').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .3, duration: .4, ease: 'power3.out' });
      });
      b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1, .4)' }); });
    });
    var cursor = document.createElement('div'); cursor.className = 'cursor'; document.body.appendChild(cursor);
    var qx = gsap.quickTo(cursor, 'x', { duration: .35, ease: 'power3' }), qy = gsap.quickTo(cursor, 'y', { duration: .35, ease: 'power3' });
    window.addEventListener('mousemove', function (e) { qx(e.clientX); qy(e.clientY); });
    document.addEventListener('mouseover', function (e) { cursor.classList.toggle('is-big', !!e.target.closest('a, button, .svc, .pcard__img')); });

    // Scroll suave (solo rueda del mouse; en táctil el scroll es nativo)
    if (window.Lenis) {
      var lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { var id = a.getAttribute('href'); if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -70 }); } }); });
    }
  }
})();
