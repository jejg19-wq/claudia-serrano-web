# Videos del aula virtual

Aquí van los videos de las lecciones que ven las alumnas que pagaron.

**Cómo agregar una lección**

1. Exporta el video en MP4 (H.264, 1080p, audio AAC). Para que pese poco:
   `ffmpeg -i original.mov -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k -movflags +faststart leccion-01-preparacion-de-piel.mp4`
2. Copia el archivo a esta carpeta con el nombre que aparece en `aula/lecciones.js` (o cambia ahí el nombre).
3. Sube los cambios al repositorio. Listo: la lección aparece en el aula.

**Límites**

- GitHub no acepta archivos de más de 100 MB. Si un video pesa más, súbelo a YouTube como *no listado* (o a Vimeo como privado) y en `aula/lecciones.js` usa `youtube: "ID"` en lugar de `file`.
- Los códigos de acceso se editan en `aula/lecciones.js` (`codigos`). Claudia entrega un código a cada alumna al recibir el pago.

**Importante:** en el prototipo el código se valida en el navegador; cualquier persona con conocimientos técnicos podría ver los videos. Para el lanzamiento real, usar una plataforma de cursos (Squarespace Courses, Thinkific, Kajabi) o un login con servidor.

Las guías en PDF van en `aula/guias/`.
