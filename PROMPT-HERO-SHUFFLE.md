# Prompt — Rediseñar el hero con una rejilla animada de fotos (idea "shuffle grid")

> Pega el bloque siguiente a tu agente de código. Está redactado para el stack real de este repo. No copies el componente shadcn original tal cual: el prompt explica por qué y cómo adaptarlo.

---

<rol>
Eres un desarrollador frontend senior trabajando en el sitio de Vereda Silvestre, un centro canino en Jilotepec (Edo. de México). Cuidas el detalle visual, la accesibilidad y la coherencia con el código existente.
</rol>

<objetivo>
Mejorar el hero de la página de inicio (`src/pages/Inicio.jsx`). Hoy la columna derecha del hero usa el componente `<Galeria>` (carrusel con flechas y miniaturas). Quiero sustituir esa imagen estática por una **rejilla de fotos que se reordena sola con una animación suave**, inspirada en el patrón "shuffle grid": una cuadrícula de imágenes que cada pocos segundos baraja sus posiciones con una transición fluida.

La columna izquierda del hero (eyebrow "Jilotepec, Edo. de México", el `h1` serif, el párrafo y los dos botones de CTA) se mantiene tal cual. Solo cambia el bloque visual de la derecha.
</objetivo>

<stack_real>
Antes de escribir código, ten muy presente que este proyecto NO es un proyecto shadcn/TypeScript. El componente de referencia que inspira esta tarea venía en ese formato, pero aquí hay que adaptarlo. El stack real es:

- Vite + React 19 + **JavaScript (.jsx)**. No hay TypeScript. No añadas tipos ni archivos `.tsx`.
- Tailwind CSS v3 con directivas `@tailwind` en `src/index.css`. **No hay design tokens** de shadcn: no existen `bg-primary`, `text-muted-foreground`, `text-foreground`, `ring-ring`, etc. Los colores se ponen con clases de Tailwind y valores arbitrarios hardcodeados.
- Paleta del sitio (úsala, no inventes otra):
  - Verde oscuro principal: `#3F4A2A`
  - Verde más oscuro (hover / títulos): `#2E3720`
  - Crema de fondo: `#FAF6EC` y `#F5EFDF`
  - Neutros: la escala `stone-*` de Tailwind (`stone-600`, `stone-200`, etc.)
  - Títulos en `font-serif`.
- Animación: el proyecto ya usa **GSAP** (`gsap`, `@gsap/react`) y en concreto **GSAP Flip** en `src/components/FlipReveal.jsx`. Usa GSAP, **no instales `framer-motion`**.
- Iconos: `lucide-react` (ya instalado).
- No existe el alias `@/`, ni `@/lib/utils`, ni la función `cn`, ni la carpeta `/components/ui`. Importa con rutas relativas (`../components/...`) como el resto del repo. No introduzcas `cn`: concatena clases con plantillas de string normales o `clsx` solo si ya estuviera instalado (no lo está, así que evítalo).
- Imágenes: son archivos locales en `/public`, referenciadas como `/nombre.jpg`. No uses URLs de Unsplash.
</stack_real>

<por_que_gsap_flip>
El componente original lograba el "shuffle" con la prop `layout` de framer-motion, que anima automáticamente los cambios de posición. En GSAP el equivalente exacto es el plugin **Flip**: capturas el estado (`Flip.getState`) antes de reordenar el array, actualizas el DOM, y luego `Flip.from(state, {...})` anima cada celda desde su posición vieja a la nueva. Esto evita meter una dependencia nueva y reutiliza el patrón que ya existe en `FlipReveal.jsx`. Mira ese archivo primero para seguir el mismo estilo (registro de plugin, `useGSAP`, manejo de `prefers-reduced-motion`).
</por_que_gsap_flip>

<requisitos>
1. Crea un componente nuevo `src/components/RejillaShuffle.jsx` (en JSX, sin TS).
2. La rejilla es de 4×4 (16 celdas) en escritorio. Cada celda muestra una foto de perro recortada (`object-cover`, `rounded-md`), con esquinas redondeadas en el contenedor general acorde al hero actual (`rounded-2xl`, `overflow-hidden`).
3. Cada ~3 segundos, baraja el orden de las fotos y anima la recolocación con GSAP Flip (duración ~0.6–1.2s, easing suave tipo `power3.inOut`, con un pequeño `stagger`). Limpia el `interval`/timeout y el contexto de GSAP al desmontar.
4. **Respeta `prefers-reduced-motion`**: si el usuario lo prefiere, no animes ni hagas el barajado automático; muestra la rejilla estática. Sigue el mismo enfoque que `FlipReveal.jsx`.
5. Usa fotos reales de `/public`. Elige 16 imágenes de perros en el campo, variadas y de buena calidad. Candidatas existentes (verifica que el archivo exista antes de usarlo):
   `/dos-perros-campo.jpg`, `/dos-perritos-corriendo-prado-humedo.jpg`, `/dos-pastores-australianos-prado-flores.jpg`, `/husky-canela-arnes-prado-verde.jpg`, `/border-collie-mestizo-corriendo-prado.jpg`, `/cattle-dog-collar-rojo-prado.jpg`, `/perro-canela-corriendo-hierba-alta.jpg`, `/perro-canela-atardecer-pinos.jpg`, `/pastor-tricolor-sentado-cerca-amanecer.jpg`, `/labrador-canela-descansando-muro-piedra.jpg`, `/cocker-spaniel-arnes-turquesa-hierba.jpg`, `/dos-perros-corriendo-charco-nopal.jpg`, `/pointer-moteado-hierba-alta.jpg`, `/retriever-negro-corriendo-correa-azul.jpg`, `/perro-canela-mirando-laguna-luna.jpg`, `/dos-perros-negros-paseando-sendero-1.jpg`.
   Si alguna no existe, sustitúyela por otra del mismo directorio con nombre temático similar.
