import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Check, Plus, SlidersHorizontal } from 'lucide-react'
import { productos, categoriasProductos } from '../data/productos'
import { useCarrito } from '../context/CarritoContext'
import useSeo from '../hooks/useSeo'
import { FlipReveal, FlipRevealItem } from '../components/FlipReveal'

const CATEGORIAS = ['Todas', ...categoriasProductos()]

const ORDENES = [
  { id: 'recomendados', label: 'Recomendados' },
  { id: 'precio-asc', label: 'Precio: menor a mayor' },
  { id: 'precio-desc', label: 'Precio: mayor a menor' },
]

const etiquetaBadge = {
  'mas-vendido': { texto: 'Más vendido', clase: 'bg-oliva text-crema-clara' },
  nuevo: { texto: 'Nuevo', clase: 'bg-amber-700 text-crema-clara' },
}

export default function Tienda() {
  useSeo({
    title: 'Tienda',
    description:
      'Tienda de Vereda Silvestre: correas, collares, transporte y material de adiestramiento. Pedido por WhatsApp.',
    path: '/tienda',
  })

  const { agregar } = useCarrito()

  const [categoria, setCategoria] = useState('Todas')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [orden, setOrden] = useState('recomendados')
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const [agregadoId, setAgregadoId] = useState(null)

  const onAgregar = (id) => {
    agregar(id)
    setAgregadoId(id)
    setTimeout(() => setAgregadoId((actual) => (actual === id ? null : actual)), 1200)
  }

  // La categoría la resuelve FlipReveal (muestra/oculta con animación), así que
  // aquí sólo filtramos por precio y aplicamos el orden. Todos los productos que
  // pasan el precio se renderizan; los que no son de la categoría activa se
  // ocultan animadamente.
  const renderizados = useMemo(() => {
    const minN = min === '' ? -Infinity : Number(min)
    const maxN = max === '' ? Infinity : Number(max)
    const filtrados = productos.filter((p) => p.precio >= minN && p.precio <= maxN)
    if (orden === 'precio-asc') return [...filtrados].sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') return [...filtrados].sort((a, b) => b.precio - a.precio)
    return filtrados
  }, [min, max, orden])

  // Clave(s) para FlipReveal: "all" muestra todo; si no, sólo la categoría activa.
  const flipKeys = useMemo(
    () => [categoria === 'Todas' ? 'all' : categoria],
    [categoria],
  )

  // ¿Queda algún producto visible con los filtros actuales? (para el mensaje vacío)
  const hayVisibles = renderizados.some(
    (p) => categoria === 'Todas' || p.categoria === categoria,
  )

  const Filtros = (
    <div className="space-y-8">
      {/* Categoría */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-stone-600 mb-3">Categoría</div>
        <div className="space-y-1">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={
                'block w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva ' +
                (categoria === c
                  ? 'bg-oliva text-crema-clara'
                  : 'text-stone-700 hover:bg-oliva/5')
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Rango de precio */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-stone-600 mb-3">Precio (MXN)</div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="precio-min">Precio mínimo</label>
          <input
            id="precio-min"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Mín"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:border-oliva"
          />
          <span className="text-stone-400">–</span>
          <label className="sr-only" htmlFor="precio-max">Precio máximo</label>
          <input
            id="precio-max"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Máx"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:border-oliva"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">Tienda</div>
          <h1 className="font-serif text-5xl md:text-6xl text-brand leading-[1.05] tracking-tight">
            Tienda
          </h1>
          <p className="mt-5 text-stone-600 max-w-xl text-[15px] leading-relaxed">
            Material seleccionado para el día a día con tu perro. Haz tu pedido por WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
            {/* Filtros: sidebar en desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">{Filtros}</div>
            </aside>

            {/* Columna principal */}
            <div>
              {/* Barra superior: toggle filtros (mobile) + orden */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <button
                  onClick={() => setFiltrosAbiertos((v) => !v)}
                  className="lg:hidden inline-flex items-center gap-2 min-h-[44px] rounded-full border border-stone-300 px-4 py-2 text-[13px] text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva"
                  aria-expanded={filtrosAbiertos}
                >
                  <SlidersHorizontal size={15} />
                  Filtros
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <label htmlFor="orden" className="text-[13px] text-stone-600 whitespace-nowrap">Ordenar</label>
                  <select
                    id="orden"
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-[13px] text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva"
                  >
                    {ORDENES.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtros colapsables en mobile */}
              {filtrosAbiertos && (
                <div className="lg:hidden mb-8 p-5 rounded-2xl border border-stone-200 bg-white">
                  {Filtros}
                </div>
              )}

              {/* Grid de productos. FlipReveal anima el filtrado por categoría.
                  Se renderizan todos los productos que pasan el precio; la
                  categoría activa decide cuáles se muestran (showClass="flex")
                  u ocultan (hideClass="hidden"). `deps` reanima al cambiar el
                  orden o el rango de precio. */}
              {!hayVisibles && (
                <div className="py-20 text-center text-stone-500 text-[14px]">
                  No hay productos que coincidan con los filtros.
                </div>
              )}
              <FlipReveal
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 content-start"
                keys={flipKeys}
                deps={[orden, min, max]}
                showClass="flex"
                hideClass="hidden"
              >
                  {renderizados.map((p) => {
                    const badge = p.etiqueta ? etiquetaBadge[p.etiqueta] : null
                    const agotado = p.stock === false
                    const recienAgregado = agregadoId === p.id
                    return (
                      <FlipRevealItem
                        key={p.id}
                        flipKey={p.categoria}
                        className="flex-col"
                      >
                      <article
                        className="group relative w-full rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-oliva/40 transition-colors flex flex-col flex-1"
                      >
                        {badge && (
                          <span className={'absolute top-3 left-3 z-10 px-3 py-1 text-[10px] uppercase tracking-wide rounded ' + badge.clase}>
                            {badge.texto}
                          </span>
                        )}
                        {agotado && (
                          <span className="absolute top-3 right-3 z-10 px-3 py-1 text-[10px] uppercase tracking-wide rounded bg-stone-700 text-crema-clara">
                            Agotado
                          </span>
                        )}

                        <div className="aspect-square overflow-hidden bg-crema">
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-stone-500 mb-1">
                            {p.categoria}
                          </div>
                          <h3 className="text-[14px] font-medium text-brand leading-snug mb-2">
                            {p.nombre}
                          </h3>
                          <div className="font-serif text-[16px] text-oliva mb-4">{p.precio} MXN</div>

                          <button
                            onClick={() => onAgregar(p.id)}
                            disabled={agotado}
                            className={
                              'relative z-10 mt-auto inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 ' +
                              (agotado
                                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                : recienAgregado
                                  ? 'bg-brand text-crema-clara'
                                  : 'bg-oliva text-crema-clara hover:bg-brand')
                            }
                            aria-label={'Agregar ' + p.nombre + ' al carrito'}
                          >
                            {agotado ? (
                              'Agotado'
                            ) : recienAgregado ? (
                              <>
                                <Check size={15} />
                                Agregado
                              </>
                            ) : (
                              <>
                                <Plus size={15} />
                                Agregar
                              </>
                            )}
                          </button>
                        </div>

                        {/* Enlace que cubre la card hacia el detalle (sin tapar el botón). */}
                        <Link
                          to={'/tienda/' + p.id}
                          className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2"
                          aria-label={'Ver ' + p.nombre}
                        >
                          <span className="sr-only">Ver {p.nombre}</span>
                        </Link>
                      </article>
                      </FlipRevealItem>
                    )
                  })}
              </FlipReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
