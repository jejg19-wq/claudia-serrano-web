# Contexto del proyecto · Sitio web de Claudia Serrano

Este archivo lo lee Claude Code automáticamente al abrir esta carpeta. Resume todo lo hecho y lo pendiente para continuar la conversación en un chat nuevo sin perder nada. Usuario: **Jackson** (diseñador, habla español; escribe por voz). Cliente: **Claudia Serrano**, maquilladora y estilista venezolana en San Antonio, TX (esposo y dos hijos). Fecha de estado: 22 de septiembre de 2026.

## Regla principal

**No inventar nada sobre Claudia.** Servicios, precios, idiomas, cifras y datos de contacto salen SOLO del material de la clienta (`catalogo/`, `cursos/`, PDF de marca) o de lo que Jackson diga. Claudia **atiende solo en español**; la traducción al inglés del sitio es cortesía para las familias, nunca decir que es bilingüe. Lo que sea propuesta (políticas, cifras "+7 años", "+500 rostros", testimonios) va marcado como tal.

## Datos reales confirmados

- WhatsApp **+1 (210) 793-5636** · Instagram **@claudiasserrano** · correo **claudiaserranoinfo@gmail.com** (todo en `window.SITE`, `assets/js/main.js`). TikTok: sin confirmar.
- Servicios (carpeta `catalogo/`): Bride Makeup & Hair desde $350 · Full Glam Signature Look $150 (el más pedido) · Full Glam + Peinado $230 (no novias) · Hollywood Waves $120.
- Cursos (flyer en `cursos/`): Makeup Class 1:1, presencial u online, desde $150. Package 1 $300 (2 clases, 7 h, automaquillaje) · Package 2 $1,000 (4 clases, 14 h, modelos) · Package 3 $1,500 (5 clases, 22 h, + 2 técnicas de peinado). Certificado y guías de productos.
- Marca (PDF): paleta #000000 #d4af37 #c4a484 #b09079 #ebe8e3 #f5f5f5; tipografía TAN Mon Cheri (títulos) + Open Sans (cuerpo); firma script y monograma CS.

## Qué hay en la carpeta

