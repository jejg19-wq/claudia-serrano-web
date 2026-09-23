/* ============================================================
   ACADEMIA: inscripción con pago simulado → acceso al portal de alumnas.
   Guarda la inscripción en localStorage (cs-enroll).
   ============================================================ */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var CS = window.CS; if (!CS) return;
  var dlg = $('#enroll'), form = $('#enroll-form'), current = null;
  if (!dlg || typeof dlg.showModal !== 'function') {
    // Navegadores sin <dialog>: se inscribe directo por WhatsApp
    document.addEventListener('click', function (e) { var b = e.target.closest('[data-enroll]'); if (b) location.href = CS.wa('¡Hola Claudia! Quiero inscribirme en el curso ' + b.dataset.enroll.toUpperCase() + '.'); });
    return;
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-enroll]'); if (!b) return;
    current = CS.packages.filter(function (p) { return p.id === b.dataset.enroll; })[0];
    $('#enroll-title').textContent = current.name;
    $('#enroll-price').textContent = CS.money(current.price);
    dlg.showModal();
  });
  $('[data-close]', dlg).addEventListener('click', function () { dlg.close(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    function flag(input, bad) { input.closest('.field').querySelector('.err').hidden = !bad; input.setAttribute('aria-invalid', String(bad)); if (bad) ok = false; }
    flag(form.name, form.name.value.trim().length < 2);
    flag(form.phone, form.phone.value.replace(/\D/g, '').length < 10);
    if (!ok) return;
    var btn = form.querySelector('[type="submit"]'); btn.disabled = true; btn.textContent = 'Procesando…';
    setTimeout(function () {
      CS.store.set('cs-enroll', { pkg: current.id, name: current.name, price: current.price, mode: form.mode.value, date: Date.now() });
      CS.store.set('cs-user', { name: form.name.value.trim().split(' ')[0], full: form.name.value.trim() });
      location.href = 'portal/index.html#clases';
    }, 900);
  });
})();
