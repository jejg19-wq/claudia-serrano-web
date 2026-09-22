# Claudia Serrano · Makeup Studio & Academy — sitio web (prototipo)

Sitio estático bilingüe (ES/EN) para **Claudia Serrano**, maquilladora profesional venezolana radicada en San Antonio, Texas. Construido a partir del manual de marca (paleta negro · oro · nude, tipografía TAN Mon Cheri + Open Sans) y de las dos investigaciones de lanzamiento (mercado, nichos, precios, sitemap, academia, legal).

**Estado:** prototipo listo para presentar a Claudia. Sin backend: los formularios abren WhatsApp con el mensaje redactado y la reserva funciona de punta a punta en el navegador (con depósito simulado).

## Páginas

| Archivo | Qué contiene |
|---|---|
| `index.html` | Intro cinematográfica (monograma + firma), hero con video, presentación «La Nueva Era», bento de servicios con precios, look firma «El Glow Serrano», portafolio destacado, academia, proceso, testimonios (de muestra), CTA |
| `servicios.html` | Tabla completa de precios por nicho (quinceañeras, novias, citas individuales, clases y extras), qué incluye, políticas |
| `bodas.html` | Landing nupcial: proceso, paquetes desde $175, tendencias 2026, formulario de cotización de 5 campos, FAQ |
| `quinceaneras.html` | Landing de quinceañeras (español primero): paquete «Quince Completa» $495, cronograma de belleza, galería glam latino, formulario de 5 campos, FAQ para mamás |
| `academia.html` | Funnel: masterclass gratuita (captura de email) → catálogo con pestañas **Online / Presencial** → para quién → certificado, garantía, plan de pagos y lista de espera |
| `portafolio.html` | Galería tipo revista con filtros y lightbox; sección «antes/después» reservada para el model call |
| `sobre-mi.html` | Historia (Venezuela → Texas, esposo y dos hijos), filosofía, monograma, formación y kit |
| `reservar.html` | Reserva instantánea en 5 pasos: servicio → calendario y horarios → datos → depósito 30 % → confirmación con archivo `.ics` y WhatsApp |
| `contacto.html` | Tarjetas de contacto, formulario, zona de servicio, horario, FAQ general y textos legales (borrador) |

## Cómo verlo

Abrir `index.html` directamente funciona, pero para que todo cargue igual que en producción:

```bash
python -m http.server 8765
```

y visitar `http://localhost:8765`. Para volver a ver la intro (solo se muestra una vez por sesión): `index.html#intro`.

## Publicar en GitHub Pages

1. Crear el repositorio público y subir esta carpeta (el `.gitignore` ya excluye las fotos originales y el PDF).
2. En **Settings → Pages**: *Deploy from a branch* → `main` → `/ (root)`.
3. El sitio queda en `https://<usuario>.github.io/<repo>/`.

Con GitHub CLI, desde esta carpeta:

```bash
gh auth login
gh repo create claudia-serrano-web --public --source=. --push
gh api -X POST repos/{owner}/claudia-serrano-web/pages -f "source[branch]=main" -f "source[path]=/"
```

## Qué cambiar antes de lanzar (checklist para Jackson y Claudia)

**Datos reales** — todo está centralizado en `assets/js/main.js` (`window.SITE`): número de WhatsApp, teléfono visible, correo, Instagram, TikTok.

**Cifras a confirmar con Claudia** — «+7 años de experiencia» y «+500 rostros» son marcadores; cambiarlos en `index.html` y `sobre-mi.html` (`data-count`).

**Testimonios** — los tres de la portada están marcados como *[Ejemplo]*. Reemplazar por reseñas reales de Google después del model call (la FTC Rule on Reviews prohíbe reseñas ficticias).

**Precios** — son los sugeridos por la investigación (por encima del promedio local, dentro del rango nacional). Ajustar en `servicios.html`, `bodas.html`, `quinceaneras.html`, `academia.html` y en `SERVICES` dentro de `assets/js/booking.js`.

**Fotos de portafolio** — hoy son las fotos de estudio de Claudia. Las fotos de clientas se añaden solo con consentimiento firmado (parental para menores).

**Integraciones de producción**
- Reserva y depósito: Acuity / Square / GlossGenius (reemplaza `booking.js`) con Stripe para tarjeta y Apple Pay; Zelle/Venmo como alternativa.
- Formularios de boda/quince: HoneyBook o Dubsado (propuesta + contrato + retainer) y autoresponder bilingüe en menos de una hora.
- Masterclass y lista de espera: Flodesk / Mailchimp.
- Cursos: Squarespace Courses, Thinkific o Kajabi.
- Analítica: GA4 + Search Console + Meta Pixel, con aviso de cookies.

**Legal** — los textos de privacidad, términos, cancelación, academia y FTC en `contacto.html#legal` son borradores para revisión de abogado. El certificado de la academia no es acreditación estatal (TDLR).

**Tipografía** — el manual indica *TAN Mon Cheri* (fuente comercial). El sitio usa **Italiana** (Google Fonts) como sustituto visual; si se compra la licencia, cargar el `.woff2` y cambiar `--font-display` en `assets/css/main.css`.

## Estructura técnica

```
├── index.html … contacto.html     páginas estáticas
├── assets/css/main.css            sistema de diseño (tokens de marca, componentes, motion, responsive, reduced-motion)
├── assets/js/main.js              intro, nav flotante, reveals, idioma ES/EN, formularios → WhatsApp, galería, pestañas
├── assets/js/booking.js           flujo de reserva (calendario, horarios, depósito, .ics)
├── assets/img/                    fotos optimizadas en WebP (xl 1400 px · md 900 px · sm 520 px · recorte 4:5 · hero 16:9)
├── assets/logo/                   firma SVG (oro/blanco/negro), monograma CS, favicon, apple-touch-icon
└── assets/video/hero.mp4          loop del hero (generado a partir de una foto de Claudia)
```

**Bilingüe:** cada texto lleva su traducción en el atributo `data-en`; el botón ES/EN del menú alterna sin recargar y recuerda la elección. Para producción con SEO real, migrar a rutas `/es/` + `hreflang` como indica la investigación.

**Rendimiento y accesibilidad:** `100dvh`, WebP, `loading="lazy"`, video solo en escritorio y nunca con *save-data*, `prefers-reduced-motion` respetado (sin intro ni animaciones), foco visible, contraste AA en texto, navegación por teclado en menú y acordeones.

## Créditos

Diseño y desarrollo del prototipo: Jackson · Identidad de marca: manual «Claudia Serrano · Brand Identity» (13-01-2026).
