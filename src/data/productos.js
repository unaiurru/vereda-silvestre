import { waLink } from './negocio'
import datos from './productos.json'

// Los productos se editan en `productos.json` (a mano o desde /admin).
// Estructura de cada producto:
//   id (se usa como URL /tienda/:id), nombre, precio (número, MXN),
//   imagen (ruta a archivo de /public), categoria, descripcion,
//   etiqueta ('' | 'mas-vendido' | 'nuevo'), stock (true/false).

export const productos = datos.items

export function getProducto(id) {
  return productos.find((p) => p.id === id)
}

// Devuelve las categorías presentes en el catálogo (para los filtros).
export function categoriasProductos() {
  return [...new Set(productos.map((p) => p.categoria))]
}

/**
 * Construye el enlace de WhatsApp para enviar un pedido.
 * @param {{ producto: object, cantidad: number }[]} items
 */
export function whatsappLinkPedido(items) {
  const lineas = items.map(
    ({ producto, cantidad }) =>
      `• ${cantidad}× ${producto.nombre} — ${cantidad * producto.precio} MXN`
  )
  const total = items.reduce(
    (acc, { producto, cantidad }) => acc + cantidad * producto.precio,
    0
  )
  const msg =
    'Hola, quiero hacer un pedido en Vereda Silvestre:\n' +
    lineas.join('\n') +
    `\nTotal: ${total} MXN\n` +
    '¿Me confirmas disponibilidad y envío?'
  return waLink(msg)
}
