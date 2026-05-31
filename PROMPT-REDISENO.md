# Prompt para Claude Code — Rediseño Vereda Silvestre

Copia el bloque siguiente y pásalo a una sesión nueva de Claude Code (o Claude en cualquier herramienta con acceso a este repo). Está pensado para Claude Opus 4.7; con `effort: medium` y `thinking` activado debería bastar.

---

````
<rol>
Eres un ingeniero frontend senior trabajando en `vereda-silvestre`, la web pública del Centro Canino Vereda Silvestre (Jilotepec, México). El proyecto es una SPA en React 19 + Vite 8 + Tailwind 3 + react-router-dom v7 + lucide-react, desplegada en Vercel sin backend. La paleta es color crema `#FAF6EC`, verde bosque `#3F4A2A` y verde oscuro `#2E3720`. La tipografía usa `font-serif` para títulos. Mantén el estilo cálido, sobrio y campestre que ya existe — no introduzcas un look genérico de SaaS.
</rol>

<contexto>
La dueña del centro ha revisado la web actual y pide tres cambios. Los tres conviven con lo ya hecho: no toques páginas, rutas ni componentes que no estén mencionados aquí (Header, Footer, Inicio, Nosotros, Contacto, Tarifas, AvisoPrivacidad, Cookies, BannerCookies, CarruselAuto, Galeria, Lightbox, ScrollToTop se mantienen salvo las dos modificaciones puntuales que indico en `<tarea-4>`).

La fuente única de verdad para servicios es `src/data/servicios.js`. La fuente única de verdad para productos debe ser un archivo análogo nuevo: `src/data/productos.js`. La función `whatsappLinkServicio` en `servicios.js` es el patrón a replicar para WhatsApp en tienda.
</contexto>

<stack-y-convenciones>
- React 19 con componentes funcionales y hooks. Nada de class components.
- Tailwind para todo el styling. No CSS-in-JS, no styled-components.
- Rutas definidas en `src/App.jsx` dentro de `<Layout />`.
- Imágenes en `public/` y referenciadas con ruta absoluta (`/foto.jpg`).
- Sin TypeScript: el proyecto es JS puro con ESLint.
- Lucide para iconos (ya instalado).
- Sin librerías nuevas salvo justificación clara. Si necesitas estado de carrito, usa Context + `useReducer` de React. Persistencia en `localStorage`.
- Accesibilidad: cada botón con `aria-label` si no tiene texto, cada imagen con `alt` descriptivo, foco visible (Tailwind `focus-visible:`), tamaño táctil mínimo 44px.
- Mobile-first. Probar en 360px de ancho.
</stack-y-convenciones>

<tarea-1 titulo="Reemplazar los servicios">
La dueña quiere sustituir los servicios actuales por los cinco que aparecen en la captura que te paso. **No mantengas los slugs antiguos**: los cinco nuevos son los únicos servicios visibles. Los antiguos quedan retirados.

Servicios nuevos (en `src/data/servicios.js`, respetando el schema actual con `slug`, `titulo`, `categoria`, `precio`, `resumen`, `descripcion[]`, `incluye[]`, `media[]`, `portada`):

1. **Cachorro** — categoría "Programa", precio `"1500 MXN"`, marcar como `estado: 'finalizado'` (campo nuevo, opcional). Programa formativo para cachorros: socialización temprana, manejo, primeras pautas de convivencia. La etiqueta visual "Finalizado" se muestra como badge sobre la card (ver `<estilos-card>`).
2. **Educación canina familiar** — categoría "Programa", precio `"2500 MXN"`, `estado: 'finalizado'`. Trabajo con el binomio familia-perro: comunicación, rutinas, manejo cotidiano en casa.
3. **Activación natural** — categoría "Sesión", precio `"350 MXN"`, `estado: 'activo'`. Sesión de enriquecimiento y trabajo de olfato/exploración en entorno natural.
4. **Pensión Campestre** — categoría "Pensión", precio `"500 MXN / día"`, `estado: 'activo'`. Unifica la pensión existente (sustituye las tres variantes por tamaño con esta sola entrada). Resumen: hospedaje campestre con paseos diarios y manejo respetuoso.
5. **Seminarios formativos** — categoría "Formación", precio `"3500 MXN"`, `estado: 'activo'`. Seminarios para tutores y profesionales: lectura del lenguaje canino, manejo, metodología.

