# Prompt para Opus 4.8 — Curar la tienda (imagen + texto como una sola unidad)

> Pégalo como instrucción a un agente de codificación (Opus 4.8) trabajando dentro del repo `vereda-silvestre`.
> Recomendado: `effort: xhigh`. Deja que explore y verifique antes de editar.

---

<rol>
Eres un ingeniero frontend trabajando en este repositorio (React + Vite + Tailwind). El sitio sirve
los archivos de `public/` directamente desde la raíz del dominio: una ruta `/foo.webp` en el código
equivale al archivo `public/foo.webp`. No hay bundler para estas imágenes; son archivos estáticos.
</rol>

<contexto>
La tienda tiene una única fuente de verdad: `src/data/productos.js`. Cada producto es un objeto que
agrupa SU imagen con SU texto, y ambos se renderizan juntos en dos sitios:

- `src/pages/Tienda.jsx` — la rejilla de tarjetas (usa `imagen`, `nombre`, `categoria`, `precio`, `etiqueta`).
- `src/pages/ProductoDetalle.jsx` — la ficha individual `/tienda/:id` (usa además `descripcion`).

El schema de cada producto es:

    {
      id,            // kebab-case sin acentos; es la URL /tienda/:id
      nombre,        // título visible en tarjeta y ficha
      precio,        // número en MXN
      imagen,        // ruta a un archivo real en public/
      categoria,     // 'Correas' | 'Collares' | 'Transporte' | 'Adiestramiento'
      descripcion,   // 1-2 frases; se ve en la ficha y en el <meta description>
      etiqueta,      // null | 'mas-vendido' | 'nuevo'
      stock,         // bool; false => "Agotado"
    }
</contexto>

<problema>
Hoy las imágenes y los textos no siempre van en conjunto: cada tarjeta muestra una foto, pero el
texto que la acompaña (nombre, categoría, descripción) puede no corresponder con lo que realmente se
ve en esa imagen, o la descripción es genérica y no describe el producto concreto de la foto. Quiero
que imagen y texto se traten como una sola unidad coherente por producto, no como dos campos sueltos.
</problema>

<objetivo>
Revisar cada producto de `src/data/productos.js` y dejar que la imagen y todo su texto sean
coherentes entre sí: la descripción debe describir EXACTAMENTE lo que aparece en la imagen asignada,
el nombre y la categoría deben encajar con esa misma imagen, y la etiqueta/precio/stock deben ser
correctos. Al terminar no debe haber ninguna tarjeta donde la foto diga una cosa y el texto otra.
</objetivo>

<que_hacer_por_cada_producto>
Para CADA uno de los productos del array (no solo los primeros), haz lo siguiente:

1. Abre el archivo de imagen real al que apunta `imagen` y mira qué muestra de verdad. Las imágenes
   de producto disponibles en `public/` son las que empiezan por `producto-` (más `DogClicker_jpg.webp`):
   `producto-correa-antideslizante.webp`, `producto-collar-sprenger-cadena.webp`,
   `producto-transportin-perro.webp`, `producto-correa-larga-nylon-negro.webp`,
   `producto-correa-cuero-marron-asa.webp`, `producto-bolsa-premios-adiestramiento.webp`,
   `producto-correas-nylon-colores.jpg`, `DogClicker_jpg.webp`.

2. Comprueba que `nombre` y `categoria` describen ese objeto. Si la imagen muestra otra cosa, corrige
   el texto para que coincida con la imagen (no al revés), salvo que sea más correcto reasignar la
   imagen a un archivo que sí muestre el producto del nombre. Decide caso por caso y deja el par
   imagen+nombre alineado.

3. Reescribe `descripcion` para que hable del producto concreto que se ve en la foto: material,
   tamaño/medida, uso real. 1-2 frases, en español neutro, tono sobrio (es un centro canino, no
   marketing agresivo). Evita frases idénticas entre productos.

4. Verifica `precio` (número), `etiqueta` (solo una puede ser `mas-vendido` y solo una `nuevo`; el
   resto `null`) y `stock`.
</que_hacer_por_cada_producto>

<higiene_de_archivos>
Hay dos archivos con nombre problemático que conviene no usar como rutas finales:
- `public/Correa antideslizante.webp` — tiene un espacio, frágil en URLs.
- `public/DogClicker_jpg.webp` — sufijo `_jpg.webp` engañoso.

Si decides seguir usando esas imágenes, renómbralas a `kebab-case` coherente con el resto
(p. ej. `producto-clicker-adiestramiento.webp`) y actualiza la ruta en `productos.js`. Si no las
usas, déjalas como están: no borres archivos. No introduzcas rutas a archivos que no existan en
`public/`; toda ruta `imagen` debe resolver a un archivo real.
</higiene_de_archivos>

<restricciones>
- Edita SOLO `src/data/productos.js` para datos. Toca `Tienda.jsx` / `ProductoDetalle.jsx` únicamente
  si encuentras un bug real de render; no rediseñes la UI.
- No cambies los `id`: son URLs públicas y romperías enlaces existentes.
- No inventes productos nuevos ni elimines productos existentes salvo que te lo pida.
- Mantén el `alt` accesible: hoy se usa `nombre` como `alt`, lo cual es correcto si nombre e imagen
  coinciden — esa es justamente la razón por la que deben ir en conjunto.
</restricciones>

<verificacion>
Antes de dar por terminado:
1. Recorre el array y confirma, producto por producto, que imagen ↔ nombre ↔ categoria ↔ descripcion
   cuentan la misma historia.
2. Confirma que cada `imagen` existe en `public/` (sin 404).
3. Ejecuta el build (`npm run build` o el script del repo) y verifica que compila sin errores.
4. Entrega un resumen en tabla: por cada producto, qué cambiaste (imagen / nombre / categoria /
   descripcion / etiqueta) y por qué, y marca los que ya estaban bien.
</verificacion>
