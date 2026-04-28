import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

/**
 * Componente Lightbox reutilizable.
 * 
 * Uso simple (una imagen):
 *   <Lightbox src="/foto.jpg" alt="Descripción">
 *     <img src="/foto.jpg" className="w-full h-full object-cover" />
 *   </Lightbox>
 * 
 * Uso con galería (varias imágenes):
 *   <Lightbox sources={['/foto1.jpg', '/foto2.jpg']} startIndex={0}>
 *     <img src="/foto1.jpg" className="..." />
 *   </Lightbox>
 */
export default function Lightbox({ src, sources, startIndex = 0, alt = '', children, className = '' }) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(startIndex)

  // Lista normalizada: si nos pasaron 'src' la convertimos en array de 1
  const imgs = sources && sources.length > 0 ? sources : (src ? [src] : [])
  const tieneMultiples = imgs.length > 1

  const abrir = () => {
    setIdx(startIndex)
    setOpen(true)
  }

  const cerrar = () => setOpen(false)
  const siguiente = () => setIdx((i) => (i + 1) % imgs.length)
  const anterior = () => setIdx((i) => (i - 1 + imgs.length) % imgs.length)

  // Teclado: Esc cerrar, flechas navegar
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowRight') siguiente()
      if (e.key === 'ArrowLeft') anterior()
    }
    window.addEventListener('keydown', onKey)
    // Bloquear scroll del body mientras está abierto
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (imgs.length === 0) return <>{children}</>

  return (
    <>
      {/* Wrapper alrededor del contenido, con icono de zoom al hover */}
      <button
        type="button"
        onClick={abrir}
        className={'group relative cursor-zoom-in block w-full h-full ' + className}
        aria-label="Ampliar imagen"
      >
        {children}
        {/* Indicador de zoom al hover */}
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 text-[#2E3720] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={16} strokeWidth={2} />
        </span>
      </button>

      {/* Overlay del lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={cerrar}
        >
          {/* Botón cerrar */}
          <button
            onClick={cerrar}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {/* Imagen activa */}
          <img
            src={imgs[idx]}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navegación si hay varias */}
          {tieneMultiples && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); anterior() }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); siguiente() }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 text-white text-[13px] px-4 py-1.5 rounded-full backdrop-blur-sm">
                {idx + 1} / {imgs.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}