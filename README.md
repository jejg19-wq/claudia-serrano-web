# Claudia Serrano · Makeup Studio & Academy — sitio web

Sitio publicado: **https://jejg19-wq.github.io/claudia-serrano-web/** (GitHub Pages, rama `main`).

## Qué es

Una sola página (`index.html`), pensada primero para el teléfono, que sigue el manual de marca:

- **Paleta:** #f5f5f5 · #ebe8e3 · #c4a484 · #b09079 · #d4af37 · #000000. Las secciones oscuras usan el marrón de la página «La nueva era» del manual.
- **Tipografía:** TAN Mon Cheri para títulos grandes y frases destacadas (en mayúsculas, como el manual); Open Sans para todo lo demás.
- **Portada** inspirada en la del manual: nombre grande, filete, banda taupe y video vertical de Claudia.

Secciones: portada · Sobre mí («La nueva era») · Servicios y precios · Novias · Academia (Makeup Class 1:1) · Portafolio · Contacto.

Aparte está `aula/index.html`, el aula de alumnas con código de acceso.

## Contenido (solo datos reales de la clienta)

| Servicio | Precio | Fuente |
|---|---|---|
| Bride Makeup & Hair | desde $350 | `catalogo/Bride Makeup and hair/` |
| Full Glam Signature Look (el más pedido) | $150 | `catalogo/Full glam signature look/` |
| Full Glam + Peinado (no novias) | $230 | `catalogo/Maquillaje full glam y peinado/` |
| Hollywood Waves | $120 | `catalogo/Hollywood waves/` |
| Makeup Class 1:1, presencial u online | desde $150 · Package 1 $300 · Package 2 $1,000 · Package 3 $1,500 | flyer en `cursos/` |

Contacto: WhatsApp +1 (210) 793-5636 · Instagram @claudiasserrano · claudiaserranoinfo@gmail.com · San Antonio, TX. Claudia atiende en español; el botón EN traduce la página por cortesía.

Todas las reservas van por **WhatsApp**, con un mensaje ya escrito según el servicio. No hay pagos ni calendario en línea.

Se dejaron fuera a propósito, hasta que Claudia los confirme: reseñas, cifras («+7 años», «+500 rostros») y políticas (depósito, cancelación, viáticos).

## Reglas técnicas

- **Todo el contenido es visible sin JavaScript y sin animaciones.** El movimiento es solo decoración: el video, la cinta de servicios, la entrada suave de la portada (nunca parte de invisible) y los hovers.
- El menú del teléfono usa `<details>`: funciona aunque el JavaScript falle.
- `assets/js/site.js` solo agrega el cambio de idioma, cierra el menú y pone el año.
- Las páginas llevan `noindex` hasta el lanzamiento.
- **Probar siempre sin «reducir movimiento»** y en el motor de Safari (iPhone). En modo reducido, un fallo anterior dejaba el sitio invisible para todos y no se veía.

## Estructura

```
index.html                 página principal
aula/                      aula de alumnas (index.html, aula.js, lecciones.js, videos/, guias/)
assets/css/site.css        estilos
assets/js/site.js          idioma, menú y año
assets/fonts/              TAN Mon Cheri reconstruida del PDF de marca (comprar licencia web antes de lanzar)
assets/img/                fotos optimizadas (WebP); assets/img/catalogo/ = fotos reales de clientas
assets/video/              video vertical de la portada
assets/logo/               firma, monograma e íconos
banner/                    banners para redes (ES/EN)
```

## Cómo verlo en la computadora

```
python -m http.server 8765
```

Después abrir `http://localhost:8765`.

## Publicar cambios

Cada `git push` a `main` actualiza GitHub Pages en uno o dos minutos.

## Antes de lanzar

- Comprar la licencia web de TAN Mon Cheri y reemplazar `assets/fonts/tan-mon-cheri.woff2`.
- Quitar `<meta name="robots" content="noindex">` de `index.html`.
- Aula: subir los videos reales a `aula/videos/` y las guías a `aula/guias/`, y cambiar los códigos en `aula/lecciones.js`. La validación es en el navegador, no es seguridad real.
