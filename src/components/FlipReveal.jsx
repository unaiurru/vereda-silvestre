// FlipReveal — filtra/revela elementos con una animación GSAP Flip.
//
// Adaptado al stack de este repo (React + Vite + JavaScript, sin shadcn/TS).
// El componente original venía en TypeScript usando `@/components/ui/...`; aquí
// se reescribe en .jsx y se mejora el selector para acotarlo al contenedor
// (el original seleccionaba TODOS los [data-flip] del documento) y respeta
// `prefers-reduced-motion`.
//
// Uso:
//   <FlipReveal keys={[categoriaActiva]} showClass="flex" hideClass="hidden">
//     <FlipRevealItem flipKey="Correas">...</FlipRevealItem>
//     ...
//   </FlipReveal>
//
// `keys` decide qué elementos se muestran: un item se muestra si su `flipKey`
// está en `keys`, o si `keys` incluye "all".
//
// `deps` (opcional) son dependencias extra: cuando cambian, se reaplican las
// clases de visibilidad y se reanima. Útil si la lista de hijos cambia por
// otros motivos (orden, filtro de precio) además de `keys`.

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Flip from 'gsap/Flip'

gsap.registerPlugin(useGSAP, Flip)

export function FlipRevealItem({ flipKey, ...props }) {
  return <div data-flip={flipKey} {...props} />
}

export function FlipReveal({ keys, hideClass = '', showClass = '', deps = [], ...props }) {
  const wrapperRef = useRef(null)

  const isShow = (key) => !!key && (keys.includes('all') || keys.includes(key))

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // Acotado al contenedor: no toca [data-flip] de otras partes de la página.
      const items = gsap.utils.toArray(wrapper.querySelectorAll('[data-flip]'))

      const aplicarClases = () => {
        items.forEach((item) => {
          const key = item.getAttribute('data-flip')
          if (isShow(key)) {
            if (showClass) item.classList.add(showClass)
            if (hideClass) item.classList.remove(hideClass)
          } else {
            if (showClass) item.classList.remove(showClass)
            if (hideClass) item.classList.add(hideClass)
          }
        })
      }

      // Accesibilidad: si el usuario prefiere menos movimiento, sólo conmutamos
      // la visibilidad sin animar.
      const prefiereMenosMovimiento =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefiereMenosMovimiento) {
        aplicarClases()
        return
      }

      const state = Flip.getState(items)
      aplicarClases()

      Flip.from(state, {
        duration: 0.6,
        scale: true,
        ease: 'power1.inOut',
        stagger: 0.05,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.8 },
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 0.8 }),
      })
    },
    // Se desestructuran `keys` (primitivos) para comparar por valor y evitar
    // que un nuevo array en cada render dispare el efecto innecesariamente.
    { scope: wrapperRef, dependencies: [...keys, ...deps] },
  )

  return <div {...props} ref={wrapperRef} />
}

export default FlipReveal
