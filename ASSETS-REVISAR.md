# Assets pendientes de revisión

Generado tras renombrado masivo de `public/` (contenido puro, kebab-case ES).
Listado para revisar manualmente cuando tengas tiempo. No tocar nada todavía.

## Duplicados exactos por hash (md5 idéntico)

Son archivos bit-a-bit iguales. Conservar solo uno.

| Archivo | md5 | Pareja |
|---|---|---|
| `public/husky-perro-canela-descansando-hierba-DUPLICADO.jpg` | `5eaf06808f55553de3d7594031ea2fc2` | `husky-perro-canela-descansando-hierba.jpg` |
| `public/pomerania-arnes-mexicano-estanque-DUPLICADO.jpg` | `6f4f99d16a09d0438b06e4a42ffb6527` | `pomerania-arnes-mexicano-estanque.jpg` |

## Duplicados visuales (mismo contenido, md5 distinto)

Mismas escenas reprocesadas/rotadas. Decidir cuál conservar.

| Par | Notas |
|---|---|
| `dos-perros-negros-paseando-sendero-1.jpg` ↔ `dos-perros-negros-paseando-sendero-2.jpg` | Mismo encuadre, dos perros con arnés/correa rosa. Una rotada respecto a la otra. |
| `pomerania-canela-atencion-entrenador.jpg` ↔ `…-editado.jpg` ↔ `…-2.jpg` | Triple. Pomerania de Chamoy mirando arriba a entrenador en pavimento. Quedarte con una. |
| `yorkshire-terrier-chamoy-silla-plegable.jpg` ↔ `yorkshire-terrier-chamoy-bandana-silla.jpg` | Mismo perro Chamoy con bandana en silla plegable. Posiblemente misma sesión. |

## Grupo A con naming inconsistente (no renombrados por regla)

Funcionan, pero rompen la coherencia con el resto. Si decides normalizar más adelante:

| Archivo | Propuesta opcional |
|---|---|
| `public/Correa antideslizante.webp` | `producto-correa-antideslizante.webp` (tiene espacio — problemático en URLs) |
| `public/DogClicker_jpg.webp` | `producto-clicker-adiestramiento.webp` (sufijo `_jpg.webp` engañoso) |

## Material aún no integrado en el sitio

Tras `grep` en `src/` e `index.html`, **ninguno** de los 93 archivos renombrados está actualmente referenciado en código. Son material disponible que puedes empezar a usar en componentes con sus nuevos nombres limpios.

---

## Imágenes NUEVAS del rediseño (la dueña debe enviar)

Estas rutas son *placeholders* referenciados ya en el código. Sube una imagen real
en cada ruta exacta para que dejen de verse rotas.

### Servicios (carpeta `public/`)

| Ruta destino | Servicio | Nota |
|---|---|---|
| `public/cachorro-1.jpg` | Cachorro | Foto del programa de cachorros. |
| `public/educacion-familiar-1.jpg` | Educación canina familiar | Familia trabajando con su perro. |
| `public/activacion-natural-1.jpg` | Activación natural | Perro olfateando/explorando en el campo. |
| `public/pension-campestre-1.jpg` | Pensión Campestre | Perro en la pensión, entorno campestre. |
| `public/seminarios-1.jpg` | Seminarios formativos | Grupo en seminario/charla. |

### Únete al equipo (carpeta `public/`)

| Ruta destino | Uso | Nota |
|---|---|---|
| `public/unete-portada.jpg` | Bloque "Únete" del Inicio y página `/unete` | Paisaje/entorno o equipo en el campo. |

### Tienda (carpeta `public/tienda/` — **crear la carpeta**)

| Ruta destino | Producto | Candidato ya en `public/` |
|---|---|---|
| `public/tienda/correa-antideslizante.jpg` | Correa antideslizante Sprenger | `Correa antideslizante.webp` |
| `public/tienda/collar-correccion-sprenger.jpg` | Collar de corrección Sprenger | `producto-collar-sprenger-cadena.webp` |
| `public/tienda/transportadora-petmate.jpg` | Transportadora Petmate | `producto-transportin-perro.webp` |
| `public/tienda/correa-larga-10m.jpg` | Correa larga 10 m | `producto-correa-larga-nylon-negro.webp` |
| `public/tienda/correa-cuero-180.jpg` | Correa de cuero 1.80 m | `producto-correa-cuero-marron-asa.webp` |
| `public/tienda/clicker.jpg` | Clicker | `DogClicker_jpg.webp` |
| `public/tienda/portapremios.jpg` | Portapremios para perro | `producto-bolsa-premios-adiestramiento.webp` |

> Los "candidatos" son fotos que ya están en `public/` y parecen corresponder a cada
> producto. Si sirven, basta copiarlas/convertirlas a la ruta destino indicada (o cambiar
> la ruta `imagen` en `src/data/productos.js`). Si no, sube fotos nuevas en esas rutas.