- 9 páginas estáticas: `index`, `servicios`, `bodas`, `quinceaneras`, `academia`, `portafolio`, `sobre-mi`, `reservar` (reserva en 5 pasos, depósito 30 % simulado, `.ics`), `contacto` (FAQ + legal borrador). Bilingüe ES/EN con `data-en`.
- `aula/` — aula virtual para alumnas: `aula/index.html` pide código (demo `SERRANO2026`), lecciones y códigos en `aula/lecciones.js`, videos en `aula/videos/`, guías en `aula/guias/`. Es validación en navegador, no seguridad real.
- `assets/js/gate.js` — puerta de clave (`claudia`). **Desactivada el 22 sep a pedido de Jackson** (no veía nada al abrir el enlace): se quitó la etiqueta `<script src="…gate.js">` de todas las páginas; el archivo sigue ahí por si se quiere reactivar (volver a poner la etiqueta en el `<head>`). Todas las páginas llevan `<meta name="robots" content="noindex">` hasta el lanzamiento (quitarlo cuando haya reseñas y políticas reales).
- `assets/fonts/` — TAN Mon Cheri reconstruida desde el subset del PDF con acentos/ñ sintetizados (`scratchpad/font_build.py` fue el generador). Italiana es respaldo para ¿ ? ! $. El 22 sep se corrigió: acento agudo dibujado (glifo `acutecomb.cs`, antes salía del apóstrofo y parecía «d'ía») y la `j` desplazada para que el gancho quede bajo la letra anterior (antes «Maquilla je»).
- Diseño (22 sep, «modernización»): etiquetas editoriales con filete en vez de cápsulas, botones planos con flecha suelta, tarjetas de una capa (`--bezel-pad: 0`), radios 1.25/1/0.75 rem. Todo en `assets/css/main.css`. Solo en PC (puntero fino y ≥1024 px): View Transitions entre páginas, hero que se aleja con el scroll, grano y apariciones animadas. En teléfonos y tabletas el contenido está siempre visible, sin depender de animaciones (Safari de iPhone no disparaba algunas).
- `assets/img/catalogo/` — fotos reales de clientas por servicio (WebP). `assets/img/` — sesión de estudio de Claudia. `assets/video/` — hero 16:9 y vertical 9:16 generados con Higgsfield Kling 3.0 a partir de la foto IMG_4020.
- `banner/` — banners de marca (video 16:9 y 9:16 con overlay dorado, estáticos) en ES y EN.
- `README.md` — manual de entrega (integraciones de producción, checklist).
- Material fuente excluido del repo por `.gitignore`: `fotos de claudia/`, PDF, SVG originales, `catalogo/`, `cursos/`.

## Estado de publicación (lo importante pendiente)

1. **Repositorio git** en `main`, con remoto en GitHub (ver punto 3). Cada cambio se sube con `git push`.
2. **Artifact de Claude** (requiere iniciar sesión en Claude): https://claude.ai/artifact/BeDeYqB9rVGXSn92Vq9Xnb — privado hasta que Jackson use el botón Compartir.
3. **GitHub Pages: PUBLICADO (22 sep 2026).** Repo público https://github.com/jejg19-wq/claudia-serrano-web · sitio **https://jejg19-wq.github.io/claudia-serrano-web/** (abre directo, sin clave; Pages desde `main` / root, se reconstruye solo con cada `git push`, ~1 min). `gh` tiene sesión como `jejg19-wq` y `gh auth setup-git` está hecho. Si la sesión se pierde: `gh auth login --web` en segundo plano; el botón «Authorize» de GitHub solo se habilita con la página visible y con foco (en el panel del navegador integrado, el usuario debe tenerlo abierto).
4. **Higgsfield Websites: RETIRADO (23 sep 2026).** Jackson pidió usar solo GitHub. El sitio de Higgsfield (`website_id 03def297-059a-4191-8f3c-1d3d0db2c2a1`, https://claudia-serrano.higgsfield.app) ya no tiene la web: cada página redirige a la misma página en GitHub Pages. El MCP no permite borrarlo; para eliminarlo del todo (y quitarlo del feed) Jackson debe hacerlo desde su cuenta de Higgsfield. No volver a publicar ahí.

## Cómo trabajar aquí

- Vista local: `python -m http.server 8765` y abrir `http://localhost:8765`. `index.html#intro` fuerza la intro y el video aunque Windows tenga "reducir movimiento" activo (Jackson lo tiene activo). `?static=1` desactiva animaciones para capturas.
- Capturas de control: Chrome headless funciona, pero **probar siempre con `prefers-reduced-motion: no-preference`** (Jackson tiene «reducir movimiento» y en ese modo el sitio salta las animaciones: así se escondió un fallo que dejaba la portada y todo el contenido invisibles para los demás, corregido el 23 sep). Para iPhone hay Playwright con WebKit en el scratchpad (`venv`, `vis_check.py`).
- Higgsfield MCP está conectado (cuenta de Jackson): generar imágenes/videos cuesta créditos (Kling 3.0 pro 5 s ≈ 8.75). Jackson dio permiso para generar lo necesario.
- Commits en español, con `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Pendientes con Claudia / Jackson

- Confirmar cifras «+7 años» y «+500 rostros» (`data-count` en `index.html` y `sobre-mi.html`).
- Reemplazar los 3 testimonios marcados *[Ejemplo]* por reseñas reales.
- Confirmar políticas propuestas: depósito 30 %, cancelación 48 h, viáticos fuera del Loop 1604 a $1/milla, prueba de novia cotizada.
- Subir videos reales del curso a `aula/videos/` y guías a `aula/guias/`.
- Comprar licencia web de TAN Mon Cheri antes del lanzamiento y reemplazar `assets/fonts/tan-mon-cheri.woff2`.
- Integraciones de producción (Acuity/Square + Stripe, HoneyBook, plataforma de cursos, GA4) — ver README.