Para cada uno: redacta `resumen` (1 frase), `descripcion` (2-3 párrafos) e `incluye` (4-6 ítems) en el mismo tono que los servicios existentes — directo, sin marketing-speak. Para `media` y `portada`, usa rutas placeholder coherentes (`/cachorro-1.jpg`, etc.) y añade los nombres de archivo nuevos a `ASSETS-REVISAR.md` con una nota breve para que la dueña los suba después.

<estilos-card>
- Si `estado === 'finalizado'`: badge superior izquierdo de la card, fondo `bg-stone-700`, texto `text-[#FAF6EC]`, padding `px-3 py-1`, texto `text-xs uppercase tracking-wide`, contenido "Finalizado". La card sigue siendo clicable pero el botón CTA cambia de "Reservar" a "Ver detalles".
- Si `estado === 'activo'`: sin badge, CTA "Reservar" lleva a WhatsApp con `whatsappLinkServicio(titulo)`.
</estilos-card>

Actualiza `src/pages/Servicios.jsx` y `src/pages/ServicioDetalle.jsx` para soportar el campo `estado`. Si hay categorías en filtros, recalcula las categorías visibles a partir de los nuevos servicios.
</tarea-1>

<tarea-2 titulo="Sección de tienda — catálogo con pedido por WhatsApp">
La dueña pidió una tienda. **Decisión tomada**: catálogo estático + carrito local + envío del pedido por WhatsApp. No integramos pasarela de pago. Razón: el centro no tiene aún volumen para justificar Stripe + serverless, y WhatsApp ya es su canal habitual con clientes. La arquitectura debe quedar limpia para migrar a Stripe más adelante si hace falta (ver `<futuro-stripe>`).

<entregables>
1. `src/data/productos.js` — array de productos con schema:
   ```js
   {
     id: 'correa-antideslizante-sprenger',  // kebab-case sin acentos
     nombre: 'Correa antideslizante Sprenger',
     precio: 500,           // número, MXN
     imagen: '/tienda/correa-antideslizante.jpg',
     categoria: 'Correas',
     descripcion: 'Texto corto, 1-2 frases.',
     etiqueta: null,        // null | 'mas-vendido' | 'nuevo'
     stock: true,           // bool simple; cuando sea false se muestra "Agotado"
   }
   ```
   Carga estos 7 productos con los precios de la captura:
   - Correa antideslizante Sprenger — 500 MXN
   - Collar de corrección Sprenger — 300 MXN
   - Transportadora Petmate — 2500 MXN — `etiqueta: 'mas-vendido'`
   - Correa larga 10 m — 350 MXN
   - Correa de cuero 1.80 m — 200 MXN — `etiqueta: 'nuevo'`
   - Clicker — 80 MXN
   - Portapremios para perro — 85 MXN

   Exporta también `whatsappLinkPedido(items)` que reciba `[{ producto, cantidad }]` y devuelva una URL `https://wa.me/5215562058871?text=...` con el mensaje:
   ```
   Hola, quiero hacer un pedido en Vereda Silvestre:
   • 2× Correa antideslizante Sprenger — 1000 MXN
   • 1× Clicker — 80 MXN
   Total: 1080 MXN
   ¿Me confirmas disponibilidad y envío?
   ```

2. `src/context/CarritoContext.jsx` — Context con `useReducer`. Acciones: `agregar(productoId)`, `quitar(productoId)`, `cambiarCantidad(productoId, cantidad)`, `vaciar()`. Estado: `{ items: [{ productoId, cantidad }] }`. Persiste en `localStorage` con clave `vereda-carrito-v1`. Expón `useCarrito()` hook.

3. `src/pages/Tienda.jsx` — página `/tienda`. Layout:
   - Hero corto con título "Tienda" y subtítulo de 1 línea.
   - Filtros laterales en desktop (sidebar `w-64`), colapsables arriba en mobile: filtro por categoría y por rango de precio (slider o dos inputs). Orden: "Recomendados" (default), "Precio: menor a mayor", "Precio: mayor a menor".
   - Grid de productos: 1 columna en mobile, 2 en `sm:`, 3 en `md:`, 4 en `lg:`. Cards con foto (aspect-square `object-cover`), nombre, precio, badge de etiqueta arriba-izquierda si aplica (`mas-vendido` → fondo `bg-[#3F4A2A]`, `nuevo` → fondo `bg-amber-700`, ambos texto crema).
   - Botón "Agregar" en cada card que llama a `agregar(id)`. Feedback visual al agregar (cambia momentáneamente a "Agregado ✓" durante ~1.2 s).

