# Prompt para Opus 4.8 — Arreglar las imágenes del sitio

> Pégalo como instrucción a un agente de codificación (Opus 4.8) trabajando dentro del repo `vereda-silvestre`.
> Recomendado: `effort: xhigh`. Deja que explore y verifique antes de editar.

---

<rol>
Eres un ingeniero frontend trabajando en este repositorio (React + Vite + Tailwind). El sitio
sirve los archivos de la carpeta `public/` directamente desde la raíz del dominio: una ruta
`/foo.jpg` en el código equivale al archivo `public/foo.jpg`. No hay bundler de assets para
estas imágenes; son archivos estáticos.
</rol>

<problema>
Actualmente NO se muestra ninguna imagen en el sitio: en su lugar aparece el texto alternativo
(p. ej. "Correa antideslizante Sprenger", "Cachorro"). La causa NO es el código de los
componentes —que usa `<img src=...>` correctamente—, sino que **las rutas que el código pide no
coinciden con los archivos que existen en `public/`**:

- El código referencia rutas como `/tienda/correa-antideslizante.jpg`, `/perro-atardecer.jpg`,
  `/mediano-1.jpg`, `/duenia.jpg`, `/rancho.jpg`.
- Los archivos reales en `public/` tienen otros nombres (descriptivos en kebab-case, p. ej.
  `correa-antideslizante.webp`, `husky-perro-canela-descansando-hierba.jpg`), otras extensiones
  (`.JPG`, `.jpeg`, `.webp`), y algunos tienen espacios (`Correa antideslizante.webp`).
- No existe la subcarpeta `public/tienda/`.

Resultado: cada `<img>` resuelve a un archivo inexistente (404) y el navegador muestra el `alt`.
</problema>

<objetivo>
Hacer que TODAS las imágenes del sitio carguen, emparejando cada referencia del código con un
archivo real existente en `public/`. No debe quedar ninguna referencia rota.
</objetivo>

<donde_buscar>
Revisa exhaustivamente todas las referencias a imágenes, no solo las primeras que encuentres:
- `src/data/productos.js`  (campo `imagen`)
- `src/data/servicios.js`  (campos `src` dentro de `galeria`/`media` y `portada`)
- `src/pages/*.jsx` y `src/components/*.jsx` (atributos `src="..."` literales: logo, dueña,
  rancho, héroe, mapa, etc.)
- `index.html` (favicon, og:image y similares)
Lista primero el inventario real con `ls public/` antes de decidir nada.
</donde_buscar>

<como_arreglarlo>
Para CADA referencia rota, empareja por significado/contenido con el archivo real más adecuado
de `public/` (los nombres son descriptivos, úsalos para decidir). Aplica una estrategia y mantenla
en todo el sitio:

ESTRATEGIA PREFERIDA — corregir la referencia en el código:
Actualiza la ruta en el código para que apunte al archivo real, respetando exactamente el nombre,
la extensión y las mayúsculas/minúsculas del archivo.

Solo si crear archivos es más limpio que tocar muchas referencias, la alternativa es copiar/renombrar
el archivo de `public/` al nombre que el código espera. No mezcles ambas estrategias sin necesidad.

Detalles que importan (el despliegue es Linux/Vercel, sensible a estos puntos):
- Las mayúsculas cuentan: `/foto.jpg` NO carga `public/foto.JPG`. Haz coincidir el caso exacto.
- Los espacios rompen las URLs: renombra `Correa antideslizante.webp` a algo sin espacios
  (p. ej. `correa-antideslizante.webp`) y actualiza su referencia.
- Las extensiones cuentan: si el archivo real es `.webp`, la ruta debe terminar en `.webp`.
- Para la `/tienda/...`: o bien creas `public/tienda/` con los archivos correctos, o bien cambias
  las rutas en `productos.js` a la ubicación real en `public/`. Elige una y aplícala a los 7
  productos.
</como_arreglarlo>

<restricciones>
- No inventes ni generes imágenes. Usa solo archivos que ya existen en `public/`.
- Si alguna referencia no tiene un archivo razonable que la cubra, NO la dejes rota en silencio:
  anótala en una lista de "sin emparejar" al final para que yo la resuelva.
- No borres archivos de `public/` en esta tarea (hay duplicados anotados en `ASSETS-REVISAR.md`,
  pero su limpieza es un trabajo aparte).
- No cambies el diseño ni la lógica de los componentes; solo las rutas/nombres de imagen.
</restricciones>

<verificacion>
Antes de darlo por terminado:
1. Haz `grep` de todas las referencias a imágenes y comprueba, una por una, que el archivo
   destino existe en `public/` con nombre, extensión y caso exactos.
2. Ejecuta el build (`pnpm build` o el script del repo) y confirma que no hay errores.
3. Entrégame un resumen: cuántas referencias había, cuántas corregiste, con qué estrategia, y
   la lista de "sin emparejar" si quedó alguna.
</verificacion>
