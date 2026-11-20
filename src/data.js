// EDITA AQUÍ: número de WhatsApp (solo dígitos con código de país), precios y paquetes.
export const WA = "https://wa.me/0000000000";
// Opcional: URL que recibe cada cotización completada (Zapier, Make, Google Apps Script, etc.)
export const LEAD_URL = "";
export const WHEN = ["En menos de 2 semanas", "En 1 a 2 meses", "Más adelante", "Solo estoy cotizando"];
// Bodas y eventos ocultos por ahora (sin portafolio, trabajas solo). Para reactivarlos: ["empresas", "personas", "bodas", "eventos", "digital"]
export const ORDER = ["empresas", "personas", "digital"];
// Ajustes automáticos de precio en la cotización
export const RUSH = { pct: 0.15, min: 5 };      // reserva en menos de 2 semanas: +15%, mínimo $5
export const EARLY = { pct: 0.10, minPrice: 85 }; // "más adelante": -10%, solo en paquetes de $85 o más
export const wa = (t) => WA + "?text=" + encodeURIComponent(t);

export const S = {
  empresas: {
    label: "Empresas", tile: "t0", short: "Producto, equipo y campañas.",
    h: "Imagen que vende.",
    lead: "Fotos y video para catálogos, redes y campañas. Entregamos listo para publicar, con licencia de uso comercial.",
    uso: ["Catálogo o tienda online", "Redes sociales", "Campaña publicitaria", "Imagen del equipo o web"],
    pain: [
      ["Mis fotos no se ven profesionales", "Fondo limpio, retoque y estilo consistente en todas tus fotos."],
      ["No tengo tiempo para coordinar", "Nosotros planeamos y dirigimos la sesión por ti."],
      ["Me han entregado tarde antes", "Fecha de entrega acordada por escrito antes de empezar."],
      ["No sé qué fotos necesito", "Te armamos la lista de tomas según tu objetivo."]
    ],
    sc: ["Pocos productos o una persona", "Un catálogo o varias personas", "Una campaña completa", "No lo sé todavía"],
    pk: [
      { n: "Start", p: 60, u: "1 h", items: ["10 fotos de producto o marca", "Fondo limpio y retoque básico", "Licencia para redes y web", "Entrega en 3 días"] },
      { n: "Marca", p: 140, u: "2–3 h", feat: 1, extra: ["10 fotos más (20 en total)", "Lista de tomas según tu objetivo", "Fotos lifestyle en locación", "1 reel de 15–30 s"] },
      { n: "Campaña", p: 280, u: "medio día", extra: ["15 fotos más (35 en total)", "2 reels más (3 en total)", "Dirección creativa del contenido", "Entrega prioritaria"] }
    ]
  },
  personas: {
    label: "Personas", tile: "t1", short: "Retratos, familia y marca personal.",
    h: "Tu mejor versión.",
    lead: "Retratos naturales para ti, tu familia o tu marca personal. Te guiamos en cada pose para que no tengas que improvisar.",
    uso: ["Redes o marca personal", "Familia", "Cumpleaños o aniversario", "Un regalo"],
    pain: [
      ["Me da pena posar", "Te guiamos pose por pose, sin que tengas que saber."],
      ["No me gusto en las fotos", "Luz, ángulos y retoque natural que te favorecen."],
      ["No sé qué ponerme", "Asesoría de estilo antes de la sesión."],
      ["No sé dónde hacerlo", "Te proponemos locaciones según tu estilo."]
    ],
    sc: ["Solo yo", "Varias personas o varios looks", "Producción completa con video", "No lo sé todavía"],
    pk: [
      { n: "Mini retrato", p: 30, u: "1 h", items: ["10 fotos editadas", "1 locación", "Entrega en 3 días"] },
      { n: "Sesión estándar", p: 50, u: "1 h 30 min", feat: 1, extra: ["10 fotos más (20 en total)", "30 min más de sesión", "1 cambio de outfit", "Galería privada online"] },
      { n: "Sesión completa", p: 85, u: "2 h", extra: ["15 fotos más (35 en total)", "1 locación más (2 en total)", "Reel de 15–30 s para redes", "Asesoría de estilo"] }
    ]
  },
  bodas: {
    label: "Bodas", tile: "t2", short: "Tu día, bien guardado.",
    h: "Tu día, bien guardado.",
    lead: "Cubrimos la ceremonia y la fiesta sin interrumpirlos, para que vivas el día y recibas los recuerdos después.",
    uso: ["Ceremonia civil", "Ceremonia y fiesta", "Boda en destino", "Boda íntima"],
    pain: [
      ["Miedo a perder momentos clave", "Con segundo fotógrafo cubrimos todo al mismo tiempo."],
      ["Fotógrafos que tardan meses", "Fecha de entrega acordada antes de la boda."],
      ["No sé cuánto cuesta realmente", "Precio cerrado, sin cobros extra sorpresa."],
      ["No me gustan las fotos posadas", "Estilo espontáneo: capturamos, no actuamos."]
    ],
    sc: ["Íntima, menos de 50 invitados", "Entre 50 y 150 invitados", "Más de 150 o en destino", "No lo sé todavía"],
    pk: [
      { n: "Esencial", p: 690, u: "4 horas", items: ["Un fotógrafo", "300 fotos editadas", "Galería online", "Entrega en 3 semanas"] },
      { n: "Clásica", p: 1290, u: "8 horas", feat: 1, extra: ["4 horas más de cobertura", "Segundo fotógrafo", "200 fotos más (500 en total)", "Sesión de pareja previa"] },
      { n: "Premium", p: 2190, u: "día completo", extra: ["Video resumen de 3–5 min", "Tomas con dron", "Álbum impreso de 30 páginas", "Entrega prioritaria"] }
    ]
  },
  eventos: {
    label: "Eventos", tile: "t3", short: "Cumpleaños, fiestas y corporativos.",
    h: "Cada momento, capturado.",
    lead: "Cobertura de cumpleaños, graduaciones, fiestas y eventos de empresa. Estamos en todo y no estorbamos.",
    uso: ["Cumpleaños", "Graduación", "Evento de empresa", "Fiesta privada"],
    pain: [
      ["Quiero fotos de todos los invitados", "Cobertura continua y galería compartida para invitados."],
      ["Las necesito al día siguiente", "Entrega exprés en 48 h."],
      ["No quiero a alguien que estorbe", "Trabajamos discretos, sin interrumpir el evento."],
      ["Quiero también video", "Reel y video resumen del evento."]
    ],
    sc: ["Hasta 30 invitados", "De 30 a 100 invitados", "Más de 100 o con video", "No lo sé todavía"],
    pk: [
      { n: "Express", p: 249, u: "2 horas", items: ["100 fotos editadas", "1 fotógrafo", "Galería online", "Entrega en 5 días"] },
      { n: "Completo", p: 499, u: "4 horas", feat: 1, extra: ["2 horas más de cobertura", "150 fotos más (250 en total)", "Galería compartida", "Entrega en 48 h"] },
      { n: "Foto + video", p: 899, u: "6 horas", extra: ["2 horas más de cobertura", "Segundo fotógrafo", "Reel del evento", "Video resumen de 2–3 min"] }
    ]
  },
  digital: {
    label: "Web y sistemas", tile: "t4", short: "Landing, tienda, catálogo y CRM.",
    h: "Tu negocio, siempre abierto.",
    lead: "Landing pages, tiendas online, catálogos web y herramientas a medida, como un CRM para dar seguimiento a tus clientes.",
    uso: ["Captar clientes", "Vender online", "Mostrar mi catálogo", "Organizar mi equipo y clientes"],
    pain: [
      ["Pierdo clientes por no dar seguimiento", "Un CRM con seguimiento y recordatorios para que nadie se quede sin respuesta."],
      ["Mi web actual no me trae clientes", "Una landing hecha para convertir, con un solo objetivo claro."],
      ["Manejo todo en Excel y WhatsApp", "Un sistema donde clientes, ventas y tareas viven en un solo lugar."],
      ["Todavía no tengo web", "Te la entregamos publicada y lista para recibir clientes."]
    ],
    sc: ["Una página para captar clientes", "Un catálogo o tienda para vender", "Un sistema para organizar mi negocio", "No lo sé todavía"],
    pk: [
      { n: "Landing", p: 490, u: "7 días", items: ["Landing de 1 página a medida", "Diseño adaptado a celular", "Formulario y botón de WhatsApp", "Publicada en tu dominio"] },
      { n: "Tienda y catálogo", p: 1290, u: "3 semanas", feat: 1, extra: ["Hasta 50 productos", "Carrito y pagos online", "Panel para editar tú mismo", "Buscador y filtros"] },
      { n: "Sistema a medida", p: 2900, u: "6 semanas", extra: ["CRM de seguimiento de clientes", "Usuarios, roles y reportes", "Recordatorios automáticos", "Capacitación a tu equipo"] }
    ]
  }
};

