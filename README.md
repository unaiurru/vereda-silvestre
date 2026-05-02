# Vereda Silvestre — Web del Centro Canino

Sitio web oficial de **Centro Canino Vereda Silvestre S.A.S. de C.V.**, ubicado en Jilotepec de Molina Enríquez, Estado de México.

Web corporativa con catálogo de servicios (pensión, adiestramiento, paseos y excursiones), tarifas, sección "Nosotros", contacto por WhatsApp y cumplimiento legal (LFPDPPP de México).

---

## Stack técnico

- **React 19** con JavaScript (no TypeScript)
- **Vite 8** como build tool
- **React Router 7** para navegación entre páginas
- **Tailwind CSS 3** para estilos
- **Lucide React** para iconos
- Sin backend: el formulario de contacto abre WhatsApp directamente, no almacena datos

---

## Cómo arrancar el proyecto

Requisitos previos: tener instalado **Node.js 18 o superior** y **npm**.

```bash
# Instalar dependencias
npm install

# Arrancar el servidor de desarrollo (http://localhost:5173)
npm run dev

# Generar el build de producción en /dist
npm run build

# Previsualizar el build de producción en local
npm run preview

# Ejecutar el linter
npm run lint
```

---

## Estructura del proyecto

```
vereda-silvestre/
├── public/                      Recursos estáticos servidos tal cual
│   ├── *.jpg                    Fotos de perros y servicios
│   ├── logo.png                 Logo del centro
│   ├── favicon.svg              Favicon
│   ├── icons.svg                Sprite de iconos auxiliares
│   ├── robots.txt               Indexación para buscadores
│   ├── sitemap.xml              Mapa del sitio para Google
│   ├── _headers                 Cabeceras HTTP para Netlify
│   └── _redirects               Reescritura SPA para Netlify
├── src/
│   ├── components/              Componentes reutilizables
│   │   ├── Layout.jsx           Layout general (Header + Outlet + Footer + Banner)
│   │   ├── Header.jsx           Cabecera con menú y CTA de WhatsApp
│   │   ├── Footer.jsx           Pie de página con enlaces y redes
│   │   ├── BannerCookies.jsx    Aviso de cookies (LFPDPPP)
│   │   ├── Galeria.jsx          Galería con miniaturas + lightbox
│   │   ├── CarruselAuto.jsx     Carrusel automático para cards
│   │   ├── Lightbox.jsx         Visor a pantalla completa
│   │   └── ScrollToTop.jsx      Resetea scroll al cambiar de ruta
│   ├── pages/                   Páginas / rutas
│   │   ├── Inicio.jsx           "/"
│   │   ├── Servicios.jsx        "/servicios"
│   │   ├── ServicioDetalle.jsx  "/servicios/:slug"
│   │   ├── Nosotros.jsx         "/nosotros"
│   │   ├── Tarifas.jsx          "/tarifas"
│   │   ├── Contacto.jsx         "/contacto"
│   │   ├── AvisoPrivacidad.jsx  "/aviso-privacidad"
│   │   └── Cookies.jsx          "/cookies"
│   ├── data/
│   │   └── servicios.js         Catálogo de servicios (editable)
│   ├── hooks/
│   │   └── useSeo.js            Hook para title/description/OG por página
│   ├── App.jsx                  Definición de rutas
│   ├── main.jsx                 Punto de entrada de React
│   ├── index.css                Estilos globales y directivas Tailwind
│   └── App.css                  Estilos auxiliares
├── index.html                   HTML base con SEO, Open Graph y JSON-LD
├── vite.config.js               Configuración de Vite
├── tailwind.config.js           Configuración de Tailwind
├── postcss.config.js            Configuración de PostCSS
├── eslint.config.js             Reglas de ESLint
├── vercel.json                  Cabeceras y rewrites para Vercel
└── package.json
```

---

## Cómo editar contenido

### Servicios y precios

Toda la información de los servicios está centralizada en **`src/data/servicios.js`**. Cada servicio tiene esta forma:

```js
{
  slug: 'pension-perro-grande',          // URL (sin acentos ni ñ)
  titulo: 'Pensión perro grande',
  categoria: 'Pensión',
  precio: '600 MXN / día',
  resumen: 'Hospedaje campestre…',       // Aparece en la card y en meta description
  descripcion: ['Párrafo 1…', 'Párrafo 2…'],
  portada: '/pension-grande-1.jpg',
  media: [
    { tipo: 'imagen', src: '/foto.jpg' },
    { tipo: 'video',  src: '/video.mp4', poster: '/preview.jpg' },
    { tipo: 'pendiente', label: 'Próximamente' },
  ],
}
```

Para añadir un servicio nuevo basta con añadir un objeto al array y, si quieres que aparezca en el sitemap, añadirlo también en `public/sitemap.xml`.

### Tarifas

La tabla de tarifas está en **`src/pages/Tarifas.jsx`**, en la constante `bloques` al inicio del archivo.

### Página "Nosotros"

Los textos editables están al inicio de **`src/pages/Nosotros.jsx`** (constantes `NOMBRE_DUENIA`, `FRASE_DESTACADA`, `HISTORIA`, `FORMACION`, `PILARES`, `CIFRAS`, `GALERIA`).

### WhatsApp y contacto

El número de WhatsApp y el correo están definidos en varios sitios. Si cambian, hay que actualizarlos en:

