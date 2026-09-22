/* ============================================================
   AULA VIRTUAL · Claudia Serrano
   Aquí se editan los códigos de acceso y la lista de lecciones.
   Los videos van en la carpeta  aula/videos/  (ver aula/videos/README.md).
   Cada lección puede usar:
     - file:    "videos/nombre.mp4"        (archivo en esta carpeta)
     - youtube: "ID_DEL_VIDEO"             (video oculto "no listado" en YouTube)
     - vimeo:   "ID_DEL_VIDEO"             (video privado en Vimeo)
   ============================================================ */
window.AULA = {
  // Códigos que Claudia entrega a cada alumna al pagar (uno por alumna o por paquete)
  codigos: ["SERRANO2026", "PACKAGE1", "PACKAGE2", "PACKAGE3"],

  // Guías descargables (PDF) — poner los archivos en aula/guias/
  guias: [
    { titulo: "Guía de productos · piel", archivo: "guias/guia-piel.pdf" },
    { titulo: "Guía de productos · ojos y labios", archivo: "guias/guia-ojos-labios.pdf" },
    { titulo: "Lista de brochas esenciales", archivo: "guias/brochas.pdf" }
  ],

  lecciones: [
    { n: 1, titulo: "Preparación de piel", duracion: "38 min", paquete: "Package 1 · 2 · 3", descripcion: "Skincare previo, primer y cómo elegir tu tono de base para piel latina.", file: "videos/leccion-01-preparacion-de-piel.mp4" },
    { n: 2, titulo: "Soft glam paso a paso", duracion: "52 min", paquete: "Package 1 · 2 · 3", descripcion: "Base modulable, contorno suave, sombras neutras y pestañas naturales.", file: "videos/leccion-02-soft-glam.mp4" },
    { n: 3, titulo: "Full glam signature look", duracion: "61 min", paquete: "Package 1 · 2 · 3", descripcion: "El look más pedido: cejas definidas, delineado marcado, labios que duran.", file: "videos/leccion-03-full-glam.mp4" },
    { n: 4, titulo: "Novia: maquillaje de larga duración", duracion: "47 min", paquete: "Package 2 · 3", descripcion: "Piel a prueba de flash, lágrimas y 14 horas de fiesta.", file: "videos/leccion-04-novia.mp4" },
    { n: 5, titulo: "Quinceañera: glam apropiado para su edad", duracion: "44 min", paquete: "Package 2 · 3", descripcion: "Intensidad, brillo y acabado que fotografía perfecto en la misa y en la fiesta.", file: "videos/leccion-05-quinceanera.mp4" },
    { n: 6, titulo: "Invitadas y piel madura", duracion: "40 min", paquete: "Package 3", descripcion: "Texturas ligeras, luminosidad y técnicas para líneas de expresión.", file: "videos/leccion-06-piel-madura.mp4" },
    { n: 7, titulo: "Peinado 1: Hollywood waves", duracion: "35 min", paquete: "Package 3", descripcion: "Ondas de alfombra roja: secciones, tenaza, cepillado y fijación.", file: "videos/leccion-07-hollywood-waves.mp4" },
    { n: 8, titulo: "Peinado 2: recogido elegante", duracion: "39 min", paquete: "Package 3", descripcion: "Semirrecogido y moño bajo para novias y madrinas.", file: "videos/leccion-08-recogido.mp4" }
  ]
};
