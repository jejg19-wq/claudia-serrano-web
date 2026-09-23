/* TIENDA: filtros por categoría (las tarjetas las pinta app.js desde data.js) */
(function () {
  var chips = document.querySelectorAll('[data-filter]'), grid = document.getElementById('grid');
  if (!grid) return;
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.toggle('is-on', x === c); });
      grid.querySelectorAll('.pcard').forEach(function (card) {
        var show = c.dataset.filter === 'all' || card.dataset.cat === c.dataset.filter;
        card.hidden = !show;
        if (show) { card.style.opacity = ''; card.style.transform = ''; }
      });
      if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(grid.querySelectorAll('.pcard:not([hidden])'), { y: 20, opacity: .3 }, { y: 0, opacity: 1, stagger: .05, duration: .5, ease: 'expo.out', clearProps: 'all' });
    });
  });
})();
