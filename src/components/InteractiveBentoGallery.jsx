import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// =====================================================================
// InteractiveBentoGallery — galería bento interactiva de Vereda Silvestre.
//
// Portada del componente original (TSX / Next.js / shadcn) a JSX plano:
//   - sin "use client", sin interfaces ni anotaciones de TypeScript.
//   - import de react / framer-motion / lucide-react.
//   - reestilizada a la identidad de marca (verdes, cremas, dorado, serif).
//
// Props:
//   - mediaItems: [{ id, type, title, desc, url, span }]
//   - title:       string  (título de la sección)
//   - description: string  (subtítulo / epígrafe)
//
// Cada celda abre un modal de detalle al tocarla. El modal trae un dock
// arrastrable de miniaturas para navegar entre fotos.
// =====================================================================

// ---------------------------------------------------------------------
// MediaItem: renderiza <video> si type === "video", si no <img>.
// La rama de vídeo se conserva (IntersectionObserver + spinner de buffer)
// por si en el futuro se añaden .mp4, aunque hoy todos los items son
// imágenes. No rompas el loading="lazy" de las imágenes.
// ---------------------------------------------------------------------
function MediaItem({ item, className, onClick }) {
  const videoRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)

  useEffect(() => {
    if (item.type !== 'video') return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5, rootMargin: '50px' }
    )
    const node = videoRef.current
    if (node) observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
    }
  }, [item.type])

  useEffect(() => {
    let mounted = true
    const node = videoRef.current
    if (item.type !== 'video' || !node) return

    const playVideo = async () => {
      try {
        if (node.readyState >= 3) {
          setIsBuffering(false)
          await node.play()
        } else {
          node.addEventListener(
            'canplay',
            async () => {
              if (!mounted) return
              setIsBuffering(false)
              await node.play().catch(() => {})
            },
            { once: true }
          )
        }
      } catch {
        /* autoplay bloqueado: lo ignoramos en silencio */
      }
    }

    if (isInView) playVideo()
    else node.pause()

    return () => {
      mounted = false
      node.pause()
    }
  }, [isInView, item.type])

  if (item.type === 'video') {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{ opacity: isBuffering ? 0.8 : 1, transition: 'opacity 0.2s' }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2E3720]/20">
            <div className="w-6 h-6 border-2 border-[#FAF6EC]/70 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    )
  }

  return (
    <img
      src={item.url}
      alt={item.title ? `${item.title} — ${item.desc || ''}`.trim() : ''}
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
    />
  )
}

// ---------------------------------------------------------------------
// GalleryModal: vista de detalle a pantalla con un dock arrastrable de
// miniaturas. El dock se arrastra en horizontal (dragConstraints) sin
// interferir con el scroll vertical de la página.
// ---------------------------------------------------------------------
function GalleryModal({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) {
  const dockRef = useRef(null)

  if (!isOpen || !selectedItem) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6
                   bg-[#2E3720]/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="relative w-full max-w-3xl bg-[#FAF6EC] rounded-2xl overflow-hidden
                     shadow-xl ring-1 ring-[#3F4A2A]/15"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full
                       bg-[#2E3720]/55 text-[#FAF6EC] flex items-center justify-center
                       hover:bg-[#2E3720]/75 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Imagen / vídeo principal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full aspect-[4/3] sm:aspect-[16/10] bg-stone-200"
            >
              <MediaItem item={selectedItem} className="w-full h-full" />
            </motion.div>
          </AnimatePresence>

          {/* Texto */}
          <div className="px-5 sm:px-7 pt-4 pb-3">
            <h3 className="font-serif text-xl sm:text-2xl text-[#2E3720] leading-tight">
              {selectedItem.title}
            </h3>
            {selectedItem.desc && (
              <p className="mt-1.5 text-[14px] text-stone-600 leading-relaxed">
                {selectedItem.desc}
              </p>
            )}
          </div>

          {/* Dock arrastrable de miniaturas */}
          <div className="px-3 sm:px-5 pb-5">
            <motion.div
              ref={dockRef}
              className="overflow-hidden rounded-xl border border-[#3F4A2A]/20
                         bg-[#FAF6EC]/70 backdrop-blur-sm p-2"
            >
              <motion.div
                drag="x"
                dragConstraints={dockRef}
                dragElastic={0.08}
                className="flex gap-2 cursor-grab active:cursor-grabbing"
              >
                {mediaItems.map((item) => {
                  const active = item.id === selectedItem.id
                  return (
                    <motion.button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg
                                  overflow-hidden transition-all duration-200
                                  ${
                                    active
                                      ? 'ring-2 ring-[#E0A458] ring-offset-2 ring-offset-[#FAF6EC]'
                                      : 'opacity-65 hover:opacity-100'
                                  }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="lazy"
                        draggable={false}
                      />
                    </motion.button>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function InteractiveBentoGallery({ mediaItems, title, description }) {
  const [items, setItems] = useState(mediaItems)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mantén el orden sincronizado si cambian las props.
  useEffect(() => {
    setItems(mediaItems)
  }, [mediaItems])

  // DECISIÓN DE INTERACCIÓN (ver <comportamiento> del prompt):
  // El arrastre-para-reordenar es agradable con ratón, pero en táctil compite
  // con el scroll vertical de la página y puede atascarlo. Por eso solo
  // activamos el drag de reordenamiento en dispositivos con puntero fino
  // (ratón/trackpad). En móvil las celdas son simplemente pulsables —el scroll
  // de la página nunca se ve interrumpido—. El dock del modal sí se arrastra
  // siempre, pero solo en horizontal, así que no afecta al scroll.
  const [canReorder, setCanReorder] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setCanReorder(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const openItem = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

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
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                   auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px]
                   gap-3 md:gap-4 [grid-auto-flow:dense]"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            layoutId={`bento-${item.id}`}
            drag={canReorder}
            dragSnapToOrigin
            dragElastic={0.12}
            whileDrag={{ scale: 1.04, zIndex: 30 }}
            onDragEnd={(e, info) => {
              if (!canReorder) return
              const moved = Math.abs(info.offset.x) + Math.abs(info.offset.y)
              // Si apenas se movió, lo tratamos como clic y abrimos la foto.
              if (moved < 8) openItem(item)
            }}
            onClick={() => {
              // En táctil (sin reorder) el clic abre directamente.
              if (!canReorder) openItem(item)
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: canReorder ? 1.0 : 1.0 }}
            className={`group relative overflow-hidden rounded-xl md:rounded-2xl
                        bg-stone-100 ring-1 ring-[#3F4A2A]/10
                        ${canReorder ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                        ${item.span || ''}`}
          >
            <MediaItem
              item={item}
              className="absolute inset-0 w-full h-full
                         transition-transform duration-500 group-hover:scale-105"
              onClick={() => {
                if (!canReorder) openItem(item)
              }}
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
          </motion.div>
        ))}
      </motion.div>

      <GalleryModal
        selectedItem={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setSelectedItem={setSelectedItem}
        mediaItems={items}
      />
    </div>
  )
}
