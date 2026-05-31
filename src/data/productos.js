// Fuente única de verdad para los productos de la tienda.
// Schema de cada producto:
//   {
//     id: 'kebab-case-sin-acentos',  // se usa como URL (/tienda/:id)
//     nombre, precio (número, MXN), imagen (/tienda/...),
//     categoria, descripcion (1-2 frases),
//     etiqueta: null | 'mas-vendido' | 'nuevo',
//     stock: bool  // false => "Agotado"
//   }
//
// Las imágenes son placeholders en /tienda/. Ver ASSETS-REVISAR.md para la
// lista exacta de fotos que faltan y su ruta destino.

export const productos = [
  {
    id: 'correa-antideslizante-sprenger',
    nombre: 'Correa antideslizante Sprenger',
    precio: 500,
    imagen: '/tienda/correa-antideslizante.jpg',
    categoria: 'Correas',
    descripcion: 'Correa Sprenger con agarre antideslizante. Cómoda y segura para el paseo diario.',
    etiqueta: null,
    stock: true,
  },
  {
    id: 'collar-correccion-sprenger',
    nombre: 'Collar de corrección Sprenger',
    precio: 300,
    imagen: '/tienda/collar-correccion-sprenger.jpg',
    categoria: 'Collares',
    descripcion: 'Collar de corrección Sprenger de acero. Uso bajo guía profesional.',
    etiqueta: null,
    stock: true,
  },
  {
    id: 'transportadora-petmate',
    nombre: 'Transportadora Petmate',
    precio: 2500,
    imagen: '/tienda/transportadora-petmate.jpg',
    categoria: 'Transporte',
    descripcion: 'Transportadora Petmate resistente, con buena ventilación, para viajes y traslados.',
    etiqueta: 'mas-vendido',
    stock: true,
  },
  {
    id: 'correa-larga-10m',
    nombre: 'Correa larga 10 m',
    precio: 350,
    imagen: '/tienda/correa-larga-10m.jpg',
    categoria: 'Correas',
    descripcion: 'Correa larga de 10 metros, ideal para trabajo de campo, llamada y exploración.',
    etiqueta: null,
    stock: true,
  },
  {
    id: 'correa-cuero-180',
    nombre: 'Correa de cuero 1.80 m',
    precio: 200,
    imagen: '/tienda/correa-cuero-180.jpg',
    categoria: 'Correas',
    descripcion: 'Correa de cuero de 1.80 m, sobria y duradera para el día a día.',
    etiqueta: 'nuevo',
    stock: true,
  },
  {
    id: 'clicker',
    nombre: 'Clicker',
    precio: 80,
    imagen: '/tienda/clicker.jpg',
    categoria: 'Adiestramiento',
    descripcion: 'Clicker de adiestramiento para marcar comportamientos con precisión.',
    etiqueta: null,
    stock: true,
  },
  {
    id: 'portapremios',
    nombre: 'Portapremios para perro',
    precio: 85,
    imagen: '/tienda/portapremios.jpg',
    categoria: 'Adiestramiento',
    descripcion: 'Portapremios con cierre rápido para tener los premios siempre a mano durante el trabajo.',
    etiqueta: null,
    stock: true,
  },
]

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
  const numero = '5215562058871'
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
  return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
}
