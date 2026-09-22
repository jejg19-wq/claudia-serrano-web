/* ============================================================
   PUERTA DE ACCESO DEL PROTOTIPO
   Pide una clave antes de mostrar el sitio (se recuerda en el dispositivo).
   La clave no está en texto plano: se compara su hash SHA-256.
   Para cambiarla: ejecutar  python -c "import hashlib;print(hashlib.sha256(b'NUEVA').hexdigest())"
   y pegar el resultado en HASH. Para quitar la puerta: borrar la etiqueta <script src="…gate.js"> de las páginas.
   ============================================================ */
(function () {
  var HASH = '35f85825b9016fcc7818aca22298dc88a92ba6e4f029366ff8acbb3f823152d4';   // SHA-256 de la clave
  var FNV = '2e67f716';     // respaldo (FNV-1a) para navegadores sin crypto.subtle (p. ej. file://)
  var KEY = 'cs-site-gate';
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}
  var html = document.documentElement;
  html.classList.add('gate-locked');
  var base = (document.currentScript && document.currentScript.src || '').replace(/assets\/js\/gate\.js.*$/, '');

  function sha256(str) {
    if (!(window.crypto && crypto.subtle && window.TextEncoder)) return Promise.resolve(null);
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    }).catch(function () { return null; });
  }
  function fnv(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(16); }

  function build() {
    var lang = (navigator.language || 'es').slice(0, 2) === 'en' ? 'en' : 'es';
    var T = lang === 'en'
      ? { title: 'Private preview', text: 'Enter the access key to open the site.', ph: 'Access key', btn: 'Enter', bad: 'That key is not correct.', foot: 'Claudia Serrano · Makeup Studio & Academy · San Antonio, TX' }
      : { title: 'Vista privada', text: 'Escribe la clave de acceso para abrir el sitio.', ph: 'Clave de acceso', btn: 'Entrar', bad: 'Esa clave no es correcta.', foot: 'Claudia Serrano · Makeup Studio & Academy · San Antonio, TX' };
    var g = document.createElement('div');
    g.className = 'gate';
    g.innerHTML =
      '<form class="gate__card" autocomplete="off">' +
        '<img class="gate__mono" src="' + base + 'assets/logo/monogram-gold.png" alt="">' +
        '<img class="gate__sig" src="' + base + 'assets/logo/signature-gold.svg" alt="Claudia Serrano">' +
        '<p class="gate__title">' + T.title + '</p>' +
        '<p class="gate__text">' + T.text + '</p>' +
        '<label class="gate__field"><input type="password" name="clave" placeholder="' + T.ph + '" autocapitalize="none" autocorrect="off" spellcheck="false" required></label>' +
        '<button type="submit" class="gate__btn">' + T.btn + '</button>' +
        '<p class="gate__err" hidden>' + T.bad + '</p>' +
        '<p class="gate__foot">' + T.foot + '</p>' +
      '</form>';
    document.body.appendChild(g);
    var form = g.querySelector('form'), input = g.querySelector('input'), err = g.querySelector('.gate__err');
    setTimeout(function () { input.focus(); }, 50);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = (input.value || '').trim().toLowerCase();
      sha256(v).then(function (h) {
        var ok = h ? (h === HASH) : (fnv(v) === FNV);
        if (ok) {
          try { localStorage.setItem(KEY, HASH); } catch (e2) {}
          try { sessionStorage.removeItem('cs-intro-seen'); } catch (e3) {}
          location.reload();
        } else {
          err.hidden = false; input.value = ''; input.focus();
          g.classList.remove('is-shaking'); void g.offsetWidth; g.classList.add('is-shaking');
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
