import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'
import { getProducto } from '../data/productos'
import BotonCheckout from './BotonCheckout'

export default function CarritoDrawer() {
  const { items, abierto, cerrar, quitar, cambiarCantidad } = useCarrito()

  // Cerrar con Escape mientras el drawer está abierto.
  useEffect(() => {
    if (!abierto) return
    const onKey = (e) => {
      if (e.key === 'Escape') cerrar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierto, cerrar])

  // Bloquear el scroll del fondo mientras el drawer está abierto.
  useEffect(() => {
    if (!abierto) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previo
    }
  }, [abierto])

  // Une cada item del carrito con su producto. Descarta los que ya no existan.
  const lineas = items
    .map((i) => ({ producto: getProducto(i.productoId), cantidad: i.cantidad }))
    .filter((l) => l.producto)

  const total = lineas.reduce((acc, l) => acc + l.producto.precio * l.cantidad, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        className={
          'fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ' +
          (abierto ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={cerrar}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de la compra"
        className={
          'fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-crema-clara shadow-2xl flex flex-col transition-transform duration-300 ' +
          (abierto ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2 font-serif text-lg text-brand">
            <ShoppingBag size={18} />
            Tu carrito
          </div>
          <button
            onClick={cerrar}
            className="w-11 h-11 -mr-2 flex items-center justify-center rounded-md text-brand hover:bg-oliva/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {lineas.length === 0 ? (
          /* Estado vacío */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-14 h-14 rounded-full bg-oliva/10 text-oliva flex items-center justify-center">
              <ShoppingBag size={24} strokeWidth={1.5} />
            </div>
            <p className="text-[14px] text-stone-600">Tu carrito está vacío.</p>
            <Link
              to="/tienda"
              onClick={cerrar}
              className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-oliva text-crema-clara px-6 py-3 text-[14px] font-medium hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {lineas.map(({ producto, cantidad }) => (
                <div key={producto.id} className="flex gap-3">
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-crema">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={'/tienda/' + producto.id}
                        onClick={cerrar}
                        className="text-[13.5px] font-medium text-brand hover:text-oliva leading-snug"
                      >
                        {producto.nombre}
                      </Link>
                      <button
                        onClick={() => quitar(producto.id)}
                        className="shrink-0 w-8 h-8 -mt-1 -mr-1 flex items-center justify-center rounded-md text-stone-400 hover:text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva transition-colors"
                        aria-label={'Eliminar ' + producto.nombre}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-stone-300">
                        <button
                          onClick={() => cambiarCantidad(producto.id, cantidad - 1)}
                          disabled={cantidad <= 1}
                          className="w-9 h-9 flex items-center justify-center text-brand disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva rounded-full"
                          aria-label={'Reducir cantidad de ' + producto.nombre}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-[13px] tabular-nums">{cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(producto.id, cantidad + 1)}
                          className="w-9 h-9 flex items-center justify-center text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva rounded-full"
                          aria-label={'Aumentar cantidad de ' + producto.nombre}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="font-serif text-[14px] text-oliva whitespace-nowrap">
                        {producto.precio * cantidad} MXN
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie: total + checkout */}
            <div className="border-t border-stone-200 px-5 py-4 space-y-4">
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-stone-600">Total</span>
                <span className="font-serif text-xl text-brand">{total} MXN</span>
              </div>
              <BotonCheckout items={lineas} />
              <p className="text-[11.5px] text-stone-500 text-center leading-relaxed">
                El pedido se envía por WhatsApp. Confirmamos disponibilidad y envío por ese medio.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