// Extras sugeridos por preocupación: [nombre, precio, último paquete donde aún aplica (0,1,2; 9 = siempre)]
export const ADD = {
  empresas: [["Retoque avanzado", 15, 9], ["Coordinación completa", 20, 1], ["Entrega exprés 48 h", 10, 1], ["Lista de tomas", 10, 0]],
  personas: [null, ["Retoque premium", 10, 9], ["Asesoría de estilo", 10, 1], ["Búsqueda de locación", 10, 9]],
  bodas: [["Segundo fotógrafo", 250, 0], ["Entrega prioritaria", 150, 1], null, ["Sesión de pareja previa", 120, 0]],
  eventos: [["Galería compartida", 60, 0], ["Entrega en 48 h", 90, 0], null, ["Reel del evento", 180, 1]],
  digital: [["Recordatorios automáticos", 150, 1], ["Auditoría de conversión", 120, 9], ["Migración de tus datos", 200, 1], ["Dominio y hosting (1er año)", 60, 9]]
};
// Paquete recomendado cuando el cliente responde "No lo sé todavía", según su preocupación
export const PT = { empresas: [0, 1, 1, 1], personas: [0, 1, 1, 0], bodas: [2, 1, 1, 1], eventos: [1, 1, 0, 2], digital: [2, 0, 2, 0] };
