// =====================================================================
// DATOS DEL NEGOCIO — Vereda Silvestre
// ---------------------------------------------------------------------
// Los valores se editan en `negocio.json` (mismo directorio), bien a mano
// o desde el panel /admin. Este archivo solo los carga y añade el helper
// `waLink` para construir enlaces de WhatsApp.
// =====================================================================

import datos from './negocio.json'

export const negocio = datos

// Construye un enlace de WhatsApp. Si le pasas un mensaje, lo añade
// pre-rellenado; si no, devuelve el enlace simple al chat.
export function waLink(mensaje = '') {
  const base = `https://wa.me/${negocio.whatsapp}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}
