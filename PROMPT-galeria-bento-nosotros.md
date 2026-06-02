# Prompt — Integrar galería bento interactiva en la página "Nosotros"

> Pega todo lo que hay debajo de la línea a tu agente de código (Claude Code / Cursor / etc.)
> trabajando dentro del repositorio `vereda-silvestre`. Está escrito para que el agente
> adapte el componente al stack real del proyecto, no para copiarlo tal cual.

---

<task>
En la página "Nosotros" (`src/pages/Nosotros.jsx`), sustituye la sección final de galería
—la que tiene el epígrafe "El día a día" y el título "Algunos momentos de Vereda Silvestre"—
por una galería bento interactiva basada en el componente `InteractiveBentoGallery` que se
incluye al final de este prompt. Amplía además el conjunto de imágenes que se muestran.

El resultado debe verse como parte nativa de Vereda Silvestre: misma paleta, misma tipografía
y mismo nivel de cuidado que el resto de la página, no como un widget genérico pegado encima.
</task>

<contexto_del_proyecto>
Antes de tocar nada, ten presente cómo está montado este repositorio, porque el componente
de origen asume un stack distinto:

- Es un proyecto **Vite + React 19** en **JavaScript / JSX puro**. NO hay TypeScript, NO hay
  Next.js y NO es un proyecto shadcn. Lo confirma `package.json` (sin `typescript`, sin `next`)
  y que todos los archivos de `src/` son `.jsx`.
- Los componentes viven en `src/components/` (p. ej. `Header.jsx`, `Footer.jsx`, `Lightbox.jsx`,
  `Galeria.jsx`). **No existe** la carpeta `src/components/ui/` y no hace falta crearla: ese
  patrón es de shadcn, que aquí no se usa. Coloca el nuevo componente en `src/components/`.
- **Tailwind CSS v3.4** ya está configurado y funcionando (clases utilitarias por toda la app,
  incluidas variantes `dark:`). No necesitas reinstalar ni reconfigurar Tailwind.
- **`lucide-react` ya está instalado** (`^0.460.0`). No lo reinstales.
- **`framer-motion` NO está instalado.** Hay que añadirlo.
- El gestor de paquetes de este proyecto es **pnpm**. Usa siempre `pnpm` para instalar y
  compilar; nunca `npm` ni `yarn`.
- Las imágenes están en `/public` y se referencian con ruta absoluta desde la raíz, p. ej.
  `<img src="/perro-atardecer.jpg" />`. NO importes imágenes desde `src/`.
- Existe ya un componente propio `src/components/Lightbox.jsx` que el resto de la galería usa
  para ampliar fotos. La nueva galería bento trae su propio modal, así que aquí no necesitas
  Lightbox, pero respeta que ese patrón ya existe en la página.
</contexto_del_proyecto>

<por_que_importan_estas_diferencias>
El componente de origen está escrito en TypeScript (`.tsx`), con la directiva `"use client"`
de Next.js y rutas de import estilo shadcn (`@/components/blocks/...`). Si lo copias tal cual,
el proyecto no compilará: Vite + JSX no entiende las anotaciones de tipos ni las `interface`,
`"use client"` no aplica fuera de Next.js, y el alias `@/components/blocks` no está configurado.
Por eso el primer trabajo real es **portar** el componente, no pegarlo.
</por_que_importan_estas_diferencias>

<pasos>
1. **Instala la dependencia que falta** con pnpm:
   ```bash
   pnpm add framer-motion
   ```

2. **Crea `src/components/InteractiveBentoGallery.jsx`** portando el componente del apéndice a
   JSX plano:
   - Elimina la línea `"use client"`.
   - Elimina las `interface` de TypeScript (`MediaItemType`, `GalleryModalProps`,
     `InteractiveBentoGalleryProps`) y todas las anotaciones de tipos (`: string`,
     `<HTMLVideoElement>`, `React.FC<...>`, `(item: MediaItemType | null) => void`, etc.).
     La lógica en tiempo de ejecución debe quedar idéntica; solo desaparecen los tipos.
   - Cambia el export a `export default function InteractiveBentoGallery(...)` o conserva
     `export default InteractiveBentoGallery`, lo que resulte más limpio.
   - Mantén los `import` de `react`, `framer-motion` y `lucide-react`.