- `src/components/Header.jsx` → constante `WHATSAPP_URL`
- `src/components/Footer.jsx`
- `src/pages/Contacto.jsx` → `WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, `EMAIL`
- `src/pages/Inicio.jsx`, `Nosotros.jsx`, `Tarifas.jsx` → `WHATSAPP_URL`
- `src/data/servicios.js` → función `whatsappLinkServicio`
- `index.html` → JSON-LD `telephone` y `email`
- `src/pages/AvisoPrivacidad.jsx` y `Cookies.jsx` → mailto

### Imágenes

Todas las imágenes están en **`public/`** y se referencian con ruta absoluta desde la raíz: `/foto.jpg`. Para añadir una foto basta con dejarla ahí y referenciarla desde el componente que la use.

### Mapa de Google

La URL del iframe del mapa está en **`src/pages/Contacto.jsx`** (constante `MAPA_EMBED_SRC`). Si cambia la dirección del centro hay que generar un nuevo enlace de "compartir → insertar mapa" en Google Maps y pegarlo aquí.

---

## SEO

Cada página define su propio `title`, `description` y URL canónica usando el hook **`useSeo`**:

```jsx
import useSeo from '../hooks/useSeo'

export default function MiPagina() {
  useSeo({
    title: 'Servicios',
    description: 'Pensión, adiestramiento, paseos y excursiones…',
    path: '/servicios',
  })
  // …
}
```

El dominio base está definido en `src/hooks/useSeo.js` como constante `SITE_URL`.

Adicionalmente, el `index.html` contiene:

- Meta description y OG/Twitter por defecto
- JSON-LD con `LocalBusiness` (dirección, teléfono, área servida, redes sociales)
- Canonical, theme-color, apple-touch-icon

---

## Cumplimiento legal — México (LFPDPPP)

La web cumple con la **Ley Federal de Protección de Datos Personales en Posesión de los Particulares** y los lineamientos del **INAI**:

- **Aviso de Privacidad Integral** en `/aviso-privacidad` con los apartados que exige la ley: identidad y domicilio del responsable, datos recabados, finalidades, transferencias, conservación, derechos ARCO con plazo de 20 días naturales, medios para limitar uso, revocación del consentimiento, aceptación tácita y referencia al INAI.
- **Política de cookies** en `/cookies` con tabla detallada. Solo se usan cookies técnicas (no requieren consentimiento previo en México).
- **Banner de cookies** informativo enlazado al aviso de privacidad y a la política de cookies.
- El **formulario de contacto no almacena datos**: abre WhatsApp con el mensaje pre-rellenado.

---

## Despliegue

El proyecto está configurado para desplegarse tanto en **Vercel** como en **Netlify** sin ajustes adicionales:

### Vercel

El archivo **`vercel.json`** define las rewrites para SPA y todas las cabeceras de seguridad. Solo hay que conectar el repositorio en vercel.com y desplegar.

### Netlify

Los archivos **`public/_headers`** (cabeceras de seguridad y caché) y **`public/_redirects`** (rewrite SPA) se copian automáticamente al `dist/` durante el build. Solo hay que conectar el repositorio en netlify.com.

### Cabeceras de seguridad activas

- `Content-Security-Policy` permitiendo Google Maps embed
- `Strict-Transport-Security` (HSTS) con preload
- `X-Frame-Options: DENY` (anti-clickjacking)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` bloqueando cámara, micrófono, geolocalización, etc.
- `Cross-Origin-Opener-Policy: same-origin`
- `Cache-Control` de 1 año para imágenes y assets con hash

### Cambiar el dominio

El dominio actual está fijado como `https://www.veredasilvestre.mx`. Si se cambia hay que actualizarlo en:

- `index.html` (canonical, OG, Twitter, JSON-LD)
- `public/robots.txt`
- `public/sitemap.xml`
- `src/hooks/useSeo.js` (constante `SITE_URL`)

---

## Rutas del sitio

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/servicios` | Listado de servicios |
| `/servicios/:slug` | Detalle de cada servicio |
| `/nosotros` | Sobre el centro y su responsable |
| `/tarifas` | Precios de todos los servicios |
| `/contacto` | Formulario, WhatsApp, mapa |
| `/aviso-privacidad` | Aviso de Privacidad Integral (LFPDPPP) |
| `/cookies` | Política de cookies |

---

## Mejoras pendientes (opcional)

- **Convertir imágenes a WebP/AVIF** para reducir el peso total (~2.5 MB de ahorro estimado por Lighthouse).
- **Code splitting por rutas** con `React.lazy` + `Suspense` para reducir el JS inicial.
- **Lazy loading explícito** en imágenes below-the-fold y `fetchpriority="high"` en la imagen del hero.
- Migrar el correo `v.silvestre.info@gmail.com` a un dominio propio (`info@veredasilvestre.mx`) para mayor profesionalidad.

---

## Contacto del proyecto

- **Centro Canino Vereda Silvestre S.A.S. de C.V.**
- Jilotepec de Molina Enríquez, Estado de México
- WhatsApp: +52 1 55 6205 8871
- Email: v.silvestre.info@gmail.com
- Instagram: [@vereda_silvestre](https://www.instagram.com/vereda_silvestre/)
- Facebook: [Vereda Silvestre](https://www.facebook.com/people/Vereda-Silvestre/61565697153668/)
