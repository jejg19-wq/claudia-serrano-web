# Claudia Serrano · Makeup Studio & Academy — sitio web (prototipo)

Sitio estático bilingüe (ES/EN) para **Claudia Serrano**, maquilladora y estilista profesional venezolana radicada en San Antonio, Texas. Construido con el manual de marca (paleta negro · oro · nude, tipografía **TAN Mon Cheri** + Open Sans), el catálogo real de servicios y precios, el flyer de cursos y las dos investigaciones de lanzamiento.

**Estado:** prototipo listo para presentar a Claudia. Sin backend: los formularios abren WhatsApp con el mensaje redactado, la reserva funciona de punta a punta en el navegador (con depósito simulado) y el aula virtual valida el código en el navegador.

## Servicios y precios (catálogo real de Claudia)

| Servicio | Precio | Dónde está |
|---|---|---|
| Bride Makeup & Hair (novia: maquillaje + peinado) | desde $350 | `bodas.html`, `servicios.html#novias` |
| Full Glam Signature Look | $150 | `servicios.html#fullglam`, reserva en línea |
| Full Glam + Peinado (no novias) | $230 | `servicios.html#glam-peinado`, reserva en línea |
| Hollywood Waves | $120 | `servicios.html#waves`, reserva en línea |
| Cursos de maquillaje 1:1 (presencial u online) | desde $150 · Package 1 $300 · Package 2 $1,000 · Package 3 $1,500 | `academia.html#paquetes` |

Datos de contacto reales: WhatsApp **+1 (210) 793-5636**, Instagram **@claudiasserrano**. Claudia atiende en español; la web está traducida al inglés solo para que las familias puedan leer servicios y precios.

## Páginas

| Archivo | Qué contiene |
|---|---|
| `index.html` | Intro cinematográfica (monograma + firma), hero con video, presentación, bento de servicios con precios reales, look firma «Full Glam Serrano», portafolio con clientas reales, academia, proceso, testimonios (de muestra), CTA |
| `servicios.html` | Tarjetas con foto real de cada servicio, precio, qué incluye y botón de reserva; políticas |
| `bodas.html` | Landing de novias: proceso, Novia desde $350, cortejo con precios publicados, formulario de 5 campos, FAQ |
| `quinceaneras.html` | Landing de quinceañeras: menú para ella y para mamá/damas, cronograma de belleza, galería, formulario, FAQ |
| `academia.html` | Makeup Class 1:1: tres paquetes del flyer, cómo funcionan, aula virtual, certificado, formulario de inscripción |
| `aula/index.html` | **Aula virtual** con código de acceso: videos de las lecciones, guías y certificado (ver abajo) |
| `portafolio.html` | Galería con filtros (novias, full glam, peinados, editorial) y lightbox, con las fotos del catálogo |
| `sobre-mi.html` | Historia (Venezuela → Texas, esposo y dos hijos), filosofía, monograma |
| `reservar.html` | Reserva instantánea en 5 pasos: servicio → calendario → datos → depósito 30 % → confirmación con `.ics` y WhatsApp |
| `contacto.html` | Contacto, formulario, zona de servicio, horario, FAQ y textos legales (borrador) |

## Aula virtual (videos para alumnas que pagan)

- Carpeta de videos: **`aula/videos/`** (instrucciones en `aula/videos/README.md`).
- Lista de lecciones y códigos de acceso: `aula/lecciones.js`. Cada lección puede ser un archivo MP4 local o un video no listado de YouTube/Vimeo.
- Guías PDF: `aula/guias/`.
- Código de demostración: `SERRANO2026`. En producción, sustituir por una plataforma de cursos (Squarespace Courses, Thinkific, Kajabi) o un login con servidor: el código en el navegador no es seguridad real.

## Banners (carpeta `banner/`)

Diseño con el video generado del hero, la firma dorada, TAN Mon Cheri y los datos reales. En español y en inglés (`-en`):