4. `src/pages/ProductoDetalle.jsx` — ruta `/tienda/:id`. Foto grande izquierda, info derecha: nombre, precio, descripción, selector de cantidad (- / + con mínimo 1), botón "Agregar al carrito", link "Volver a tienda". Si `stock: false`, deshabilita el botón y muestra "Agotado".

5. `src/components/CarritoDrawer.jsx` — drawer lateral derecho que se abre desde un icono de carrito en `Header`. Lista de items con miniatura, nombre, controles de cantidad, subtotal por línea, botón de eliminar. Al final: total y CTA grande "Pedir por WhatsApp" que abre `whatsappLinkPedido(items)` en pestaña nueva. Si el carrito está vacío, muestra estado vacío con CTA "Ver productos".

6. Modificar `src/components/Header.jsx`: añadir icono `ShoppingBag` de lucide con badge numérico (contador de items del carrito) que abre el `CarritoDrawer`. Añadir link "Tienda" al array `links` entre "Servicios" y "Nosotros".

7. Añadir rutas en `src/App.jsx`: `/tienda` → `Tienda`, `/tienda/:id` → `ProductoDetalle`.
</entregables>

<futuro-stripe>
Para no cerrar la puerta a una tienda con pago real más adelante:
- El `CarritoContext` ya tiene la forma de un carrito estándar (items, cantidades, total derivado).
- Aísla la lógica de "checkout" en un único componente `BotonCheckout` que hoy llama a `whatsappLinkPedido`. Migrar a Stripe será cambiar el contenido de ese componente.
- No metas lógica de pedido en el drawer ni en las cards.
Deja un comentario `// TODO: migrar a Stripe Checkout cuando crezca el volumen` arriba de `BotonCheckout`.
</futuro-stripe>

Añade entradas a `ASSETS-REVISAR.md` listando las 7 imágenes de producto que la dueña debe enviar y la ruta exacta donde colocarlas (`public/tienda/...`).
</tarea-2>

<tarea-3 titulo="Sección 'Únete a nuestro equipo'">
La dueña quiere comunicar que el centro está en expansión y abrir candidatura espontánea. Dos piezas:

1. **Bloque en `src/pages/Inicio.jsx`**, insertado antes del footer / sección final. Estructura:
   - Layout 2 columnas en desktop (`md:grid-cols-2`), apilado en mobile.
   - Columna izquierda: fondo `bg-stone-200` o `bg-[#FAF6EC]`, padding generoso (`p-10 md:p-14`). Título `font-serif text-3xl md:text-4xl` "Únete a nuestro equipo". Párrafo: "Vereda Silvestre está en expansión. Actualmente contamos con personal de apoyo en salidas estructuradas y pensión, y nos encontramos formando educadores bajo nuestro enfoque técnico y comunitario. Creemos en la formación interna y en la construcción de criterio profesional." Botón "Quiero formar parte" → `Link` a `/unete`.
   - Columna derecha: imagen ancha de paisaje/entorno (placeholder `/unete-portada.jpg`, añadir a `ASSETS-REVISAR.md`).
   - Mantén el mismo tono cálido y campestre, sin gradientes vistosos.

2. **Página nueva `src/pages/Unete.jsx`** en ruta `/unete`:
   - Hero con título e imagen de fondo o lateral (reutiliza la portada).
   - 2-3 párrafos ampliando el bloque del Inicio: qué perfiles buscamos (apoyo en salidas, pensión, educadores en formación), qué ofrecemos (formación interna, criterio profesional, comunidad), cómo es trabajar aquí.
   - Sección "¿Cómo aplicar?" con un formulario simple: nombre, email, teléfono, área de interés (select: Apoyo en salidas / Pensión / Educador en formación / Otro), mensaje (textarea). Al enviar, **abre WhatsApp** con el mensaje pre-rellenado (mismo patrón que tienda). No POST a backend.
   - Validación HTML5 (`required`, `type="email"`). Foco visible y orden lógico de tab.
   - Añadir link "Únete" en `Header` solo si cabe en el nav sin agobiar; si no, déjalo solo accesible desde el bloque del Inicio y desde el Footer.
</tarea-3>

<tarea-4 titulo="Cambios menores en lo existente">
- `Footer.jsx`: añadir link a "Tienda" y a "Únete" en la columna de navegación.
- `index.html`: si hay `<title>` o `<meta name="description">`, no los cambies salvo que ahora mencionen explícitamente solo servicios; en ese caso, ampliar a "servicios, tienda y formación".
</tarea-4>