6. Responsive: en móvil (`<md`) la rejilla 4×4 queda demasiado pequeña. Reduce a 3×3 (9 celdas) o 2×… según se vea mejor, y limita la altura para que no empuje el contenido. En `md` y arriba, 4×4 ocupando una altura cómoda (≈420–460px), alineada verticalmente con el bloque de texto de la izquierda.
7. Accesibilidad: las celdas son decorativas/ambientales (no son contenido informativo navegable). Marca el contenedor con `aria-hidden="true"` o usa imágenes de fondo con `role="img"` y un `aria-label` global descriptivo (p. ej. "Perros disfrutando del entorno natural de Vereda Silvestre"). No metas 16 imágenes con foco de teclado ni texto alternativo redundante.
8. Rendimiento: las imágenes del hero deben cargar pronto pero sin bloquear; usa `loading="eager"` solo si son `<img>` visibles arriba, y considera precargar con `fetchpriority`. Evita layout shift fijando el `aspect-ratio` de cada celda.
9. Integra el componente en `src/pages/Inicio.jsx` reemplazando el bloque `<Galeria images={heroImages} .../>` de la columna derecha del hero. Mantén el contenedor `rounded-2xl overflow-hidden shadow-xl shadow-stone-900/10`. No toques las otras secciones (beneficios, servicios destacados, etc.).
</requisitos>

<criterios_de_calidad>
- El resultado debe verse hecho a medida para esta marca (cálido, natural, sereno), no como una demo genérica. Evita el aspecto "AI slop": nada de sombras exageradas, gradientes morados ni animaciones llamativas. El movimiento debe ser sutil y elegante, acorde a un sitio de bienestar canino.
- Coherencia total con el hero actual: misma paleta, mismos radios, misma tipografía serif. La rejilla debe sentirse parte del mismo sistema visual, no un injerto.
- Código en el mismo estilo que el repo: JSX, rutas relativas, comentarios breves en español como en `FlipReveal.jsx`, sin dependencias nuevas.
</criterios_de_calidad>

<entrega>
1. Primero lee `src/pages/Inicio.jsx` (sección hero) y `src/components/FlipReveal.jsx` para alinear el estilo.
2. Crea `src/components/RejillaShuffle.jsx`.
3. Edita `src/pages/Inicio.jsx` para usarlo en el hero.
4. Verifica que `npm run build` (o `pnpm build`) compila sin errores y que no se introdujo ninguna importación inexistente (`@/`, `cn`, `framer-motion`).
5. Resume en pocas líneas: qué imágenes usaste, cómo manejaste `prefers-reduced-motion` y el comportamiento responsive, y cualquier decisión de diseño relevante.
</entrega>

<antipatrones>
No hagas nada de esto:
- Instalar `framer-motion`, `clsx`, `tailwind-merge`, o crear `@/lib/utils`.
- Usar clases de tokens shadcn (`bg-primary`, `text-foreground`, `text-muted-foreground`, `ring-ring`...). No existen aquí y romperán el estilo.
- Convertir archivos a TypeScript o crear `/components/ui`.
- Usar imágenes de Unsplash o cualquier URL externa.
- Animar ignorando `prefers-reduced-motion`.
</antipatrones>
```

---

## Notas de diseño del prompt (por qué quedó así)

- **Aterrizado en tu stack, no en el del componente.** El componente que pegaste asume shadcn + TypeScript + framer-motion + tokens (`bg-primary`, `cn`, `@/lib/utils`). Tu repo no tiene nada de eso. El prompt convierte esa diferencia en instrucciones explícitas y en una sección `<antipatrones>`, porque Opus 4.8 sigue las instrucciones de forma literal: si no le dices "no instales framer-motion", lo hará.
- **GSAP Flip en vez de framer-motion `layout`.** Reaprovecha el patrón que ya tienes en `FlipReveal.jsx` (mismo registro de plugin, `useGSAP`, manejo de reduced-motion). Cero dependencias nuevas.
- **Imágenes reales.** Listé 16 fotos que existen en `/public` para que el agente no invente rutas ni use Unsplash.
- **Explicar el porqué** (sección `<por_que_gsap_flip>`) en lugar de prohibiciones secas: funciona mejor con este modelo y deja claro el criterio.
- **Sin MAYÚSCULAS agresivas ni "DEBES"**, que provocan overtriggering.

Si quieres, puedo **implementarlo yo directamente** en el repo en vez de solo entregarte el prompt — dime y lo hago.