- `banner-video-1920x1080.mp4` — video 10 s (ida y vuelta) para web, Facebook, YouTube, pantallas.
- `banner-story-1080x1920.mp4` — video vertical para historias y reels.
- `banner-1920x1080.jpg`, `banner-1200x628.jpg` (portada/anuncios), `banner-post-1080x1350.jpg` (post IG), `banner-story-1080x1920.jpg`.

## Tipografía de marca

El manual indica **TAN Mon Cheri** (fuente comercial). El sitio usa una versión reconstruida desde el PDF de marca (`assets/fonts/tan-mon-cheri.woff2`) con acentos y ñ sintetizados, e Italiana como respaldo para los signos que no existen en ese subset (¿ ? ! $). Antes del lanzamiento, comprar la licencia web de TAN Mon Cheri y reemplazar el archivo; el CSS no cambia.

## Cómo verlo

```bash
python -m http.server 8765
```

y visitar `http://localhost:8765`. Para volver a ver la intro (solo se muestra una vez por sesión): `index.html#intro`. Si el equipo tiene activado «reducir movimiento» en Windows, `#intro` también fuerza el video y las animaciones.

## Publicar en GitHub Pages

1. Crear el repositorio público y subir esta carpeta (el `.gitignore` ya excluye las fotos originales, el PDF y las carpetas `catalogo/` y `cursos/`).
2. En **Settings → Pages**: *Deploy from a branch* → `main` → `/ (root)`.

Con GitHub CLI, desde esta carpeta:

```bash
gh auth login
gh repo create claudia-serrano-web --public --source=. --push
```

## Qué cambiar antes de lanzar

- **Correo real**: `hola@claudiaserrano.studio` es un marcador (`window.SITE` en `assets/js/main.js`). TikTok: confirmar el handle.
- **Cifras**: «+7 años de experiencia» y «+500 rostros» son marcadores (`data-count` en `index.html` y `sobre-mi.html`).
- **Testimonios**: los tres de la portada están marcados como *[Ejemplo]*. Reemplazar por reseñas reales de Google.
- **Políticas** (depósito 30 %, cancelación 48 h, viáticos fuera del Loop 1604 a $1/milla, prueba de novia cotizada): son propuestas basadas en la investigación; confirmar con Claudia.
- **Integraciones**: reserva y depósito con Acuity / Square / GlossGenius + Stripe; formularios con HoneyBook o Dubsado; cursos con Squarespace Courses, Thinkific o Kajabi; GA4 + Search Console + Meta Pixel con aviso de cookies.
- **Legal**: los textos de `contacto.html#legal` son borradores para revisión de abogado.

## Estructura técnica

```
├── index.html … contacto.html      páginas estáticas
├── aula/                            aula virtual (index.html, aula.js, lecciones.js, videos/, guias/)
├── banner/                          banners de marca (video y estáticos, ES y EN)
├── assets/css/main.css              sistema de diseño (tokens de marca, componentes, motion, responsive, reduced-motion)
├── assets/js/main.js                intro, nav, reveals, idioma ES/EN, formularios → WhatsApp, galería, pestañas
├── assets/js/booking.js             flujo de reserva con los servicios reales
├── assets/fonts/                    TAN Mon Cheri reconstruida (woff2 + ttf)
├── assets/img/                      fotos de Claudia (WebP) · assets/img/catalogo/ fotos reales de clientas por servicio
├── assets/logo/                     firma SVG, monograma CS, favicon
└── assets/video/                    hero.mp4 / hero.webm (16:9) y hero-vertical.mp4 (9:16), generados de una foto de Claudia
```

**Bilingüe:** cada texto lleva su traducción en `data-en`; el botón ES/EN alterna sin recargar. **Rendimiento y accesibilidad:** `100dvh`, WebP, `loading="lazy"`, video solo en escritorio, `prefers-reduced-motion` respetado, foco visible, navegación por teclado.