<criterios-de-aceptacion>
1. `npm run build` termina sin errores ni warnings nuevos.
2. `npm run lint` pasa.
3. Navegación desde Inicio → Tienda → producto → agregar al carrito → abrir drawer → "Pedir por WhatsApp" produce un mensaje legible y correcto.
4. Refrescar la página con productos en el carrito mantiene el carrito (localStorage).
5. La sección "Únete" en Inicio enlaza a `/unete` y el formulario produce un mensaje de WhatsApp con todos los campos.
6. Cards de servicios "Cachorro" y "Educación canina familiar" muestran badge "Finalizado" y CTA "Ver detalles", no "Reservar".
7. En mobile (ancho 360px) ningún elemento desborda horizontalmente; los CTA son ≥44px de alto.
8. Lighthouse accesibilidad ≥ 90 en `/`, `/tienda` y `/unete`.
9. `ASSETS-REVISAR.md` está actualizado con la lista exacta de imágenes nuevas que la dueña debe enviar y su ruta destino.
</criterios-de-aceptacion>

<forma-de-trabajar>
Antes de codificar:
1. Lee `src/data/servicios.js`, `src/pages/Servicios.jsx`, `src/pages/Inicio.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx` y `src/App.jsx`. No asumas su contenido — léelo.
2. Resume en 5-8 bullets el plan que vas a ejecutar y espera mi OK antes de empezar a escribir archivos. Si detectas conflictos con lo que ya existe (por ejemplo, lógica de filtros en Servicios que rompería al cambiar el dataset), señálalos en el resumen con tu propuesta de resolución.

Durante el trabajo:
- Cambia un archivo a la vez y avanza secuencialmente: tarea 1 completa → build/lint → tarea 2 → build/lint → tarea 3 → build/lint final.
- Sin abreviaturas de código tipo "// resto igual". Escribe los archivos completos cuando los toques.
- No introduzcas dependencias nuevas sin avisarme primero.

Al terminar:
- Lista los archivos creados y modificados.
- Lista las imágenes que faltan (deben coincidir con `ASSETS-REVISAR.md`).
- Pega el output de `npm run build` y `npm run lint`.
</forma-de-trabajar>

<lo-que-no-quiero>
- Look genérico de e-commerce con gradientes morados, sombras grandes y emojis. La marca es campestre y sobria.
- Dependencias nuevas para resolver problemas que el stack actual ya resuelve.
- Tocar pensión por tamaño antes de unificarla en "Pensión Campestre" — la unificación es parte de la tarea 1.
- Componentes "mega-flexibles" con 10 props opcionales. Prefiero código directo y legible.
- Comentarios obvios (`// importa React`). Sí quiero comentarios donde haya una decisión no evidente (por ejemplo, la nota TODO sobre Stripe).
</lo-que-no-quiero>
````

---

## Notas para ti (no van en el prompt)

**Parámetros API recomendados** cuando lo pases:
- `model: claude-opus-4-7` (o sonnet 4.6 si quieres ahorrar — para este trabajo bastaría).
- `effort: medium`. La tarea es concreta y enmarcada; no necesita razonamiento profundo.
- `thinking` activado con presupuesto bajo-medio, suficiente para que planifique antes de tocar `Servicios.jsx`.

**Decisiones que tomé por ti y puedes revertir:**
1. **Catálogo + WhatsApp** sobre Stripe. Si en 6 meses la dueña vende >20 pedidos/mes, vale la pena migrar; mientras tanto, esto cuesta cero y el carrito ya está bien aislado para cambiarlo.
2. **Pensión Campestre unificada.** La captura de la dueña muestra una sola entrada de pensión a 500 MXN, no tres por tamaño. Si quería mantener los tres precios, díselo al ejecutor y modificará la tarea 1.
3. **Estado "Finalizado" como badge.** En la captura, "Cachorro" y "Educación canina familiar" aparecen marcados así. Asumo que significa "edición actual cerrada, próxima edición por anunciar". Si quiere decir "servicio descontinuado", cambia el CTA a algo como "Avísame cuando vuelva" en lugar de "Ver detalles".
4. **Únete con formulario que dispara WhatsApp** en lugar de email. Es consistente con el resto del sitio y evita configurar un backend de email.

**Si los síntomas vuelven** (modelo demasiado verboso, hace cambios fuera de lo pedido, etc.):
- Refuerza la sección `<lo-que-no-quiero>` con el síntoma concreto.
- Pide explícitamente "no toques X" en `<contexto>`.
- Baja `effort` un escalón.
