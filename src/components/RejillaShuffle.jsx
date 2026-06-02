// RejillaShuffle — rejilla de fotos que se baraja sola con una animación suave.
//
// Adaptado al stack de este repo (React + Vite + JavaScript, sin shadcn/TS).
// El patrón "shuffle grid" original usaba la prop `layout` de framer-motion;
// aquí el equivalente es GSAP Flip, reutilizando el mismo enfoque que
// `FlipReveal.jsx`: registro de plugin, `useGSAP`, captura de estado con
// `Flip.getState` y reanimación con `Flip.from`, respetando
// `prefers-reduced-motion`.
//
// Cada ~3s se baraja el orden del array y Flip anima cada celda desde su
// posición vieja a la nueva. Cada celda es seleccionable: al hacer clic se
// abre la foto en grande con el componente Lightbox (navegable entre las 16).
// El barajado se pausa mientras el usuario tiene el ratón encima o el foco
// dentro, para poder hacer clic con comodidad.

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
import Lightbox from './Lightbox'

gsap.registerPlugin(useGSAP, Flip)

// 16 fotos de perros en el campo, todas existentes en /public.
const FOTOS = [
  '/dos-perros-campo.jpg',
  '/dos-perritos-corriendo-prado-humedo.jpg',
  '/dos-pastores-australianos-prado-flores.jpg',
  '/husky-canela-arnes-prado-verde.jpg',
  '/border-collie-mestizo-corriendo-prado.jpg',
  '/cattle-dog-collar-rojo-prado.jpg',
  '/perro-canela-corriendo-hierba-alta.jpg',
  '/perro-canela-atardecer-pinos.jpg',
  '/pastor-tricolor-sentado-cerca-amanecer.jpg',
  '/labrador-canela-descansando-muro-piedra.jpg',
  '/cocker-spaniel-arnes-turquesa-hierba.jpg',
  '/dos-perros-corriendo-charco-nopal.jpg',
  '/pointer-moteado-hierba-alta.jpg',
  '/retriever-negro-corriendo-correa-azul.jpg',
  '/perro-canela-mirando-laguna-luna.jpg',
  '/dos-perros-negros-paseando-sendero-1.jpg',
]

const INTERVALO_MS = 3000

function prefiereMenosMovimiento() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Fisher-Yates: devuelve una nueva permutación del array.
function barajar(arr) {
  const copia = arr.slice()
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

export default function RejillaShuffle() {
  const rejillaRef = useRef(null)
  // Estado captado por Flip justo ANTES de reordenar (las posiciones viejas).
  const estadoPrevio = useRef(null)
  // El orden es una permutación de índices sobre FOTOS; la clave de React es
  // el índice de la foto, así el mismo nodo del DOM se reubica y Flip lo anima.
  const [orden, setOrden] = useState(() => FOTOS.map((_, i) => i))
  // Pausas: ratón encima o foco dentro de la rejilla.
  const [hover, setHover] = useState(false)
  const [foco, setFoco] = useState(false)
  const pausado = hover || foco

  // Anima el cambio de orden recién aplicado (sólo si hubo barajado previo).
  useGSAP(
    () => {
      if (prefiereMenosMovimiento()) return
      if (estadoPrevio.current) {
        Flip.from(estadoPrevio.current, {
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0.03,
          // Sin `absolute`: el número de celdas es constante, así que la
          // rejilla conserva su altura y basta con animar las posiciones.
        })
        estadoPrevio.current = null
      }
    },
    { scope: rejillaRef, dependencies: [orden] },
  )

  // Programa el siguiente barajado. Se reinicia si cambia el orden o la pausa.
  useEffect(() => {
    // Accesibilidad: sin movimiento → rejilla estática, sin barajado.
    if (prefiereMenosMovimiento() || pausado) return

    const id = window.setTimeout(() => {
      const rejilla = rejillaRef.current
      if (!rejilla) return
      // Capturamos las posiciones actuales (sólo las celdas visibles en este
      // breakpoint) antes del setState, para que Flip anime el cambio.
      const visibles = gsap.utils
        .toArray(rejilla.querySelectorAll('[data-celda]'))
        .filter((el) => el.offsetParent !== null)
      estadoPrevio.current = Flip.getState(visibles)
      setOrden((prev) => barajar(prev))
    }, INTERVALO_MS)

    return () => window.clearTimeout(id)
  }, [orden, pausado])

  // El foco sale de la rejilla sólo si va a un elemento fuera del contenedor.
  const onBlur = (e) => {
    if (!rejillaRef.current?.contains(e.relatedTarget)) setFoco(false)
  }

  return (
    <div
      ref={rejillaRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFoco(true)}
      onBlur={onBlur}
      className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-2.5 bg-[#F5EFDF] p-2 md:p-2.5"
    >
      {orden.map((fotoIdx, pos) => (
        <div
          key={fotoIdx}
          data-celda
          // En móvil mostramos 9 celdas (3×3); en md+ las 16 (4×4).
          className={`aspect-square overflow-hidden rounded-md bg-stone-200 ${
            pos >= 9 ? 'hidden md:block' : ''
          }`}
        >
          <Lightbox
            sources={FOTOS}
            startIndex={fotoIdx}
            alt="Perro disfrutando del entorno natural de Vereda Silvestre"
          >
            <img
              src={FOTOS[fotoIdx]}
              alt=""
              // Las primeras celdas están sobre el pliegue: carga prioritaria
              // para evitar huecos; el resto en perezosa.
              loading={pos < 6 ? 'eager' : 'lazy'}
              fetchPriority={pos < 6 ? 'high' : 'auto'}
              draggable="false"
              className="w-full h-full object-cover select-none"
            />
          </Lightbox>
        </div>
      ))}
    </div>
  )
}