3. **Reestiliza el componente a la identidad de Vereda Silvestre** (ver `<estetica>`). El
   componente de origen trae un título con degradado gris→blanco y un dock con cristal azul
   cielo (`bg-sky-400/20`, `border-blue-400/30`) que desentonan con la marca. Ajústalos a la
   paleta del proyecto.

4. **Edita `src/pages/Nosotros.jsx`:**
   - Sustituye el contenido de la sección de galería existente (el bloque comentado
     `{/* GALERIA */}`, aprox. líneas 244–270) por el render de `InteractiveBentoGallery`.
   - Conserva el contenedor `<section>` y el patrón de epígrafe + título que ya usa la página
     ("El día a día" / "Algunos momentos de Vereda Silvestre"), o pásalos como `title` y
     `description` al componente — elige lo que quede más coherente visualmente, pero no pierdas
     ese encabezado.
   - Define el array `mediaItems` con imágenes reales de `/public` (ver `<imagenes>`).
   - Importa el componente: `import InteractiveBentoGallery from '../components/InteractiveBentoGallery'`.

5. **Verifica** (ver `<verificacion>`).
</pasos>

<imagenes>
Usa solo imágenes que existen de verdad en `/public`. Amplía la selección actual (hoy son 6) a
unas 8–10 para que el grid bento luzca. Todas son `type: "image"` — el proyecto no tiene vídeos
`.mp4`, así que omite los items de tipo vídeo del demo original (la lógica de vídeo puede
quedarse en el componente por si se añaden más adelante, pero no la uses en los datos).

Imágenes reales recomendadas (rutas tal cual van en `src`):

- `/perro-atardecer.jpg`
- `/dos-perros-campo.jpg`
- `/adiestradora-tres-perros-campo-flores.jpeg`
- `/dos-pastores-australianos-prado-flores.jpg`
- `/perro-canela-corriendo-hierba-alta.jpg`
- `/adiestradora-dos-cattle-dogs-atardecer.jpeg`
- `/dos-perros-correa.jpg`
- `/border-collie-merle-arnes-tumbado.jpg`
- `/pastor-tricolor-sentado-cerca-amanecer.jpg`
- `/selfie-adiestradora-malinois-campo.jpg`

Si alguna no encaja por proporción, sustitúyela por otra de `/public` (hay muchas más). Pon a
cada item un `title` corto y un `desc` breve **en español**, con el tono cálido y cercano de la
marca (p. ej. title: "Atardeceres en el campo", desc: "Espacio para correr, oler y descansar").
Asigna los valores de `span` para que el mosaico quede equilibrado, mezclando celdas grandes y
pequeñas como en el demo original.
</imagenes>

<estetica>
La página usa esta identidad visual; respétala:

- Verde oscuro de texto/títulos: `#2E3720`
- Verde oliva (fondos sólidos, acentos): `#3F4A2A`
- Cremas de fondo: `#F5EFDF` y `#FAF6EC`
- Dorado/ámbar de acento: `#E0A458`
- Neutros: paleta `stone-*` de Tailwind
- Títulos en `font-serif`; cuerpo en sans por defecto
- Epígrafes en versalitas: `text-[11px] uppercase tracking-[0.22em] text-stone-600`

Aplica esto al componente:
- El título de la galería debe usar `font-serif` y color `#2E3720` (no el degradado gris→blanco
  del demo). Si conservas el `motion.h1` interno, cámbiale el estilo; si pasas el encabezado
  desde `Nosotros.jsx`, usa el mismo patrón serif que el resto de secciones.
