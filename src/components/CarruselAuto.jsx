import { useState, useEffect } from 'react'

/**
 * Carrusel automático con fade entre imágenes.
 *
 * Uso:
 *   <CarruselAuto images={['/foto1.jpg', '/foto2.jpg', '/foto3.jpg']} alt="..." />
 *
 * Props opcionales:
 *   - intervalMs: tiempo entre fotos (por defecto 3500 = 3.5 segundos)
 *   - showDots: muestra puntitos abajo (por defecto true)
 *   - className: clases extra para el contenedor
 */
export default function CarruselAuto({
  images = [],
  alt = '',
  intervalMs = 3500,
  showDots = true,
  className = '',
}) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [paused, images.length, intervalMs])

  if (images.length === 0) return null

  return (
    <div
      className={'relative w-full h-full overflow-hidden ' + className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={alt}
          className={
            'absolute inset-0 w-full h-full object-contain bg-[#F5EFDF] transition-opacity duration-700 ease-in-out ' +
            (i === idx ? 'opacity-100' : 'opacity-0')
          }
        />
      ))}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIdx(i)
              }}
              className={
                'h-1.5 rounded-full transition-all ' +
                (i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90')
              }
              aria-label={'Foto ' + (i + 1)}
            />
          ))}
        </div>
      )}
    </div>
  )
}