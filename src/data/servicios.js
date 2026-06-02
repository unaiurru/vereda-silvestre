import { waLink } from './negocio'
import datos from './servicios.json'

// Los servicios se editan en `servicios.json` (a mano o desde /admin).
// Aquí solo se cargan y se expone el helper de WhatsApp.
//
// Estructura de cada servicio (en el JSON):
//   slug, titulo, categoria, precio, estado ('activo' | 'finalizado'),
//   resumen, descripcion (lista de párrafos), incluye (lista),
//   media (lista de { tipo: 'imagen'|'video'|'pendiente', src, label }),
//   portada (foto de la tarjeta).
// El "slug" se usa como URL: sin acentos ni ñ.

export const servicios = datos.items

export function whatsappLinkServicio(titulo) {
  return waLink(`Hola, quiero información sobre ${titulo}.`)
}
