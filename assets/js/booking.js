/* ============================================================
   CLAUDIA SERRANO · booking.js
   Flujo de reserva instantánea (prototipo funcional, sin backend)
   Servicio → Fecha y hora → Datos → Depósito → Confirmación (.ics + WhatsApp)
   En producción se conecta a Acuity / Square / GlossGenius (ver README)
   ============================================================ */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = $('#booking');
  if (!root) return;

  const T = {
    es: {
      months: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
      dows: ['L','M','X','J','V','S','D'],
      studio: 'En estudio', home: 'A domicilio', min: 'min',
      pick: 'Elige un día para ver horarios', none: 'Sin horarios disponibles ese día — prueba otro',
      closed: 'Cerrado los lunes', deposit: 'Depósito (30 %)', balance: 'Saldo el día de la cita',
      service: 'Servicio', date: 'Fecha', time: 'Hora', where: 'Lugar', total: 'Total',
      confirmTitle: '¡Tu cita está apartada!', confirmText: 'Te enviamos la confirmación por WhatsApp y correo. El saldo se paga el día de la cita.',
      ics: 'Agregar a mi calendario', wa: 'Confirmar por WhatsApp',
      waMsg: (s) => `¡Hola Claudia! Acabo de reservar: ${s.service} · ${s.date} a las ${s.time} (${s.where}). Nombre: ${s.name}.`,
      demo: 'Prototipo: aquí se integrará el cobro del depósito con Stripe / Square (tarjeta, Apple Pay, Zelle o Venmo).'
    },
    en: {
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      dows: ['M','T','W','T','F','S','S'],
      studio: 'At the studio', home: 'On location', min: 'min',
      pick: 'Pick a day to see available times', none: 'No times available that day — try another',
      closed: 'Closed on Mondays', deposit: 'Deposit (30%)', balance: 'Balance due on the day',
      service: 'Service', date: 'Date', time: 'Time', where: 'Where', total: 'Total',
      confirmTitle: 'Your appointment is reserved!', confirmText: 'We sent your confirmation by WhatsApp and email. The balance is paid on the day of your appointment.',
      ics: 'Add to my calendar', wa: 'Confirm on WhatsApp',
      waMsg: (s) => `Hi Claudia! I just booked: ${s.service} · ${s.date} at ${s.time} (${s.where}). Name: ${s.name}.`,
      demo: 'Prototype: deposit payment will be integrated here with Stripe / Square (card, Apple Pay, Zelle or Venmo).'
    }
  };
  const L = () => T[(window.CS_lang && CS_lang()) || 'es'];

  const SERVICES = [
    { id: 'glam-estudio', es: 'Sesión glam · estudio', en: 'Glam session · studio', price: 110, dur: 75, where: 'studio', descEs: 'Evento, gala, foto o cita especial. Incluye pestañas y kit de retoque.', descEn: 'Event, gala, photo shoot or special date. Lashes and touch-up kit included.' },
    { id: 'glam-domicilio', es: 'Sesión glam · a domicilio', en: 'Glam session · on location', price: 135, dur: 90, where: 'home', descEs: 'Llego a tu casa u hotel dentro del Loop 1604. Fuera: $1 por milla.', descEn: 'I come to your home or hotel inside Loop 1604. Outside: $1 per mile.' },
    { id: 'clase-1a1', es: 'Clase 1:1 de automaquillaje', en: '1:1 self-makeup class', price: 175, dur: 90, where: 'studio', descEs: '90 minutos, tu rostro y tus productos. Te llevas tu rutina paso a paso.', descEn: '90 minutes, your face and your products. Leave with your step-by-step routine.' },
    { id: 'trial-novia', es: 'Prueba de novia', en: 'Bridal trial', price: 110, dur: 120, where: 'studio', descEs: 'Diseñamos tu soft glam nupcial. Se descuenta 50 % si reservas tu boda.', descEn: 'We design your bridal soft glam. 50% credited when you book your wedding.' },
    { id: 'trial-quince', es: 'Prueba de quinceañera', en: 'Quinceañera trial', price: 95, dur: 105, where: 'studio', descEs: 'Ensayo completo 2–4 semanas antes. Mamá bienvenida.', descEn: 'Full rehearsal 2–4 weeks before. Mom welcome.' },
    { id: 'retoque', es: 'Retoque exprés', en: 'Express touch-up', price: 60, dur: 40, where: 'studio', descEs: 'Piel, ojos y labios en 40 minutos para una cita o foto de último momento.', descEn: 'Skin, eyes and lips in 40 minutes for a last-minute date or photo.' }
  ];
  const SLOTS = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00'];

  const state = { step: 1, service: null, date: null, time: null, name: '', contact: '', email: '', notes: '' };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let view = new Date(today.getFullYear(), today.getMonth(), 1);

  const panels = $$('.booking__panel', root);
  const stepsBar = $$('.booking__steps span', root);

  /* Pseudo-aleatorio determinista: mismos horarios ocupados para la misma fecha (realismo del prototipo) */
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function busySlots(d) { const h = hash(iso(d)); return SLOTS.filter((s, i) => ((h >> i) & 3) === 0); }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fmtDate(d) { const l = L(); return d.getDate() + ' ' + (CS_lang() === 'en' ? l.months[d.getMonth()] : 'de ' + l.months[d.getMonth()]) + ' ' + d.getFullYear(); }
  function money(n) { return '$' + n.toFixed(0); }

  /* ---------- Paso 1: servicios ---------- */
  function renderServices() {
    const grid = $('#svc-grid');
    const lang = CS_lang();
    grid.innerHTML = SERVICES.map(s => `
      <button type="button" class="svc bezel ${state.service && state.service.id === s.id ? 'is-on' : ''}" data-svc="${s.id}">
        <span class="bezel__core">
          <span class="svc__head"><span class="svc__name">${lang === 'en' ? s.en : s.es}</span><span class="svc__price">${money(s.price)}</span></span>
          <p>${lang === 'en' ? s.descEn : s.descEs}</p>
          <span class="svc__meta">${s.dur} ${L().min} · ${s.where === 'home' ? L().home : L().studio}</span>
        </span>
      </button>`).join('');
    $$('[data-svc]', grid).forEach(b => b.addEventListener('click', () => {
      state.service = SERVICES.find(s => s.id === b.dataset.svc);
      $$('[data-svc]', grid).forEach(x => x.classList.toggle('is-on', x === b));
      renderSummary();
      $('#next-1').disabled = false;
    }));
  }

  /* ---------- Paso 2: calendario ---------- */
  function renderCalendar() {
    const l = L();
    $('#cal-title').textContent = l.months[view.getMonth()] + ' ' + view.getFullYear();
    const grid = $('#cal-grid');
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // lunes = 0
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const max = new Date(today); max.setDate(max.getDate() + 90);
    let html = l.dows.map(d => `<span class="calendar__dow">${d}</span>`).join('');
    for (let i = 0; i < offset; i++) html += '<span></span>';
    for (let d = 1; d <= days; d++) {
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const disabled = date <= today || date > max || date.getDay() === 1;
      const few = !disabled && busySlots(date).length >= 3;
      const on = state.date && iso(state.date) === iso(date);
      html += `<button type="button" class="day ${on ? 'is-on' : ''} ${few ? 'has-few' : ''}" data-date="${iso(date)}" ${disabled ? 'disabled' : ''}>${d}</button>`;
    }
    grid.innerHTML = html;
    $$('.day:not(:disabled)', grid).forEach(b => b.addEventListener('click', () => {
      const [y, m, dd] = b.dataset.date.split('-').map(Number);
      state.date = new Date(y, m - 1, dd); state.time = null;
      $$('.day', grid).forEach(x => x.classList.toggle('is-on', x === b));
      renderSlots(); renderSummary();
      $('#next-2').disabled = true;
    }));
    const prevDisabled = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();
    $('#cal-prev').disabled = prevDisabled;
    $('#cal-note').textContent = l.closed;
  }
  function renderSlots() {
    const box = $('#slots'); const l = L();
    if (!state.date) { box.innerHTML = `<p class="muted small">${l.pick}</p>`; return; }
    const busy = busySlots(state.date);
    const free = SLOTS.filter(s => !busy.includes(s));
    if (!free.length) { box.innerHTML = `<p class="muted small">${l.none}</p>`; return; }
    box.innerHTML = '<div class="slots">' + SLOTS.map(s => `<button type="button" class="slot ${state.time === s ? 'is-on' : ''}" data-slot="${s}" ${busy.includes(s) ? 'disabled' : ''}>${s}</button>`).join('') + '</div>';
    $$('.slot:not(:disabled)', box).forEach(b => b.addEventListener('click', () => {
      state.time = b.dataset.slot;
      $$('.slot', box).forEach(x => x.classList.toggle('is-on', x === b));
      renderSummary(); $('#next-2').disabled = false;
    }));
  }
  $('#cal-prev').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); });
  $('#cal-next').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); });

  /* ---------- Resumen lateral ---------- */
  function renderSummary() {
    const l = L(); const s = state.service; const lang = CS_lang();
    const box = $('#summary-body');
    if (!s) { box.innerHTML = `<p class="muted small">${lang === 'en' ? 'Select a service to see your summary.' : 'Elige un servicio para ver tu resumen.'}</p>`; return; }
    const dep = Math.round(s.price * SITE.bookingDeposit);
    box.innerHTML = `
      <dl>
        <div><dt>${l.service}</dt><dd>${lang === 'en' ? s.en : s.es}</dd></div>
        <div><dt>${l.date}</dt><dd>${state.date ? fmtDate(state.date) : '—'}</dd></div>
        <div><dt>${l.time}</dt><dd>${state.time || '—'}</dd></div>
        <div><dt>${l.where}</dt><dd>${s.where === 'home' ? l.home : l.studio}</dd></div>
      </dl>
      <div class="summary__total"><span>${l.total}</span><b>${money(s.price)}</b></div>
      <dl>
        <div><dt>${l.deposit}</dt><dd>${money(dep)}</dd></div>
        <div><dt>${l.balance}</dt><dd>${money(s.price - dep)}</dd></div>
      </dl>`;
  }

  /* ---------- Navegación de pasos ---------- */
  function go(step) {
    state.step = step;
    panels.forEach(p => p.classList.toggle('is-on', Number(p.dataset.step) === step));
    stepsBar.forEach((s, i) => { s.classList.toggle('is-on', i + 1 === step); s.classList.toggle('is-done', i + 1 < step); });
    if (step === 2) { renderCalendar(); renderSlots(); }
    if (step === 4) renderReview();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  $('#next-1').addEventListener('click', () => go(2));
  $('#next-2').addEventListener('click', () => go(3));
  $('#back-2').addEventListener('click', () => go(1));
  $('#back-3').addEventListener('click', () => go(2));
  $('#back-4').addEventListener('click', () => go(3));
  $('#form-details').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target; if (!f.checkValidity()) { f.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(f).entries());
    state.name = d.nombre; state.contact = d.contacto; state.email = d.email; state.notes = d.notas || '';
    go(4);
  });
  function renderReview() {
    const l = L(); const s = state.service; const lang = CS_lang();
    const dep = Math.round(s.price * SITE.bookingDeposit);
    $('#review').innerHTML = `
      <dl>
        <div><dt>${l.service}</dt><dd>${lang === 'en' ? s.en : s.es}</dd></div>
        <div><dt>${l.date}</dt><dd>${fmtDate(state.date)} · ${state.time}</dd></div>
        <div><dt>${lang === 'en' ? 'Name' : 'Nombre'}</dt><dd>${state.name}</dd></div>
        <div><dt>${lang === 'en' ? 'Contact' : 'Contacto'}</dt><dd>${state.contact}</dd></div>
      </dl>
      <div class="summary__total"><span>${l.deposit}</span><b>${money(dep)}</b></div>
      <p class="demo-note">${l.demo}</p>`;
    $('#pay-label').textContent = (lang === 'en' ? 'Pay deposit ' : 'Pagar depósito ') + money(dep);
  }
  $('#pay').addEventListener('click', () => {
    const s = state.service; const lang = CS_lang(); const l = L();
    const summary = { service: lang === 'en' ? s.en : s.es, date: fmtDate(state.date), time: state.time, where: s.where === 'home' ? l.home : l.studio, name: state.name };
    // .ics para el calendario de la clienta
    const [hh, mm] = state.time.split(':').map(Number);
    const start = new Date(state.date); start.setHours(hh, mm, 0, 0);
    const end = new Date(start.getTime() + s.dur * 60000);
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = (d) => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Claudia Serrano Makeup Studio//ES', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@claudiaserrano', 'DTSTAMP:' + stamp(new Date()), 'DTSTART:' + stamp(start), 'DTEND:' + stamp(end), 'SUMMARY:' + summary.service + ' · Claudia Serrano', 'LOCATION:' + summary.where + ' · San Antonio, TX', 'DESCRIPTION:' + (lang === 'en' ? 'Deposit paid. Balance due on the day.' : 'Depósito pagado. Saldo el día de la cita.'), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const icsLink = $('#ics'); icsLink.href = URL.createObjectURL(blob); icsLink.download = 'cita-claudia-serrano.ics'; $('span', icsLink).textContent = l.ics;
    const wa = $('#wa-confirm'); wa.href = CS_waLink(l.waMsg(summary)); $('span', wa).textContent = l.wa;
    $('#confirm-title').textContent = l.confirmTitle; $('#confirm-text').textContent = l.confirmText;
    $('#confirm-detail').textContent = summary.service + ' · ' + summary.date + ' · ' + summary.time;
    try { localStorage.setItem('cs-booking-' + Date.now(), JSON.stringify(state)); } catch (e) {}
    go(5);
  });

  /* ---------- Inicio ---------- */
  function init() {
    renderServices(); renderSummary();
    const pre = new URLSearchParams(location.search).get('servicio');
    if (pre) { const b = $(`[data-svc="${pre}"]`); if (b) b.click(); }
  }
  init();
  document.addEventListener('langchange', () => { renderServices(); renderSummary(); if (state.step === 2) { renderCalendar(); renderSlots(); } if (state.step === 4) renderReview(); });
})();
