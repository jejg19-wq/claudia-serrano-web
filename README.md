# Claudia Serrano · Makeup Studio & Academy — prototipo web

Sitio publicado: **https://jejg19-wq.github.io/claudia-serrano-web/** (GitHub Pages, rama `main`).

Prototipo para **agendar citas**, la **academia** (con portal de alumnas y clases en video), una **tienda** de los productos que patrocinan a Claudia (a conectar con **Shopify**) y un **portal de acceso** con Claudia como protagonista. Pensado primero para el teléfono, con motion design.

## Páginas

| Página | Qué hace |
|---|---|
| `index.html` | Portal de acceso: video de Claudia, nombre grande y tres «puertas» (Agenda, Academia, Tienda). Luego vienen «El arte del detalle» (en PC el video avanza con el scroll), servicios, academia, tienda, portafolio, sobre mí y el llamado final. |
| `agendar.html` | Reserva en 4 pasos: servicio → fecha y hora → datos → **pago simulado**. Al final: confirmación, archivo `.ics` para el calendario, aviso por WhatsApp y enlace al portal. |
| `academia.html` | Makeup Class 1:1 con los 3 paquetes del flyer. «Inscribirme» abre un pago simulado y lleva al portal. |
| `tienda.html` | Productos **de ejemplo** con filtros y carrito lateral. El botón de pago queda listo para Shopify. |
| `portal/index.html` | Portal de clientas y alumnas. Se entra con «Entrar como alumna (demo)», con un código (`SERRANO2026`, `PACKAGE1`–`3`) o directo después de reservar o inscribirse. Pestañas: **Mis clases** (video, lista de lecciones y progreso), **Clases 1:1** (agendar sesiones con Claudia), **Mis citas**, **Certificado** y **Guías**. |
| `aula/index.html` | Redirige al portal (enlace antiguo). |

## Contenido

- **Real, del material de la clienta:**
  - Los 4 servicios y sus precios (`catalogo/`).
  - Los 3 paquetes de cursos (flyer en `cursos/`).
  - Contacto: WhatsApp +1 (210) 793-5636 · Instagram @claudiasserrano · claudiaserranoinfo@gmail.com.
  - Las fotos de Claudia (`fotos de claudia/`) y de sus clientas.
  - Los videos de Claudia.
- **De ejemplo, marcados como tal en la página:**
  - Productos, nombres y precios de la tienda. Las imágenes se generaron con Higgsfield (GPT Image 2.5) en `assets/img/gen/`.
  - Horarios disponibles.
  - Videos de las lecciones.
  - Pagos: simulados, no se piden datos de tarjeta.
- Todos los datos editables están en **`assets/js/data.js`**: servicios, paquetes, productos y lecciones.
- El estado del prototipo (citas, carrito, progreso, sesiones) se guarda en `localStorage`, solo en el dispositivo.

## Diseño y motion

- **Marca:**
  - TAN Mon Cheri para los títulos, en mayúsculas; Open Sans para el resto.
  - Paleta del manual: crema, arena, nude, taupe, oro y negro, más el marrón de «La nueva era».
- **Motion (GSAP 3.13 + ScrollTrigger + SplitText, y Lenis en PC):**
  - Intro de marca en la primera visita.
  - Titulares que entran por líneas y fotos que se revelan con máscara.
  - Parallax y columnas del portafolio a distinta velocidad.
  - Carrusel de servicios fijado con scroll en PC.
  - Secuencia de 61 cuadros del video de Claudia en `assets/seq/` (1,3 MB), que avanza con el scroll en PC.
  - Botones magnéticos y cursor dorado.
- **Seguridad del motion:**
  - Nada se oculta en el HTML ni en el CSS. GSAP pone los estados iniciales solo si cargó y si el usuario no pidió «reducir movimiento».
  - Una red de seguridad completa cualquier animación que no haya disparado.
  - En teléfono no hay secuencia por scroll: el video se reproduce solo.

## Cómo probar

```
python -m http.server 8765
```

Después abrir `http://localhost:8765`.

- Probar siempre **sin «reducir movimiento»** y en el motor de Safari (iPhone). En modo reducido, un fallo anterior dejaba el sitio invisible para todos y no se veía.
- Para reiniciar el prototipo, borrar los datos del sitio del navegador (`localStorage`).

## Antes de lanzar

- **Tienda:** conectar Shopify (Buy Button / Storefront API) con los productos reales de los patrocinadores y reemplazar `CS.products` y el carrito.
- **Agenda:** disponibilidad real y pasarela de pago (Square, Shopify o similar), con la política de anticipo que confirme Claudia.
- **Portal:** login real (plataforma de cursos o backend), videos reales de cada lección, guías en PDF y certificado.
- **Tipografía:** comprar la licencia web de TAN Mon Cheri.
- **Publicación:** quitar `<meta name="robots" content="noindex">`.
