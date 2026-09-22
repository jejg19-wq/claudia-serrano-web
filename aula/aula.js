/* ============================================================
   AULA VIRTUAL · lógica de acceso y reproducción
   Prototipo: el código se valida en el navegador (no es seguridad real).
   En producción se sustituye por Squarespace Courses / Thinkific / Kajabi
   o por un login con backend que sirva los videos solo a alumnas que pagaron.
   ============================================================ */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const data = window.AULA || { codigos: [], lecciones: [], guias: [] };
  const KEY = 'cs-aula-access';
  const gate = $('#gate'), room = $('#room'), form = $('#gate-form'), err = $('#gate-error');
  const lang = () => (window.CS_lang ? CS_lang() : 'es');
  const T = {
    es: { pending: 'Video pendiente de subir', pendingHint: 'Coloca el archivo en', min: 'min', lesson: 'Lección', pkg: 'Incluida en', bad: 'Ese código no es válido. Revisa el mensaje de WhatsApp que te envió Claudia o escríbele.', guide: 'Descargar', noguide: 'Archivo pendiente' },
    en: { pending: 'Video not uploaded yet', pendingHint: 'Place the file at', min: 'min', lesson: 'Lesson', pkg: 'Included in', bad: 'That code is not valid. Check the WhatsApp message Claudia sent you or write to her.', guide: 'Download', noguide: 'File pending' }
  };
  const t = () => T[lang()] || T.es;

  function ok(code) { return data.codigos.map(c => String(c).trim().toUpperCase()).includes(String(code || '').trim().toUpperCase()); }
  function open() { gate.hidden = true; room.hidden = false; render(); window.scrollTo({ top: room.offsetTop - 80, behavior: 'smooth' }); }

  function player(l) {
    if (l.youtube) return `<iframe src="https://www.youtube-nocookie.com/embed/${l.youtube}?rel=0" title="${l.titulo}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0;display:block;background:#000"></iframe>`;
    if (l.vimeo) return `<iframe src="https://player.vimeo.com/video/${l.vimeo}?dnt=1" title="${l.titulo}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0;display:block;background:#000"></iframe>`;
    return `<video controls preload="metadata" playsinline data-file="${l.file}"><source src="${l.file}" type="video/mp4"></video>`;
  }

  function render() {
    const grid = $('#lessons');
    grid.innerHTML = data.lecciones.map(l => `
      <article class="bezel lesson">
        <div class="bezel__core">
          ${player(l)}
          <div class="lesson__body">
            <span class="micro" style="color:var(--gold)">${t().lesson} ${String(l.n).padStart(2, '0')} · ${l.duracion || ''}</span>
            <b>${l.titulo}</b>
            <span>${l.descripcion || ''}</span>
            <span class="micro">${t().pkg}: ${l.paquete || ''}</span>
          </div>
        </div>
      </article>`).join('');
    // Videos que aún no existen → placeholder claro para Jackson/Claudia
    grid.querySelectorAll('video').forEach(v => {
      v.addEventListener('error', () => {
        const box = document.createElement('div');
        box.className = 'lesson__empty';
        box.innerHTML = `<b style="display:block;font-family:var(--font-display);font-size:1.2rem;font-weight:400;margin-bottom:.3rem">${t().pending}</b><span class="small">${t().pendingHint} <code>aula/${v.dataset.file}</code></span>`;
        v.replaceWith(box);
      }, { once: true });
      v.querySelector('source').addEventListener('error', () => v.dispatchEvent(new Event('error')), { once: true });
    });
    const g = $('#guias');
    if (g) g.innerHTML = (data.guias || []).map(x => `<li><a class="link-arrow" href="${x.archivo}" download>${x.titulo} <span class="micro muted">· ${t().guide}</span></a></li>`).join('');
  }

  let saved = null; try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  if (saved && ok(saved)) open();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = $('#codigo').value;
    if (ok(code)) { try { sessionStorage.setItem(KEY, code.trim().toUpperCase()); } catch (err2) {} err.hidden = true; open(); }
    else { err.textContent = t().bad; err.hidden = false; }
  });
  const out = $('#logout');
  if (out) out.addEventListener('click', () => { try { sessionStorage.removeItem(KEY); } catch (e) {} location.reload(); });
  document.addEventListener('langchange', () => { if (!room.hidden) render(); });
})();
