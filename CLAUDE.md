# Contexto del proyecto · Sitio web de Claudia Serrano

Este archivo lo lee Claude Code automáticamente al abrir esta carpeta. Resume todo lo hecho y lo pendiente para continuar la conversación en un chat nuevo sin perder nada. Usuario: **Jackson** (diseñador, habla español; escribe por voz). Cliente: **Claudia Serrano**, maquilladora y estilista venezolana en San Antonio, TX (esposo y dos hijos). Fecha de estado: 23 de septiembre de 2026.

## Regla principal

**No inventar nada sobre Claudia.** Servicios, precios, cifras y datos de contacto salen SOLO del material de la clienta (`catalogo/`, `cursos/`, PDF de marca) o de lo que Jackson diga. Lo que sea propuesta o ejemplo va marcado como tal.

**Idioma (Jackson, 23 sep):** la página es **bilingüe español / inglés** (se abre en inglés si el navegador está en inglés; botón ES/EN) y los **cursos también se dan en inglés**; todos los videos llevarán **subtítulos**. **No escribir «atiendo en español»** en ningún lado. Descripción real de Claudia (su perfil): «Makeup and hair para todo tipo de ocasión, especialista en novias y quinceañeras». Traducciones en `assets/js/i18n.js` (diccionario español → inglés; añadir ahí cada texto nuevo).

## Datos reales confirmados

- WhatsApp **+1 (210) 793-5636** · Instagram **@claudiasserrano** · correo **claudiaserranoinfo@gmail.com** (los enlaces de WhatsApp van fijos en el HTML; `window.SITE` en `assets/js/site.js`). TikTok: sin confirmar.
- Servicios (carpeta `catalogo/`): Bride Makeup & Hair desde $350 · Full Glam Signature Look $150 (el más pedido) · Full Glam + Peinado $230 (no novias) · Hollywood Waves $120.
- Cursos (flyer en `cursos/`): Makeup Class 1:1, presencial u online, desde $150. Package 1 $300 (2 clases, 7 h, automaquillaje) · Package 2 $1,000 (4 clases, 14 h, modelos) · Package 3 $1,500 (5 clases, 22 h, + 2 técnicas de peinado). Certificado y guías de productos.
- Marca (PDF): paleta #000000 #d4af37 #c4a484 #b09079 #ebe8e3 #f5f5f5; tipografía TAN Mon Cheri (títulos) + Open Sans (cuerpo); firma script y monograma CS.

## Qué hay en la carpeta

