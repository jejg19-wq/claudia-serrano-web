# Herramientas de prueba y producción

Sirven para comprobar la página antes de publicar. Se usan con el servidor local en marcha: `python -m http.server 8765`.

Preparación (una vez):

```
python -m venv tools/.venv
tools/.venv/Scripts/python -m pip install playwright
tools/.venv/Scripts/python -m playwright install webkit chromium
```

| Script | Qué hace |
|---|---|
| `clip_check.py [origen]` | Letras cortadas o que no caben. Revisa las 5 páginas y las pestañas del portal en iPhone SE, iPhone 15, Pixel 7 y PC, en español e inglés. Debe dar `TOTAL problemas: 0`. |
| `flow_check.py [origen]` | Recorrido completo en iPhone y PC: agendar, ver la cita en el portal, ver una clase, sesión 1:1, carrito e inscripción. |
| `toggle.py [origen]` | Pulsa el botón ES/EN en cada página y confirma que cambia al inglés. |
| `en_check.py` | En modo inglés, lista los textos que siguen en español. Si aparece alguno, hay que añadirlo en `assets/js/i18n.js`. |
| `contrast.py` | Busca textos con poco contraste. |
| `reel.py` | Rehace `assets/video/reel.mp4` a partir de 6 fotos de Claudia (necesita ffmpeg). |

`[origen]` es `http://localhost:8765` por defecto. También puede ser `https://jejg19-wq.github.io/claudia-serrano-web` para probar la versión publicada.

**Importante:** probar siempre **sin «reducir movimiento»**. Jackson lo tiene activado en Windows, y en ese modo un fallo anterior dejaba la página invisible para todos y no se veía.
