/**
 * Inicia el flujo OAuth con GitHub para el panel /admin (Decap CMS).
 *
 * Decap abre este endpoint en una ventana popup al pulsar
 * "Login with GitHub". Aquí redirigimos a GitHub con los permisos
 * necesarios para leer y escribir en el repo.
 *
 * Variables de entorno requeridas en Vercel:
 *   · OAUTH_CLIENT_ID      → Client ID de la GitHub OAuth App
 *   · OAUTH_REDIRECT_URI   → (opcional) https://TU-DOMINIO/api/callback
 *                            Si no se define, se usa el host actual.
 *
 * Cómo crear la OAuth App (ver ADMIN-SETUP.md):
 *   GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
 *     · Homepage URL:           https://TU-DOMINIO
 *     · Authorization callback: https://TU-DOMINIO/api/callback
 */

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri =
    process.env.OAUTH_REDIRECT_URI ||
    `https://${req.headers.host}/api/callback`;

  if (!clientId) {
    res.status(500).send('Falta OAUTH_CLIENT_ID en las variables de entorno de Vercel.');
    return;
  }

  // `repo` da permiso de lectura+escritura al repo, lo mínimo que
  // necesita Decap para guardar los cambios.
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: cryptoRandom(),
  });

  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params}`,
  });
  res.end();
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
