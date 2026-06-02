import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ImageOff, MessageCircle, X } from 'lucide-react'
import { servicios, whatsappLinkServicio } from '../data/servicios'
import useSeo from '../hooks/useSeo'

// Orden preferido de las categorías en la barra de filtros. Cualquier
// categoría que no esté aquí se añade al final automáticamente.
const ORDEN_CATEGORIAS = [
  'Pensión',
  'Adiestramiento',
  'Paseo',
  'Excursión',
  'Programa',
  'Sesión',
  'Formación',
]

// "Pensión" -> "pension" (apto para URL, sin acentos ni ñ).
function slugCategoria(nombre) {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const esFinalizado = (s) => s.estado === 'finalizado'

export default function Servicios() {
  useSeo({
    title: 'Servicios',
    description:
      'Programas formativos, sesiones de activación natural, pensión campestre y seminarios para perros y tutores en Jilotepec, Estado de México.',
    path: '/servicios',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const catActiva = searchParams.get('cat') // slug o null = "Todos"
  const dispo = searchParams.get('estado') || 'todos' // 'todos' | 'disponibles' | 'finalizados'

  // Categorías presentes en los datos, ordenadas y con su conteo.
  const categorias = useMemo(() => {
    const conteo = new Map()
    for (const s of servicios) {
      conteo.set(s.categoria, (conteo.get(s.categoria) || 0) + 1)
    }
    const presentes = [...conteo.keys()]
    presentes.sort((a, b) => {
      const ia = ORDEN_CATEGORIAS.indexOf(a)
      const ib = ORDEN_CATEGORIAS.indexOf(b)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
    return presentes.map((nombre) => ({
      nombre,
      slug: slugCategoria(nombre),
      count: conteo.get(nombre),
    }))
  }, [])

  // Lista filtrada: por categoría, por disponibilidad y con activos primero.
  const lista = useMemo(() => {
    return servicios
      .filter((s) => (catActiva ? slugCategoria(s.categoria) === catActiva : true))
      .filter((s) => {
        if (dispo === 'disponibles') return !esFinalizado(s)
        if (dispo === 'finalizados') return esFinalizado(s)
        return true
      })
      // Activos antes que finalizados (orden estable).
      .slice()
      .sort((a, b) => Number(esFinalizado(a)) - Number(esFinalizado(b)))
  }, [catActiva, dispo])

  // Actualiza un parámetro de la URL conservando el resto.
  const setParam = (clave, valor) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        if (valor) p.set(clave, valor)
        else p.delete(clave)
        return p
      },
      { replace: true }
    )
  }

  const resetear = () => setSearchParams({}, { replace: true })

  const hayFiltros = Boolean(catActiva) || dispo !== 'todos'

  const chipBase =
    'shrink-0 inline-flex items-center gap-1.5 min-h-[40px] rounded-full px-4 py-2 text-[13px] font-medium ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2'
  const chipOn = 'bg-oliva text-crema-clara'
  const chipOff = 'bg-white text-stone-700 border border-stone-300 hover:border-oliva/40 hover:bg-oliva/5'

  const estados = [
    { id: 'todos', label: 'Todos' },
    { id: 'disponibles', label: 'Disponibles' },
    { id: 'finalizados', label: 'Finalizados' },
  ]

  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            Nuestros servicios
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-brand leading-[1.05] tracking-tight">
            Cada perro tiene lo que necesita.
          </h1>
          <p className="mt-5 text-stone-600 max-w-xl text-[15px] leading-relaxed">
            Programas, sesiones de activación natural, pensión campestre y formación.
            Filtra por categoría para encontrar lo que buscas, o escríbenos y te ayudamos a decidir.
          </p>
        </div>
      </section>

      {/* Filtros + grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          {/* Filtro por categoría (chips) */}
          <div
            role="group"
            aria-label="Filtrar por categoría"
            className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
          >
            <button
              type="button"
              onClick={() => setParam('cat', null)}
              aria-pressed={!catActiva}
              className={`${chipBase} ${!catActiva ? chipOn : chipOff}`}
            >
              Todos
              <span className={!catActiva ? 'text-crema-clara/70' : 'text-stone-400'}>
                {servicios.length}
              </span>
            </button>
            {categorias.map((c) => {
              const on = catActiva === c.slug
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setParam('cat', c.slug)}
                  aria-pressed={on}
                  className={`${chipBase} ${on ? chipOn : chipOff}`}
                >
                  {c.nombre}
                  <span className={on ? 'text-crema-clara/70' : 'text-stone-400'}>{c.count}</span>
                </button>
              )
            })}
          </div>

          {/* Filtro por disponibilidad */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Disponibilidad
            </span>
            <div role="group" aria-label="Filtrar por disponibilidad" className="flex gap-2">
              {estados.map((e) => {
                const on = dispo === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setParam('estado', e.id === 'todos' ? null : e.id)}
                    aria-pressed={on}
                    className={`${chipBase} !min-h-[36px] !py-1.5 !text-[12.5px] ${on ? chipOn : chipOff}`}
                  >
                    {e.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Resumen de resultados */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-[13px] text-stone-500" aria-live="polite">
              {lista.length === 1
                ? 'Mostrando 1 servicio'
                : `Mostrando ${lista.length} servicios`}
            </p>
            {hayFiltros && (
              <button
                type="button"
                onClick={resetear}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-oliva hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 rounded"
              >
                <X size={14} />
                Quitar filtros
              </button>
            )}
          </div>

          {/* Grid de servicios o estado vacío */}
          {lista.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-crema/40 py-16 px-6 text-center">
              <p className="font-serif text-xl text-brand">
                No hay servicios con estos filtros.
              </p>
              <p className="mt-2 text-[14px] text-stone-600">
                Prueba con otra categoría o quita los filtros.
              </p>
              <button
                type="button"
                onClick={resetear}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-oliva text-crema-clara px-5 py-2.5 text-[13px] font-medium hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors"
              >
                Ver todos los servicios
              </button>
            </div>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lista.map((s) => {
                const finalizado = esFinalizado(s)
                return (
                  <article
                    key={s.slug}
                    className="group relative rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-oliva/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Badge "Finalizado" */}
                    {finalizado && (
                      <span className="absolute top-3 left-3 z-10 bg-stone-700 text-crema-clara px-3 py-1 text-xs uppercase tracking-wide rounded">
                        Finalizado
                      </span>
                    )}

                    <div className="aspect-[4/3] overflow-hidden bg-crema flex items-center justify-center">
                      {s.portada ? (
                        <img
                          src={s.portada}
                          alt={s.titulo}
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-stone-400 flex flex-col items-center gap-2">
                          <ImageOff size={28} strokeWidth={1.4} />
                          <span className="text-[11px] uppercase tracking-wider">Foto próximamente</span>
                        </div>
                      )}
                    </div>

                    <div className="p-7">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">
                        {s.categoria}
                      </div>
                      <h3 className="font-serif text-xl text-brand mb-3">{s.titulo}</h3>
                      <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">
                        {s.resumen}
                      </p>
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-200">
                        <span className="font-serif text-[15px] text-brand">{s.precio}</span>
                        {finalizado ? (
                          <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-oliva">
                            Ver detalles
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        ) : (
                          // CTA "Reservar" hacia WhatsApp. relative+z-10 para quedar por
                          // encima del enlace que cubre toda la card (ver más abajo).
                          <a
                            href={whatsappLinkServicio(s.titulo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 inline-flex items-center gap-1.5 min-h-[44px] rounded-full bg-oliva text-crema-clara px-4 py-2 text-[12.5px] font-medium hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors"
                          >
                            <MessageCircle size={14} />
                            Reservar
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Enlace que cubre toda la card hacia el detalle (stretched link).
                        Va al final para no tapar el botón "Reservar" (z-10). */}
                    <Link
                      to={'/servicios/' + s.slug}
                      className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2"
                      aria-label={'Ver detalles de ' + s.titulo}
                    >
                      <span className="sr-only">Ver detalles de {s.titulo}</span>
                    </Link>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
