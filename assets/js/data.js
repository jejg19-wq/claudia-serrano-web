/* ============================================================
   DATOS DEL SITIO — una sola fuente para agenda, academia, tienda y portal.
   Servicios y cursos: reales (catalogo/ y flyer de cursos/).
   Productos: EJEMPLOS del prototipo (se reemplazan al conectar Shopify).
   ============================================================ */
window.CS = window.CS || {};

CS.contact = {
  whatsapp: '12107935636',
  phone: '+1 (210) 793-5636',
  instagram: 'claudiasserrano',
  email: 'claudiaserranoinfo@gmail.com',
  city: 'San Antonio, TX'
};

// Servicios del catálogo de Claudia (precios en USD)
CS.services = [
  { id: 'novia', name: 'Bride Makeup & Hair', tag: 'Novias', price: 350, from: true, duration: 180,
    img: 'assets/img/catalogo/novia-06-md.webp',
    text: 'Luce espectacular bajo mi sello: el look que tú escojas, tanto de maquillaje como de peinado. Lo ideal es que tú te sientas a gusto.' },
  { id: 'fullglam', name: 'Full Glam Signature Look', tag: 'El más pedido', price: 150, from: false, duration: 90,
    img: 'assets/img/catalogo/fullglam-02-md.webp',
    text: 'Mi maquillaje más pedido: full glam, full face.' },
  { id: 'glam-peinado', name: 'Full Glam + Peinado', tag: 'Maquillaje + peinado', price: 230, from: false, duration: 150,
    img: 'assets/img/catalogo/glam-peinado-01-md.webp',
    text: 'Maquillaje full glam y peinado en la misma cita. No aplica para novias.' },
  { id: 'waves', name: 'Hollywood Waves', tag: 'Peinado', price: 120, from: false, duration: 60,
    img: 'assets/img/catalogo/waves-02-md.webp',
    text: 'Peinado de ondas estilo Hollywood.' }
];

// Paquetes del flyer «Makeup Class 1:1» (presencial u online)
CS.packages = [
  { id: 'p1', name: 'Package 1', price: 300, hours: 7, classes: 2,
    items: ['2 clases: soft y full glam', '7 horas', 'Certificado y guías de productos', 'Automaquillaje: te maquillas tú misma'] },
  { id: 'p2', name: 'Package 2', price: 1000, hours: 14, classes: 4,
    items: ['4 clases: soft glam, full glam, novia y quinceañera', '14 horas', 'Certificado y guías de productos', 'En modelos diferentes'] },
  { id: 'p3', name: 'Package 3', price: 1500, hours: 22, classes: 5,
    items: ['5 clases: novias, quinceañera, invitadas y piel madura', '2 técnicas de peinado', 'Certificado y guías de productos', '22 horas'] }
];

// Productos de EJEMPLO (imágenes generadas con Higgsfield). Nombres y precios son de muestra.
CS.products = [
  { id: 'base', name: 'Base líquida', cat: 'Rostro', price: 42, img: 'assets/img/gen/prod-base.webp', note: 'Acabado natural luminoso' },
  { id: 'labial', name: 'Labial satinado', cat: 'Labios', price: 28, img: 'assets/img/gen/prod-labial.webp', note: 'Rojo clásico de larga duración' },
  { id: 'paleta', name: 'Paleta de sombras', cat: 'Ojos', price: 54, img: 'assets/img/gen/prod-paleta.webp', note: '12 tonos cálidos: nude, bronce y oro' },
  { id: 'brochas', name: 'Set de brochas', cat: 'Herramientas', price: 68, img: 'assets/img/gen/prod-brochas.webp', note: '8 brochas profesionales' },
  { id: 'spray', name: 'Spray fijador', cat: 'Rostro', price: 32, img: 'assets/img/gen/prod-spray.webp', note: 'Fija el maquillaje todo el día' },
  { id: 'pestanas', name: 'Pestañas postizas', cat: 'Ojos', price: 24, img: 'assets/img/gen/prod-pestanas.webp', note: 'Efecto natural, reutilizables' }
];

// Lecciones del portal (el contenido de cada paquete sale del flyer; los videos son de muestra)
CS.lessons = [
  { n: 1, title: 'Bienvenida a la academia', pkg: 'Todos', min: 1, video: 'banner/banner-video-1920x1080.mp4', poster: 'assets/img/claudia-studio-smile-md.webp' },
  { n: 2, title: 'Soft glam', pkg: 'Package 1 · 2', min: 1, video: 'assets/video/hero.mp4', poster: 'assets/img/claudia-portrait-soft-md.webp' },
  { n: 3, title: 'Full glam', pkg: 'Package 1 · 2', min: 1, video: 'assets/video/hero.mp4', poster: 'assets/img/claudia-red-lip-portrait-md.webp' },
  { n: 4, title: 'Automaquillaje', pkg: 'Package 1', min: 1, video: 'assets/video/hero.mp4', poster: 'assets/img/claudia-ringlight-brush-md.webp' },
  { n: 5, title: 'Novia y quinceañera', pkg: 'Package 2 · 3', min: 1, video: 'assets/video/hero.mp4', poster: 'assets/img/catalogo/novia-04-md.webp' },
  { n: 6, title: 'Invitadas y piel madura', pkg: 'Package 3', min: 1, video: 'assets/video/hero.mp4', poster: 'assets/img/catalogo/novia-01-md.webp' },
  { n: 7, title: 'Técnicas de peinado', pkg: 'Package 3', min: 1, video: 'assets/video/hero.mp4', poster: 'assets/img/catalogo/waves-01-md.webp' }
];

CS.money = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
CS.wa = function (text) { return 'https://wa.me/' + CS.contact.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); };
