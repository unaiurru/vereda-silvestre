import { motion } from 'framer-motion'
import Lightbox from './Lightbox'

// =====================================================================
// InteractiveBentoGallery — galería bento de Vereda Silvestre.
//
// Cada celda abre el componente Lightbox que ya existe en el proyecto
// (vista a pantalla, navegación con flechas y teclado, contador). Así
// reutilizamos un patrón probado en lugar de un modal propio.
//
// Decisión: se retiró el "arrastrar para reordenar" del demo original.
// En táctil competía con el scroll de la página y, en escritorio,
// interceptaba el clic e impedía abrir la foto. Las celdas ahora son
// simplemente seleccionables; el grid mantiene las animaciones de
// entrada y el zoom al pasar el ratón.
//
// Props:
//   - mediaItems: [{ id, type, title, desc, url, span }]
//   - title:       string  (título de la sección)
//   - description: string  (epígrafe en versalitas)
// =====================================================================

export default function InteractiveBentoGallery({ mediaItems = [], title, description }) {
  const sources = mediaItems.map((item) => item.url)

  return (
    <div className="w-full">
      {/* Encabezado: epígrafe en versalitas + título serif de marca */}
      {(description || title) && (
        <div className="text-center max-w-2xl mx-auto mb-10">
          {description && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
              {description}
            </div>
          )}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl md:text-4xl text-[#2E3720] leading-[1.1]"
            >
              {title}
            </motion.h2>
          )}
        </div>
      )}

      {/* Grid bento */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                   auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px]
                   gap-3 md:gap-4 [grid-auto-flow:dense]"
      >
        {mediaItems.map((item, i) => {
          const alt = item.title
            ? `${item.title}${item.desc ? ' — ' + item.desc : ''}`
            : ''
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl
                          bg-stone-100 ring-1 ring-[#3F4A2A]/10 ${item.span || ''}`}
            >
              {/* Reutiliza el Lightbox del proyecto: clic = ver en grande,
                  con navegación entre todas las fotos de la galería. */}
              <Lightbox sources={sources} startIndex={i} alt={alt} className="h-full">
                <img
                  src={item.url}
                  alt={alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-500 group-hover:scale-105"
                />
                {/* Capa de texto al pasar el ratón */}
                <div
                  className="pointer-events-none absolute inset-0 flex flex-col justify-end
                             bg-gradient-to-t from-[#2E3720]/70 via-[#2E3720]/0 to-transparent
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             p-3"
                >
                  <div className="text-[#FAF6EC] font-serif text-sm leading-tight">
                    {item.title}
                  </div>
                </div>
              </Lightbox>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
