// =====================================================================
// DATOS DEL NEGOCIO — Vereda Silvestre
// ---------------------------------------------------------------------
// Edita aquí la información de contacto y marca. Estos valores se usan
// en TODA la web (cabecera, pie, contacto, tarifas, servicios, tienda…),
// así que cambiándolos en este archivo se actualizan en todas partes.
// =====================================================================

export const negocio = {
  // Marca
  nombre: 'Vereda Silvestre',
  nombreLegal: 'Centro Canino Vereda Silvestre S.A.S. de C.V.',

  // Contacto
  // Número de WhatsApp en formato internacional, SOLO dígitos (sin +, sin espacios).
  whatsapp: '5215562058871',
  // Cómo se muestra el teléfono al usuario (con formato bonito).
  telefonoVisible: '+52 1 55 6205 8871',
  email: 'v.silvestre.info@gmail.com',

  // Ubicación
  ciudad: 'Jilotepec, Estado de México',
  ciudadCompleta: 'Jilotepec de Molina Enríquez, Estado de México',
  horario: 'Lun–Sáb · 9:00 – 19:00',

  // Redes sociales (URL completa)
  instagram: 'https://www.instagram.com/vereda_silvestre/',
  facebook: 'https://www.facebook.com/people/Vereda-Silvestre/61565697153668/',

  // Mapa de Google incrustado en la página de Contacto (URL del "embed").
  mapaEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.213254299979!2d-99.70211522417542!3d20.125148918198853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3b242f4b086b1%3A0x6fab260cda796163!2s54273%20San%20Ignacio%20de%20Loyola%2C%20M%C3%A9x.%2C%20M%C3%A9xico!5e0!3m2!1ses!2ses!4v1777375412486!5m2!1ses!2ses',
}

// Construye un enlace de WhatsApp. Si le pasas un mensaje, lo añade
// pre-rellenado; si no, devuelve el enlace simple al chat.
export function waLink(mensaje = '') {
  const base = `https://wa.me/${negocio.whatsapp}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}
