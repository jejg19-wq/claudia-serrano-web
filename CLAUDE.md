# Contexto del proyecto · Sitio web de Claudia Serrano

Claude Code lee este archivo automáticamente al abrir esta carpeta. Resume todo lo hecho y lo pendiente para seguir en un chat nuevo sin perder nada.

- **Usuario: Jackson.** Diseñador, habla español y escribe por voz: sus mensajes traen errores de transcripción; interpretarlos por el contexto (por ejemplo, «Spotify» era **Shopify**).
- **Clienta: Claudia Serrano.** Maquilladora y estilista venezolana en San Antonio, TX.
- **Fecha de estado:** 23 de septiembre de 2026 (versión v5).

## Enlaces

- **Sitio publicado:** https://jejg19-wq.github.io/claudia-serrano-web/ (GitHub Pages desde `main`, raíz). Cada `git push` lo actualiza en uno o dos minutos.
- **Repositorio:** https://github.com/jejg19-wq/claudia-serrano-web (público). `gh` tiene sesión como `jejg19-wq`.
  - Si la sesión se pierde: lanzar `gh auth login --web` en segundo plano. El botón «Authorize» de GitHub solo se habilita con la página visible y con foco.
- **Higgsfield Websites: RETIRADO.** El sitio `claudia-serrano.higgsfield.app` quedó vacío. Jackson pidió usar **solo GitHub**; no volver a publicar ahí.

## Reglas

1. **No inventar nada sobre Claudia.**
   - Servicios, precios y contacto salen solo del material de la clienta (`catalogo/`, `cursos/`, PDF de marca) o de lo que diga Jackson.
   - Lo que sea ejemplo va marcado como tal en la página.
2. **Idioma:**
   - Página **bilingüe español / inglés**: se abre en inglés si el navegador está en inglés y tiene botón ES/EN.
   - Los cursos también se dan en inglés, y los videos llevarán subtítulos.
   - **Nunca escribir «atiendo en español».**
   - Descripción real de Claudia: «Makeup and hair para todo tipo de ocasión, especialista en novias y quinceañeras».
   - Cada texto nuevo se traduce en `assets/js/i18n.js`.
3. **Diseño, según lo que pidió Jackson:**
   - Lujo, moderno y con motion fino.
   - Letras pequeñas y **nunca recortadas**.
   - El texto **nunca tapa la cara** de Claudia ni de las clientas; fotos sin recortes feos.
   - Botones modernos.
   - Iconos reales de Instagram y WhatsApp.
   - No repetir el mismo video.
4. **Probar antes de decir «listo»:**
   - Probar sin «reducir movimiento» (Jackson lo tiene activado en Windows y eso escondió un fallo grave).
   - Probar en iPhone (WebKit) y PC, en los dos idiomas. Ver `tools/README.md`.
   - Publicar y mandarle captura del enlace real.
5. **Caché:** los CSS y JS se cargan con `?v=8`. Al cambiarlos, subir el número en las 5 páginas.
6. **Commits:** en español, con la línea de coautoría de Claude.

## Datos reales

- **Contacto:** WhatsApp **+1 (210) 793-5636** · Instagram **@claudiasserrano** · **claudiaserranoinfo@gmail.com**.
- **Servicios (`catalogo/`):**
  - Bride Makeup & Hair: desde $350.
  - Full Glam Signature Look: $150 (el más pedido).
  - Full Glam + Peinado: $230 (no novias).
  - Hollywood Waves: $120.
- **Cursos (flyer en `cursos/`):** Makeup Class 1:1, presencial u online, desde $150. Todos con certificado y guías de productos.
  - Package 1: $300 (2 clases, 7 h, automaquillaje).
  - Package 2: $1,000 (4 clases, 14 h, en modelos).
  - Package 3: $1,500 (5 clases, 22 h, más 2 técnicas de peinado).