- El dock arrastrable de miniaturas: cambia `bg-sky-400/20` y `border-blue-400/30` por tonos de
  la marca (p. ej. crema translúcida `bg-[#FAF6EC]/70` con borde `border-[#3F4A2A]/20`, o el
  verde oliva con baja opacidad). El anillo de selección y el glow deben tirar a cálido, no azul.
- Bordes redondeados generosos (`rounded-xl`/`rounded-2xl`) coherentes con el resto.
- No introduzcas sombras duras ni colores neón; el estilo es natural, terroso y sobrio.
</estetica>

<comportamiento>
- Diseño totalmente responsive: una columna en móvil, mosaico en `sm`/`md` hacia arriba, igual
  que el grid del componente original.
- El modal de detalle debe abrir y cerrar con suavidad y ser usable en móvil (ya trae tamaños
  responsivos; verifícalo).
- El componente original permite **arrastrar para reordenar** las celdas y un **dock
  arrastrable**. En una web pública de una sola visita esto puede confundir y, en táctil, llegar
  a interferir con el scroll de la página. Mantén la interacción de abrir foto al tocar; respecto
  al arrastre-reordenar, consérvalo solo si no rompe el scroll vertical en móvil. Si entra en
  conflicto, prioriza que la página siga desplazándose con normalidad y suaviza o desactiva el
  drag de reordenamiento. Explica brevemente en el código (comentario) la decisión que tomes.
- Imágenes con `loading="lazy"` (ya viene así); no rompas esa optimización.
- `alt` descriptivo en cada imagen (reutiliza el `title`/`desc` en español).
</comportamiento>

<verificacion>
Antes de dar por terminado:
1. `pnpm build` (o `pnpm dev`) compila sin errores ni warnings de sintaxis. Asegúrate de que no
   quedó ninguna anotación de TypeScript ni `"use client"` en el `.jsx`.
2. Revisa visualmente la página "Nosotros": la galería aparece donde estaba la antigua, con el
   encabezado correcto, paleta de marca y las imágenes nuevas cargando bien.
3. Comprueba el responsive en ancho móvil (~375px) y escritorio: el grid se reordena, el modal
   se abre/cierra y la página sigue haciendo scroll con normalidad.
4. Confirma que todas las rutas de imagen apuntan a archivos que existen en `/public`.
</verificacion>

<preguntas_solo_si_bloquean>
Tienes contexto suficiente para proceder. Pregunta únicamente si algo te impide avanzar; por
ejemplo, si dudas entre reemplazar por completo la galería antigua o mantener ambas. Por defecto:
reemplázala por la nueva.
</preguntas_solo_si_bloquean>

---

<apendice_componente_origen>
Componente a portar (origen en TypeScript/`.tsx` con `"use client"`; pórtalo a `.jsx` según los
pasos de arriba). La lógica debe conservarse intacta; solo se eliminan tipos y la directiva, y se
reestilizan los colores indicados:

```tsx
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';

// MediaItemType: { id, type, title, desc, url, span }
// MediaItem -> renderiza <video> si type === 'video', si no <img>.
//   - usa IntersectionObserver para reproducir/pausar vídeo en viewport
//   - estado isBuffering con spinner mientras carga
// GalleryModal -> modal a pantalla con motion + dock arrastrable de miniaturas
// InteractiveBentoGallery -> grid bento; al tocar una celda abre el modal;
//   las celdas se pueden arrastrar para reordenar (revisar en móvil, ver <comportamiento>)
//
// El código TSX completo es el que te ha pasado el usuario en el mensaje original.
// Pórtalo respetando <pasos>, <estetica> y <comportamiento>.
```

Props del componente:
- `mediaItems`: array de objetos `{ id, type, title, desc, url, span }`
- `title`: string (título de la sección)
- `description`: string (subtítulo)

Estructura de cada `mediaItem`:
- `id`: número único
- `type`: `"image"` (en este proyecto no usamos `"video"`)
- `title`: título corto en español
- `desc`: descripción breve en español
- `url`: ruta `/imagen.jpg` de `/public`
- `span`: clases de grid, p. ej. `"md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2"`
</apendice_componente_origen>
