# Panel de administración (/admin)

La web tiene un panel visual en **`https://TU-DOMINIO/admin/`** hecho con
[Decap CMS](https://decapcms.org/). Permite editar el contenido sin tocar
código: cada cambio que guardas se convierte en un commit de GitHub y Vercel
vuelve a publicar la web automáticamente (en 1–2 minutos).

> Por ahora el panel edita los **Datos del negocio** (contacto, redes,
> ubicación…). Las demás secciones (servicios, tienda, textos de la home) se
> añadirán como nuevas “colecciones” una vez confirmado que el login funciona.

---

## 1. Puesta en marcha (solo se hace una vez)

El login del panel usa GitHub. Hay que crear una "OAuth App" y darle sus claves
a Vercel.

### 1.1 Crear la GitHub OAuth App

1. Entra en GitHub → **Settings** → **Developer settings** →
   **OAuth Apps** → **New OAuth App**.
2. Rellena:
   - **Application name:** `Vereda Silvestre Admin` (lo que quieras)
   - **Homepage URL:** `https://vereda-silvestre.vercel.app`
   - **Authorization callback URL:** `https://vereda-silvestre.vercel.app/api/callback`
3. Pulsa **Register application**.
4. Copia el **Client ID**.
5. Pulsa **Generate a new client secret** y copia el **Client Secret**
   (solo se muestra una vez).

> ⚠️ Usa EXACTAMENTE tu dominio de producción. Si no estás seguro de cuál es,
> míralo en Vercel → tu proyecto → **Settings → Domains** (el marcado como
> *Production*). Si no es `vereda-silvestre.vercel.app`, usa el correcto tanto
> aquí como en `public/admin/config.yml` (campo `base_url`).

### 1.2 Añadir las claves en Vercel

En Vercel → tu proyecto → **Settings → Environment Variables**, añade:

| Name                  | Value                                  |
|-----------------------|----------------------------------------|
| `OAUTH_CLIENT_ID`     | el Client ID del paso anterior          |
| `OAUTH_CLIENT_SECRET` | el Client Secret del paso anterior      |

Déjalas para **Production** (y Preview si quieres probarlo en preview).
Después haz un **Redeploy** para que tomen efecto.

---

## 2. Cómo entrar a editar

1. Ve a `https://TU-DOMINIO/admin/`.
2. Pulsa **Login with GitHub** y autoriza.
3. Edita los campos y pulsa **Publish** (o **Save** + **Publish**).
4. Espera 1–2 minutos: Vercel republica y el cambio aparece en la web.

> Quien edite necesita una **cuenta de GitHub con permiso de escritura** en el
> repositorio `unaiurru/vereda-silvestre`. Para dar acceso a otra persona (p. ej.
> la dueña del negocio), invítala como colaboradora del repo en
> GitHub → repo → **Settings → Collaborators**.

---

## 3. Cuando migres a tu dominio propio

Cuando la web pase de `*.vercel.app` a tu dominio (p. ej. `veredasilvestre.com`):

1. En `public/admin/config.yml`, cambia `base_url` a `https://veredasilvestre.com`.
2. En la GitHub OAuth App (paso 1.1), actualiza **Homepage URL** y
   **Authorization callback URL** al nuevo dominio
   (`https://veredasilvestre.com/api/callback`).
3. Commit + push. Listo.

Las funciones `api/auth.js` y `api/callback.js` detectan el dominio solas, así
que no hay que tocarlas.

---

## 4. Archivos implicados (referencia técnica)

- `public/admin/index.html` — carga el panel Decap.
- `public/admin/config.yml` — qué se puede editar (colecciones) y a qué
  archivos JSON corresponde.
- `api/auth.js` y `api/callback.js` — login con GitHub (OAuth).
- `src/data/negocio.json` — los datos que edita la colección “Datos del negocio”.
- `vercel.json` — excluye `/admin` y `/api` del enrutado de la web y permite
  Decap/GitHub en la política de seguridad (CSP).