- **Marca (PDF):**
  - Paleta: #000000, #d4af37, #c4a484, #b09079, #ebe8e3, #f5f5f5.
  - Tipografía: TAN Mon Cheri para títulos y Open Sans para el texto.
  - Firma script y monograma CS.

## Estructura del prototipo (v5)

| Archivo | Qué es |
|---|---|
| `index.html` | Portal de acceso con Claudia (video vertical arriba en teléfono, a la derecha en PC). Luego: cinta, «El arte del detalle» (video `assets/video/reel.mp4` en arco con anillo que gira), servicios en cuadrícula, academia, tienda, portafolio en miniaturas con visor, sobre mí y llamado final. |
| `agendar.html` + `assets/js/booking.js` | Agenda en 4 pasos con pago **simulado**, confirmación, `.ics` y WhatsApp. La cita se guarda y aparece en el portal. |
| `academia.html` + `assets/js/academy.js` | Paquetes del flyer. La inscripción, con pago simulado e idioma del curso, lleva al portal. |
| `tienda.html` + `assets/js/shop.js` | Productos **de ejemplo** con filtros y carrito. El pago queda listo para **Shopify** (pendiente). |
| `portal/index.html` + `assets/js/portal.js` | Portal de clientas y alumnas: acceso demo o por código (`SERRANO2026`, `PACKAGE1`–`3`). Pestañas: clases en video con subtítulos ES/EN y progreso, clases 1:1, mis citas, certificado y guías. |
| `aula/index.html` | Redirige al portal. |
| `assets/js/data.js` | Servicios, paquetes, productos y lecciones: una sola fuente para todo. |
| `assets/js/i18n.js` | Diccionario español → inglés, detección del idioma y botón ES/EN. |
| `assets/js/app.js` | Cabecera, carrito, visor, videos que solo corren en pantalla y motion. El motion usa GSAP, ScrollTrigger, SplitText y Lenis (solo en PC) y tiene red de seguridad: nada queda oculto. |
| `assets/css/app.css` | Todo el diseño. |
| `assets/img/gen/` | Imágenes generadas con Higgsfield: 6 productos de ejemplo, 2 de academia y 1 de estudio. |
| `assets/video/` | `hero-vertical.mp4` (portada, hecho con Higgsfield Kling), `reel.mp4` (ffmpeg con 6 fotos de Claudia, `tools/reel.py`) y `subs/` (subtítulos de ejemplo). |
| `assets/fonts/` | TAN Mon Cheri reconstruida del PDF, con acentos y «j» corregidos. Italiana es el respaldo para los signos que faltan. |
| `tools/` | Pruebas automáticas: letras cortadas, recorridos, idioma y contraste. Instrucciones en `tools/README.md`. |
| `banner/` | Banners de marca en ES y EN (no se usan en la página). |

El material fuente queda fuera del repositorio por `.gitignore`: `fotos de claudia/`, el PDF, los SVG originales, `catalogo/` y `cursos/`.

## Pendiente

- **motionsites (MCP):** Jackson lo quiere conectado. Lo tiene que ejecutar él, porque la app bloqueó el cambio de configuración, y luego abrir un chat nuevo:
  `claude mcp add motionsites --scope user --transport http https://xgdzyqfalbibzelpdpvr.supabase.co/functions/v1/mcp`
- **Higgsfield:** quedan **0,8 créditos** (un video Kling cuesta unos 8,75). Para generar más imágenes o videos, Jackson tiene que recargar. Tiene permiso general para generar lo necesario.
- **Datos que faltan de Claudia:**
  - Marcas y productos reales de los patrocinadores y sus precios, para la tienda y Shopify.
  - Disponibilidad real y política de pago o anticipo.
  - Videos reales de las clases y sus subtítulos.
  - Guías en PDF.
  - Reseñas o cifras, si las quiere en la página.
- **Antes del lanzamiento:**
  - Licencia web de TAN Mon Cheri.
  - Quitar `noindex`.
  - Conectar Shopify, la agenda real con su pasarela de pago y el login real del portal.
