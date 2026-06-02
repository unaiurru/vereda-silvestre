import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react'
import { getProducto } from '../data/productos'
import { useCarrito } from '../context/CarritoContext'
import useSeo from '../hooks/useSeo'

const etiquetaBadge = {
  'mas-vendido': { texto: 'Más vendido', clase: 'bg-oliva text-crema-clara' },
  nuevo: { texto: 'Nuevo', clase: 'bg-amber-700 text-crema-clara' },
}

export default function ProductoDetalle() {
  const { id } = useParams()
  const producto = getProducto(id)

  useSeo({
    title: producto ? producto.nombre : 'Producto',
    description: producto ? producto.descripcion : 'Producto de la tienda de Vereda Silvestre.',
    path: producto ? `/tienda/${producto.id}` : '/tienda',
  })

  const { agregar, cambiarCantidad, items, abrir } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  // Reset de la cantidad al cambiar de producto, en render (patrón recomendado
  // por React en vez de un efecto que llame a setState). El scroll al inicio lo
  // gestiona <ScrollToTop /> en el Layout.
  const [prevId, setPrevId] = useState(id)
  if (id !== prevId) {
    setPrevId(id)
    setCantidad(1)
  }

  if (!producto) {
    return <Navigate to="/tienda" replace />
  }

  const agotado = producto.stock === false
  const badge = producto.etiqueta ? etiquetaBadge[producto.etiqueta] : null

  const onAgregar = () => {
    if (agotado) return
    const enCarrito = items.find((i) => i.productoId === producto.id)
    if (enCarrito) {
      cambiarCantidad(producto.id, enCarrito.cantidad + cantidad)
    } else {
      agregar(producto.id)
      if (cantidad > 1) cambiarCantidad(producto.id, cantidad)
    }
    abrir()
  }

  return (
    <div>
      <section className="py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-600 hover:text-oliva mb-8"
          >
            <ArrowLeft size={14} />
            Volver a tienda
          </Link>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Foto */}
            <div className="relative rounded-2xl overflow-hidden bg-crema aspect-square">
              {badge && (
                <span className={'absolute top-4 left-4 z-10 px-3 py-1 text-[11px] uppercase tracking-wide rounded ' + badge.clase}>
                  {badge.texto}
                </span>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {producto.categoria}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl text-brand leading-[1.05] tracking-tight">
                {producto.nombre}
              </h1>
              <div className="mt-4 font-serif text-2xl text-oliva">{producto.precio} MXN</div>

              <p className="mt-6 text-[15px] text-stone-700 leading-relaxed">
                {producto.descripcion}
              </p>

              {agotado ? (
                <div className="mt-8">
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full px-7 py-3.5 text-[14px] font-medium bg-stone-200 text-stone-400 cursor-not-allowed"
                  >
                    Agotado
                  </button>
                  <p className="mt-3 text-[13px] text-stone-500">
                    Este producto está agotado por ahora. Escríbenos si quieres que te avisemos.
                  </p>
                </div>
              ) : (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {/* Selector de cantidad */}
                  <div className="inline-flex items-center rounded-full border border-stone-300">
                    <button
                      onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                      disabled={cantidad <= 1}
                      className="w-11 h-11 flex items-center justify-center text-brand disabled:opacity-30 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva"
                      aria-label="Reducir cantidad"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center text-[15px] tabular-nums" aria-live="polite">{cantidad}</span>
                    <button
                      onClick={() => setCantidad((c) => c + 1)}
                      className="w-11 h-11 flex items-center justify-center text-brand rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <button
                    onClick={onAgregar}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full px-7 py-3.5 text-[14px] font-medium bg-oliva text-crema-clara hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors"
                  >
                    <ShoppingBag size={16} />
                    Agregar al carrito
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