- **Prototipo actual (23 sep 2026, 3.ª versión)** — Jackson rechazó la página de una sola sección («No me gusta») y pidió: agenda de citas, academia con portal donde las alumnas entran «como si ya hubieran pagado» y ven un video (clases + 1:1), tienda de productos que patrocinan a Claudia (se conectará a **Shopify**), portal de acceso con Claudia como protagonista, muy moderno y con motion design, tipografía de la marca, adaptado a teléfono y PC, e imágenes nuevas con Higgsfield donde las fotos se repetirían. Páginas: `index.html` (portal + landing), `agendar.html`, `academia.html`, `tienda.html`, `portal/index.html` (`aula/` redirige ahí). Datos en `assets/js/data.js`; idioma en `assets/js/i18n.js`; lógica compartida y motion en `assets/js/app.js`; por página `booking.js`, `academy.js`, `shop.js`, `portal.js`; estilos `assets/css/app.css`. Pagos, horarios, productos y videos de lecciones son de ejemplo y están marcados en la página. Portadas partidas: la foto/video de Claudia nunca queda bajo el texto (teléfono: arriba; PC: a la derecha). Subtítulos de ejemplo en `assets/video/subs/`. Detalle completo en `README.md`.
- Imágenes generadas (Higgsfield GPT Image 2.5, 0,5 créditos c/u; quedaban 5,3 créditos → ahora ~0,8): 6 productos de ejemplo, 2 de academia y 1 de estudio en `assets/img/gen/`. Secuencia de 61 cuadros del video vertical en `assets/seq/`.
- `assets/fonts/` — TAN Mon Cheri reconstruida desde el subset del PDF con acentos/ñ sintetizados (`scratchpad/font_build.py` fue el generador). Italiana es respaldo para ¿ ? ! $. El 22 sep se corrigió: acento agudo dibujado (glifo `acutecomb.cs`, antes salía del apóstrofo y parecía «d'ía») y la `j` desplazada para que el gancho quede bajo la letra anterior (antes «Maquilla je»).
- `assets/img/catalogo/` — fotos reales de clientas por servicio (WebP). `assets/img/` — sesión de estudio de Claudia. `assets/video/` — hero 16:9 y vertical 9:16 generados con Higgsfield Kling 3.0 a partir de la foto IMG_4020.
- `banner/` — banners de marca (video 16:9 y 9:16 con overlay dorado, estáticos) en ES y EN.
- `README.md` — manual de entrega (contenido, reglas técnicas, cómo publicar, pendientes antes de lanzar).
- Material fuente excluido del repo por `.gitignore`: `fotos de claudia/`, PDF, SVG originales, `catalogo/`, `cursos/`.

## Estado de publicación (lo importante pendiente)

1. **Repositorio git** en `main`, con remoto en GitHub (ver punto 3). Cada cambio se sube con `git push`.
2. **Artifact de Claude** (requiere iniciar sesión en Claude): https://claude.ai/artifact/BeDeYqB9rVGXSn92Vq9Xnb — privado hasta que Jackson use el botón Compartir.
3. **GitHub Pages: PUBLICADO (22 sep 2026; sitio nuevo el 23 sep).** Repo público https://github.com/jejg19-wq/claudia-serrano-web · sitio **https://jejg19-wq.github.io/claudia-serrano-web/** (abre directo, sin clave; Pages desde `main` / root, se reconstruye solo con cada `git push`, ~1 min). `gh` tiene sesión como `jejg19-wq` y `gh auth setup-git` está hecho. Si la sesión se pierde: `gh auth login --web` en segundo plano; el botón «Authorize» de GitHub solo se habilita con la página visible y con foco (en el panel del navegador integrado, el usuario debe tenerlo abierto).
4. **Higgsfield Websites: RETIRADO (23 sep 2026).** Jackson pidió usar solo GitHub. El sitio de Higgsfield (`website_id 03def297-059a-4191-8f3c-1d3d0db2c2a1`, https://claudia-serrano.higgsfield.app) quedó vacío: sin páginas, sin título ni portada (invisible en el feed). El MCP no permite borrarlo; para eliminarlo del todo Jackson debe hacerlo desde su cuenta de Higgsfield. No volver a publicar ahí.

## Cómo trabajar aquí

- Vista local: `python -m http.server 8765` y abrir `http://localhost:8765` (o `preview_start` con `claudia-site`).
- Capturas de control: Chrome headless funciona, pero **probar siempre con `prefers-reduced-motion: no-preference`** (Jackson tiene «reducir movimiento» y en ese modo el sitio salta las animaciones: así se escondió un fallo que dejaba la portada y todo el contenido invisibles para los demás, corregido el 23 sep). Para iPhone: `pip install playwright` + `playwright install webkit` en un venv del scratchpad y abrir la página con el dispositivo «iPhone 15».
- Higgsfield MCP está conectado (cuenta de Jackson): generar imágenes/videos cuesta créditos (Kling 3.0 pro 5 s ≈ 8.75). Jackson dio permiso para generar lo necesario.
- Commits en español, con `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Pendientes con Claudia / Jackson

- Si Claudia quiere reseñas, cifras (años, rostros) o políticas en la página, pedirle los datos reales (hoy no están).
- Subir videos reales del curso a `aula/videos/` y guías a `aula/guias/`.
- Comprar licencia web de TAN Mon Cheri antes del lanzamiento y reemplazar `assets/fonts/tan-mon-cheri.woff2`.
- Opcional a futuro: agenda/pagos en línea (Acuity/Square), plataforma de cursos para el aula, analítica (GA4).
