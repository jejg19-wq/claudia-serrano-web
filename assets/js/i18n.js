/* ============================================================
   IDIOMA · Español (base) / English
   - Se abre en inglés si el teléfono o navegador está en inglés; el botón ES/EN lo cambia.
   - La página se escribe en español; aquí está la traducción de cada texto.
   - Para agregar o corregir una traducción: añadir la pareja «español»: «english».
   ============================================================ */
(function () {
  var CS = window.CS || (window.CS = {});
  var saved = null; try { saved = localStorage.getItem('cs-lang'); } catch (e) {}
  var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
  CS.lang = saved === 'en' || saved === 'es' ? saved : (/^en/i.test(nav) ? 'en' : 'es');
  CS.en = CS.lang === 'en';
  document.documentElement.lang = CS.lang;

  CS.EN = {
    /* v5 */
    'Retratos de Claudia Serrano': 'Portraits of Claudia Serrano', 'Elige tu servicio': 'Choose your service', 'Novias, full glam, peinados.': 'Brides, full glam, hairstyling.',
    'Mira los horarios disponibles.': 'See the available times.', 'Confirmación inmediata': 'Instant confirmation', 'Y tu cita queda en tu portal.': 'And your appointment is saved in your portal.',
    'Estudio de maquillaje con espejo de luces': 'Makeup studio with a lighted mirror', 'Correo': 'Email', 'Paso 1 de 4': 'Step 1 of 4',
    /* Navegación y comunes */
    'Saltar al contenido': 'Skip to content', 'Principal': 'Main', 'Menú': 'Menu', 'Inicio': 'Home', 'Servicios': 'Services', 'Academia': 'Academy', 'Tienda': 'Shop',
    'Portafolio': 'Portfolio', 'Sobre mí': 'About me', 'Acceder': 'Sign in', 'Agendar cita': 'Book now', 'Agenda': 'Booking', 'Mi portal': 'My portal', 'Abrir carrito': 'Open cart',
    'Acciones rápidas': 'Quick actions', 'Agendar': 'Book', 'Portal de alumnas': 'Student portal', 'Mi carrito': 'My cart', 'Explora': 'Explore', 'Clientas': 'Clients', 'Contacto': 'Contact',
    'Claudia Serrano, inicio': 'Claudia Serrano, home', 'Volver al inicio': 'Back to home', 'Entradas': 'Entrances', 'Portada': 'Home', 'Descubre': 'Discover', 'Desliza': 'Swipe',
    'San Antonio, TX · WhatsApp +1 (210) 793-5636': 'San Antonio, TX · WhatsApp +1 (210) 793-5636', 'English / Español': 'Español / English', 'o': 'or',
    'Prototipo · pagos simulados y productos de ejemplo': 'Prototype · simulated payments and sample products',
    'Claudia Serrano maquillándose con brocha bajo la luz de anillo': 'Claudia Serrano applying makeup with a brush under the ring light',

    /* Portada */
    'Makeup and hair para todo tipo de ocasión, especialista en novias y quinceañeras.': 'Makeup and hair for every occasion, specializing in brides and quinceañeras.',
    'Agenda tu cita, aprende maquillaje conmigo uno a uno y compra mis productos favoritos.': 'Book your appointment, learn makeup with me one-on-one and shop my favorite products.',
    'Agendar mi cita': 'Book my appointment', 'Acceder a mi portal': 'Sign in to my portal', 'Novias, full glam y peinados': 'Brides, full glam and hairstyling',
    'Makeup Class 1:1 · desde $150': 'Makeup Class 1:1 · from $150', 'Los favoritos de Claudia': "Claudia's favorites",
    'El arte del detalle': 'The art of detail', 'Precisión y arte': 'Precision & artistry', 'Una marca inspirada en las grandes casas de moda y la belleza editorial.': 'A brand inspired by the great fashion houses and editorial beauty.',
    'Claudia Serrano aplicando rubor con brocha': 'Claudia Serrano applying blush with a brush', 'Precisión': 'Precision', 'Tu look': 'Your look', 'Tu sello': 'Your signature',
    'La precisión y el arte del maquillaje de alto nivel, en cada rostro.': 'The precision and artistry of high-end makeup, on every face.',
    'El look que tú escojas, tanto de maquillaje como de peinado.': 'The look you choose, in both makeup and hair.',
    'Lo ideal es que tú te sientas a gusto. Esa es mi firma.': 'What matters most is that you feel comfortable. That is my signature.',
    'Servicios · precios en USD': 'Services · prices in USD', 'Agenda tu look': 'Book your look', 'Elige tu servicio, el día y la hora, y reserva en línea en minutos.': 'Choose your service, day and time, and book online in minutes.',
    'Ver agenda': 'See booking', 'Novias': 'Brides', 'El más pedido': 'Most requested', 'Maquillaje + peinado': 'Makeup + hair', 'Peinado': 'Hair', 'Desde': 'From',
    'Luce espectacular bajo mi sello: el look que tú escojas, tanto de maquillaje como de peinado.': 'Look spectacular with my signature: the look you choose, in both makeup and hair.',
    'Mi maquillaje más pedido: full glam, full face.': 'My most requested makeup: full glam, full face.',
    'Maquillaje full glam y peinado en la misma cita. No aplica para novias.': 'Full glam makeup and hairstyling in the same appointment. Not for brides.',
    'Peinado de ondas estilo Hollywood.': 'Hollywood-style waves.', 'Presencial u online, totalmente personalizados.': 'In person or online, fully personalized.', 'Ver cursos': 'See classes',
    '5 opciones →': '5 options →', 'Full Glam + Peinado': 'Full Glam + Hair',
    'Novia con maquillaje y peinado de Claudia Serrano': 'Bride with makeup and hair by Claudia Serrano', 'Maquillaje full glam con peinado recogido': 'Full glam makeup with an updo', 'Peinado Hollywood waves': 'Hollywood waves hairstyle',
    'Clase de maquillaje uno a uno': 'One-on-one makeup class', 'Presencial u online · certificado y guías de productos': 'In person or online · certificate and product guides',
    'Cursos de maquillaje desde $150, totalmente personalizados. Al inscribirte entras a tu portal de alumna: tus clases en video y tus sesiones uno a uno conmigo.': 'Makeup classes from $150, fully personalized. When you enroll you get your student portal: your video lessons and your one-on-one sessions with me.',
    '2 clases: soft y full glam · 7 horas': '2 classes: soft and full glam · 7 hours', 'Automaquillaje: te maquillas tú misma': 'Self-makeup: you do your own makeup',
    '4 clases: soft glam, full glam, novia y quinceañera · 14 horas': '4 classes: soft glam, full glam, bridal and quinceañera · 14 hours', 'En modelos diferentes': 'On different models',
    '5 clases: novias, quinceañera, invitadas y piel madura · 22 horas': '5 classes: brides, quinceañera, guests and mature skin · 22 hours', '2 técnicas de peinado': '2 hairstyling techniques',
    'Ver la academia': 'See the academy', 'Entrar al portal de alumnas': 'Enter the student portal',
    'Los productos que la patrocinan y que usa en su trabajo, para comprar aquí mismo.': 'The products that sponsor her and that she uses in her work, available right here.',
    'Prototipo · productos de ejemplo': 'Prototype · sample products', 'Ir a la tienda': 'Go to the shop', 'Clientas reales': 'Real clients',
    'Novia': 'Bride', 'Full glam + peinado': 'Full glam + hair', 'Peinado recogido': 'Updo', 'Novia con velo': 'Bride with veil', 'Novia de espaldas con recogido': 'Bride from behind with an updo',
    'Novia soft glam': 'Soft glam bride', 'Full glam y peinado': 'Full glam and hair', 'Full glam con ojos cerrados': 'Full glam, eyes closed', 'Novia con ondas': 'Bride with waves',
    'Full glam con ondas': 'Full glam with waves', 'Hollywood waves en cabello rubio': 'Hollywood waves on blonde hair', 'Novia con vestido blanco': 'Bride in a white dress',
    'Retrato de Claudia Serrano': 'Portrait of Claudia Serrano', 'La nueva era': 'The new era', 'Belleza editorial, con la precisión y el arte del maquillaje de alto nivel.': 'Editorial beauty, with the precision and artistry of high-end makeup.',
    'Soy Claudia Serrano, maquilladora y estilista profesional venezolana, radicada en San Antonio, Texas. Makeup and hair para todo tipo de ocasión, especialista en novias y quinceañeras. Me inspiro en las grandes casas de moda y en la belleza editorial para crear el look que tú escojas, uno con el que te sientas a gusto.':
      "I'm Claudia Serrano, a Venezuelan professional makeup and hair artist based in San Antonio, Texas. Makeup and hair for every occasion, specializing in brides and quinceañeras. I draw inspiration from the great fashion houses and editorial beauty to create the look you choose, one you feel comfortable in.",
    'Estudio': 'Studio', 'Especialidad': 'Specialty', 'Novias y quinceañeras': 'Brides and quinceañeras', 'Lo más pedido': 'Most requested', 'Clases 1:1 en español o inglés': '1:1 classes in Spanish or English',
    'Firma de Claudia Serrano': "Claudia Serrano's signature", 'Tu cita te espera': 'Your appointment awaits', 'Elige tu servicio y reserva en línea en minutos.': 'Choose your service and book online in minutes.',

    /* Agenda */
    'Agenda tu cita · Claudia Serrano': 'Book your appointment · Claudia Serrano', 'Agenda en línea': 'Online booking', 'Agenda tu cita': 'Book your appointment',
    'Cuatro pasos: servicio, fecha y hora, tus datos y el pago. Al final recibes la confirmación y tu cita aparece en tu portal.': 'Four steps: service, date and time, your details and payment. At the end you get a confirmation and your appointment appears in your portal.',
    'Servicio': 'Service', 'Fecha y hora': 'Date & time', 'Tus datos': 'Your details', 'Pago': 'Payment', '¿Qué servicio quieres?': 'Which service would you like?', 'Continuar': 'Continue', 'Atrás': 'Back',
    'Para reservar en línea activa JavaScript o escríbeme por': 'To book online, turn on JavaScript or message me on',
    'Elige el día y la hora': 'Choose the day and time', 'Mes anterior': 'Previous month', 'Mes siguiente': 'Next month', 'Horarios': 'Times',
    'Prototipo: los días y horarios disponibles son de ejemplo. Al conectar la agenda real se mostrará la disponibilidad de Claudia.': "Prototype: available days and times are samples. Once the real calendar is connected, Claudia's availability will show here.",
    'Nombre y apellido': 'Full name', 'Escribe tu nombre.': 'Please enter your name.', 'WhatsApp o teléfono': 'WhatsApp or phone', 'Escribe un teléfono de al menos 10 dígitos.': 'Please enter a phone number with at least 10 digits.',
    'Correo (opcional)': 'Email (optional)', 'Revisa el correo.': 'Please check the email.', 'Lugar de la boda': 'Wedding venue', '¿Algo que Claudia deba saber? (opcional)': 'Anything Claudia should know? (optional)',
    'Tu inspiración, alergias, hora del evento…': 'Your inspiration, allergies, event time…', 'Continuar al pago': 'Continue to payment', 'Pago de tu cita': 'Appointment payment', 'Total del servicio': 'Service total',
    'Pagar y confirmar (simulado)': 'Pay and confirm (simulated)',
    'Prototipo: no se cobra nada ni se piden datos de tarjeta. Aquí irá la pasarela de pago (por ejemplo, Shopify o Square) y la política de anticipo que confirme Claudia.': "Prototype: nothing is charged and no card details are requested. The payment gateway (for example Shopify or Square) and Claudia's deposit policy will go here.",
    'Tu cita está confirmada': 'Your appointment is confirmed', 'Ver en mi portal': 'See it in my portal', 'Añadir a mi calendario': 'Add to my calendar', 'Avisar a Claudia por WhatsApp': 'Message Claudia on WhatsApp',
    'Tu reserva': 'Your booking', 'Elige un servicio': 'Choose a service', 'Fecha': 'Date', 'Hora': 'Time', 'Duración aprox.': 'Approx. duration', 'Lugar': 'Location', 'Total': 'Total',

    /* Academia */
    'Academia · Makeup Class 1:1 · Claudia Serrano': 'Academy · Makeup Class 1:1 · Claudia Serrano', 'Clases presenciales en San Antonio, TX, u online · Español o inglés.': 'In-person classes in San Antonio, TX, or online · Spanish or English.',
    'Academia · presencial u online': 'Academy · in person or online', 'Claudia Serrano con brochas y paleta de sombras': 'Claudia Serrano with brushes and an eyeshadow palette',
    'Cursos de maquillaje totalmente personalizados, desde $150, en español o inglés. Incluyen certificado y guías de productos.': 'Fully personalized makeup classes from $150, in Spanish or English. They include a certificate and product guides.',
    'Ver paquetes': 'See packages', 'Entrar al portal (demo)': 'Enter the portal (demo)', 'Cómo funciona': 'How it works', 'Aprende conmigo, a tu ritmo': 'Learn with me, at your own pace',
    'Elige tu paquete': 'Choose your package', 'Package 1, 2 o 3, presencial en San Antonio u online, en español o inglés.': 'Package 1, 2 or 3, in person in San Antonio or online, in Spanish or English.',
    'Entra a tu portal': 'Enter your portal', 'Al inscribirte recibes acceso al portal de alumnas con tus clases en video, con subtítulos en español e inglés.': 'When you enroll you get access to the student portal with your video lessons, subtitled in Spanish and English.',
    'Clases 1:1 y certificado': '1:1 classes and certificate', 'Agendas tus sesiones uno a uno conmigo y al terminar recibes tu certificado y las guías de productos.': 'You book your one-on-one sessions with me, and when you finish you receive your certificate and product guides.',
    'Paquetes': 'Packages', 'Elige tu nivel': 'Choose your level', 'Todos incluyen certificado y guías de productos.': 'All include a certificate and product guides.',
    '2 clases: soft y full glam': '2 classes: soft and full glam', '7 horas': '7 hours', 'Certificado y guías de productos': 'Certificate and product guides', 'Inscribirme': 'Enroll',
    '4 clases: soft glam, full glam, novia y quinceañera': '4 classes: soft glam, full glam, bridal and quinceañera', '14 horas': '14 hours',
    '5 clases: novias, quinceañera, invitadas y piel madura': '5 classes: brides, quinceañera, guests and mature skin', '22 horas': '22 hours',
    'Mesa de trabajo de una clase de maquillaje': 'Makeup class workstation', 'Tu portal de alumna': 'Your student portal', 'Todo en un solo lugar': 'Everything in one place',
    'Clases en video': 'Video lessons', 'Con subtítulos en español e inglés': 'Subtitled in Spanish and English', 'Sesiones 1:1': '1:1 sessions', 'Agenda con Claudia': 'Book with Claudia',
    'Guías de productos': 'Product guides', 'Incluidas': 'Included', 'Certificado': 'Certificate', 'Al terminar tu paquete': 'When you finish your package', 'Ver el portal (demo)': 'See the portal (demo)',
    'Inscripción': 'Enrollment', 'Modalidad': 'Format', 'Presencial (San Antonio, TX)': 'In person (San Antonio, TX)', 'Idioma del curso': 'Class language', 'Español': 'Spanish',
    'Prototipo: el pago es simulado; no se piden datos de tarjeta.': 'Prototype: payment is simulated; no card details are requested.', 'Cancelar': 'Cancel', 'Pagar e ir a mi portal': 'Pay and go to my portal',

    /* Tienda */
    'Tienda · Los favoritos de Claudia Serrano': "Shop · Claudia Serrano's favorites", 'Los productos que la patrocinan y que usa en su trabajo.': 'The products that sponsor her and that she uses in her work.',
    'Prototipo: productos, nombres y precios de ejemplo. La tienda se conectará a Shopify con los productos reales.': 'Prototype: sample products, names and prices. The shop will connect to Shopify with the real products.',
    'Filtrar por categoría': 'Filter by category', 'Todo': 'All', 'Rostro': 'Face', 'Ojos': 'Eyes', 'Labios': 'Lips', 'Herramientas': 'Tools', 'Activa JavaScript para ver la tienda.': 'Turn on JavaScript to see the shop.',
    'Aprende a usarlos': 'Learn how to use them', 'En la academia te enseño a sacarles el máximo, uno a uno.': 'In the academy I teach you how to get the most out of them, one-on-one.',
    'Base líquida': 'Liquid foundation', 'Labial satinado': 'Satin lipstick', 'Paleta de sombras': 'Eyeshadow palette', 'Set de brochas': 'Brush set', 'Spray fijador': 'Setting spray', 'Pestañas postizas': 'False lashes',
    'Acabado natural luminoso': 'Natural luminous finish', 'Rojo clásico de larga duración': 'Long-wearing classic red', '12 tonos cálidos: nude, bronce y oro': '12 warm shades: nude, bronze and gold',
    '8 brochas profesionales': '8 professional brushes', 'Fija el maquillaje todo el día': 'Sets makeup all day', 'Efecto natural, reutilizables': 'Natural effect, reusable',
    'Ejemplo': 'Sample', 'ejemplo': 'sample', 'Tu carrito': 'Your cart', 'Cerrar': 'Close', 'Carrito': 'Cart', 'Pagar · Shopify (próximamente)': 'Checkout · Shopify (coming soon)',
    'Prototipo: los productos y precios son de ejemplo. El pago se conectará a la tienda de Shopify.': 'Prototype: products and prices are samples. Checkout will connect to the Shopify store.',
    'Prototipo: aquí se abrirá el pago de Shopify': 'Prototype: Shopify checkout will open here', 'Tu carrito está vacío. Mira los favoritos de Claudia en la': "Your cart is empty. See Claudia's favorites in the",
    'tienda': 'shop', 'Quitar uno': 'Remove one', 'Añadir uno': 'Add one', 'se añadió al carrito': 'added to cart', 'Producto': 'Product',

    /* Portal */
    'Mi portal · Claudia Serrano Makeup Studio & Academy': 'My portal · Claudia Serrano Makeup Studio & Academy', 'Claudia Serrano en su estudio': 'Claudia Serrano in her studio',
    'Portal de clientas y alumnas': 'Client & student portal', 'Bienvenida': 'Welcome', 'Aquí están tus clases en video, tus sesiones uno a uno con Claudia, tus citas y tu certificado.': 'Here are your video lessons, your one-on-one sessions with Claudia, your appointments and your certificate.',
    'Entrar como alumna (demo)': 'Enter as a student (demo)', 'o con tu código': 'or with your code', 'Código de acceso': 'Access code', 'Ej. SERRANO2026': 'e.g. SERRANO2026',
    'Ese código no es válido. Revisa el mensaje que te envió Claudia.': 'That code is not valid. Check the message Claudia sent you.', 'Entrar con mi código': 'Enter with my code',
    '¿Aún no tienes acceso?': "Don't have access yet?", 'Agenda una cita': 'Book an appointment', 'inscríbete en un curso': 'enroll in a class',
    'Prototipo: el acceso es de demostración y se guarda solo en este dispositivo.': 'Prototype: access is a demo and is only saved on this device.',
    'Salir': 'Sign out', 'Secciones del portal': 'Portal sections', 'Mis clases': 'My classes', 'Clases 1:1': '1:1 classes', 'Mis citas': 'My appointments', 'Guías': 'Guides',
    'Alumna': 'Student', 'Hola': 'Hello', '0 de 0 clases vistas': '0 of 0 lessons watched', 'Lección 01': 'Lesson 01', 'Marcar como vista': 'Mark as watched', 'Siguiente clase': 'Next lesson',
    'Prototipo: las clases usan un video de muestra. Aquí irán los videos reales de cada lección, con subtítulos en español e inglés (botón CC del reproductor).': 'Prototype: lessons use a sample video. The real video for each lesson will go here, with Spanish and English subtitles (CC button on the player).',
    'Tus lecciones': 'Your lessons', 'Uno a uno con Claudia': 'One-on-one with Claudia', 'Agenda tus sesiones personalizadas, presenciales en San Antonio u online por videollamada.': 'Book your personalized sessions, in person in San Antonio or online by video call.',
    'Agendar una sesión': 'Book a session', 'Online': 'Online', 'Presencial': 'In person', 'Agendar sesión': 'Book session', 'Prototipo: horarios de ejemplo.': 'Prototype: sample times.',
    'Próximas sesiones': 'Upcoming sessions', 'Agendar otra cita': 'Book another appointment', 'Tu certificado': 'Your certificate', 'Certificado de finalización': 'Certificate of completion',
    'Descargar certificado': 'Download certificate', 'Material del curso': 'Course materials', 'Guía de piel': 'Skin guide', 'Preparación, bases y fijación': 'Prep, foundations and setting',
    'Próximamente': 'Coming soon', 'Guía de ojos y labios': 'Eyes and lips guide', 'Sombras, delineado, pestañas y labios': 'Shadows, liner, lashes and lips', 'Brochas esenciales': 'Essential brushes',
    'Qué brocha usar para cada paso': 'Which brush to use for each step',
    'Bienvenida a la academia': 'Welcome to the academy', 'Soft glam': 'Soft glam', 'Automaquillaje': 'Self-makeup', 'Novia y quinceañera': 'Bridal and quinceañera', 'Invitadas y piel madura': 'Guests and mature skin',
    'Técnicas de peinado': 'Hairstyling techniques', 'Todos': 'All packages', 'Pagada': 'Paid', 'Unirse': 'Join',
    'Clase marcada como vista': 'Lesson marked as watched', 'Sesión 1:1 agendada': '1:1 session booked', 'Prototipo: aquí se descargará tu certificado en PDF': 'Prototype: your PDF certificate will download here',
    'Prototipo: aquí se abrirá la videollamada con Claudia': 'Prototype: the video call with Claudia will open here',
    'Aún no tienes sesiones. Elige un día y una hora.': "You don't have sessions yet. Choose a day and a time.",
    'Todavía no tienes citas. Cuando reserves en la agenda, aparecen aquí.': "You don't have appointments yet. When you book, they show up here.",
    'Completaste todas tus clases.': 'You completed all your lessons.', 'Procesando…': 'Processing…', 'Vista ✓': 'Watched ✓'
  };

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  CS.t = function (s) { if (!CS.en) return s; var k = norm(s); return Object.prototype.hasOwnProperty.call(CS.EN, k) ? CS.EN[k] : s; };

  /* Traduce textos y atributos de una parte de la página (solo si está en inglés) */
  CS.translate = function (root) {
    if (!CS.en) return;
    root = root || document.body;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function (n) { var p = n.parentNode && n.parentNode.nodeName; return p === 'SCRIPT' || p === 'STYLE' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    var n, list = []; while ((n = w.nextNode())) list.push(n);
    list.forEach(function (node) {
      var v = node.nodeValue, k = norm(v);
      if (k && Object.prototype.hasOwnProperty.call(CS.EN, k)) { var m = v.match(/^(\s*)[\s\S]*?(\s*)$/); node.nodeValue = m[1] + CS.EN[k] + m[2]; }
    });
    ['alt', 'placeholder', 'aria-label', 'title'].forEach(function (a) {
      Array.prototype.forEach.call(root.querySelectorAll('[' + a + ']'), function (el) { var k = norm(el.getAttribute(a)); if (Object.prototype.hasOwnProperty.call(CS.EN, k)) el.setAttribute(a, CS.EN[k]); });
    });
    if (root === document.body || root === document) {
      document.title = CS.t(document.title);
      var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', CS.t(md.getAttribute('content')));
    }
  };

  CS.setLang = function (l) { try { localStorage.setItem('cs-lang', l); } catch (e) {} location.reload(); };
  document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-lang-toggle]'); if (b) { e.preventDefault(); CS.setLang(CS.en ? 'es' : 'en'); } });
  function labelToggles() { Array.prototype.forEach.call(document.querySelectorAll('[data-lang-toggle]'), function (b) { b.textContent = CS.en ? 'ES' : 'EN'; b.setAttribute('aria-label', CS.en ? 'Ver en español' : 'View in English'); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', labelToggles); else labelToggles();
})();
