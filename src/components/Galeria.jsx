import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Galería con foto principal grande, flechas de navegación,
 * miniaturas debajo y lightbox a pantalla completa al hacer clic.
 *
 * Uso:
 *   <Galeria images={['/foto1.jpg', '/foto2.jpg']} alt="Descripción" />
 *
 * Props opcionales:
 *   - aspectRatio: 'aspect-[16/9]' (por defecto), 'aspect-[4/5]', etc.
 *   - showThumbnails: si mostrar miniaturas (true por defecto)
 *   - bgColor: clase de fondo cuando la imagen no llena el espacio
 */
export default function Galeria({
  images = [],
  alt = '',
  aspectRatio = 'aspect-[16/10] md:aspect-[16/9]',
  showThumbnails = true,
  bgColor = 'bg-[#3F4A2A]/10',
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const next = () => setActiveIdx((i) => (i + 1) % images.length)
  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length)

  // Teclado para el lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, activeIdx, images.length])

  if (images.length === 0) return null

  return (
    <>
      <div className="relative">
        {/* Imagen principal */}
        <div
          className={`${aspectRatio} rounded-2xl overflow-hidden ${bgColor} relative flex items-center justify-center cursor-zoom-in group`}
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={images[activeIdx]}
            alt={alt + ' foto ' + (activeIdx + 1)}
            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* Flechas */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#2E3720] flex items-center justify-center shadow-md"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#2E3720] flex items-center justify-center shadow-md"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/55 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
              {activeIdx + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {showThumbnails && images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={
                'shrink-0 w-16 h-14 md:w-20 md:h-16 rounded-lg overflow-hidden transition-all ' +
                (i === activeIdx
                  ? 'ring-2 ring-[#3F4A2A] ring-offset-2 ring-offset-[#FAF6EC]'
                  : 'opacity-60 hover:opacity-100')
              }
              aria-label={'Ver foto ' + (i + 1)}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
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
            src={images[activeIdx]}
            alt=""
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 text-white text-[13px] px-4 py-1.5 rounded-full backdrop-blur-sm">
                {activeIdx + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}