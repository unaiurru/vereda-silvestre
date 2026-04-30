import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Check, ImageOff, X, ChevronLeft, ChevronRight, Play, Clock } from 'lucide-react'
import { servicios, whatsappLinkServicio } from '../data/servicios'
import useSeo from '../hooks/useSeo'

export default function ServicioDetalle() {
  const { slug } = useParams()
  const servicio = servicios.find((s) => s.slug === slug)

  useSeo({
    title: servicio ? servicio.titulo : 'Servicio',
    description: servicio ? servicio.resumen : 'Servicio canino en Vereda Silvestre.',
    path: servicio ? `/servicios/${servicio.slug}` : '/servicios',
  })

  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    setActiveIdx(0)
    setLightboxOpen(false)
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') nextItem()
      if (e.key === 'ArrowLeft') prevItem()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, activeIdx])

  if (!servicio) {
    return <Navigate to="/servicios" replace />
  }

  const items = servicio.media || []
  const hayItems = items.length > 0
  const activeItem = hayItems ? items[activeIdx] : null

  const nextItem = () => {
    if (items.length === 0) return
    setActiveIdx((i) => (i + 1) % items.length)
  }
  const prevItem = () => {
    if (items.length === 0) return
    setActiveIdx((i) => (i - 1 + items.length) % items.length)
  }

  const renderItem = (item) => {
    if (!item) return null
    if (item.tipo === 'imagen') {
      return (
        <img
          src={item.src}
          alt={servicio.titulo}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )
    }
    if (item.tipo === 'video') {
      return (
        <video
          src={item.src}
          poster={item.poster || undefined}
          controls
          playsInline
          className="max-w-full max-h-full object-contain"
        />
      )
    }
    return (
      <div className="flex flex-col items-center justify-center text-stone-600 gap-3 p-10">
        <Clock size={36} strokeWidth={1.3} />
        <span className="text-[12px] uppercase tracking-wider">{item.label || 'Próximamente'}</span>
      </div>
    )
  }

  const renderThumb = (item) => {
    if (item.tipo === 'imagen') {
      return <img src={item.src} alt="" className="w-full h-full object-cover" />
    }
    if (item.tipo === 'video') {
      return (
        <div className="relative w-full h-full bg-stone-800">
          {item.poster && <img src={item.poster} alt="" className="w-full h-full object-cover opacity-70" />}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <Play size={20} fill="white" />
          </div>
        </div>
      )
    }
    return (
      <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
        <Clock size={16} />
      </div>
    )
  }

  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-600 hover:text-[#3F4A2A] mb-5"
          >
            <ArrowLeft size={14} />
            Todos los servicios
          </Link>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {servicio.categoria}
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-[#2E3720] leading-[1.05] tracking-tight">
                {servicio.titulo}
              </h1>
            </div>
            <div className="font-serif text-2xl md:text-3xl text-[#3F4A2A]">
              {servicio.precio}
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      {hayItems ? (
        <section className="bg-[#F5EFDF]/50 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
            <div className="relative">
              <div
                className={
                  'aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden bg-[#3F4A2A]/10 relative flex items-center justify-center ' +
                  (activeItem && activeItem.tipo === 'imagen' ? 'cursor-zoom-in group' : '')
                }
                onClick={() => {
                  if (activeItem && activeItem.tipo === 'imagen') setLightboxOpen(true)
                }}
              >
                {renderItem(activeItem)}
              </div>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevItem}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-[#2E3720] flex items-center justify-center shadow-md"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextItem}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-[#2E3720] flex items-center justify-center shadow-md"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/55 text-white text-[12px] px-3 py-1 rounded-full backdrop-blur-sm">
                    {activeIdx + 1} / {items.length}
                  </div>
                </>
              )}
            </div>

            {items.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={
                      'shrink-0 w-24 h-20 md:w-32 md:h-24 rounded-lg overflow-hidden transition-all ' +
                      (i === activeIdx
                        ? 'ring-2 ring-[#3F4A2A] ring-offset-2 ring-offset-[#F5EFDF]'
                        : 'opacity-60 hover:opacity-100')
                    }
                    aria-label={'Ver elemento ' + (i + 1)}
                  >
                    {renderThumb(item)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-[#F5EFDF]/50 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
            <div className="aspect-[16/8] rounded-2xl bg-stone-200 flex flex-col items-center justify-center text-stone-400 gap-3">
              <ImageOff size={36} strokeWidth={1.3} />
              <span className="text-[12px] uppercase tracking-wider">Fotos próximamente</span>
            </div>
          </div>
        </section>
      )}

      {/* Contenido */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-4">
                Sobre el servicio
              </div>
              <div className="space-y-4 text-[15px] md:text-[16px] text-stone-700 leading-relaxed">
                {servicio.descripcion.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={whatsappLinkServicio(servicio.titulo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#3F4A2A] text-[#FAF6EC] px-6 py-3.5 text-[14px] font-medium hover:bg-[#2E3720] transition-colors"
                >
                  <MessageCircle size={16} />
                  Consultar por WhatsApp
                </a>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-[#3F4A2A]/25 text-[#3F4A2A] px-6 py-3.5 text-[14px] font-medium hover:bg-[#3F4A2A]/5 transition-colors"
                >
                  Ver formas de contacto
                </Link>
              </div>
            </div>

            {servicio.incluye && servicio.incluye.length > 0 && (
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-stone-200 bg-white p-7">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-4">
                    Qué incluye
                  </div>
                  <ul className="space-y-3.5">
                    {servicio.incluye.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] text-stone-700">
                        <Check size={15} className="mt-1 shrink-0 text-[#3F4A2A]" strokeWidth={2.4} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="py-14 border-t border-stone-200 bg-white/40" aria-labelledby="otros-servicios-heading">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 id="otros-servicios-heading" className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3 font-normal">
            También te puede interesar
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {servicios
              .filter((s) => s.slug !== servicio.slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={'/servicios/' + s.slug}
                  className="group rounded-xl border border-stone-200 bg-white p-5 hover:border-[#3F4A2A]/40 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-1.5">
                    {s.categoria}
                  </div>
                  <h3 className="font-serif text-lg text-[#2E3720] mb-1">{s.titulo}</h3>
                  <div className="text-[12.5px] text-[#3F4A2A] font-medium">{s.precio}</div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && hayItems && activeItem && activeItem.tipo === 'imagen' && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <img
            src={activeItem.src}
            alt=""
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevItem() }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextItem() }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>
              <div className="abso