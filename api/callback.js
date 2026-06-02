/**
 * Recibe el callback de GitHub tras la autorización OAuth y devuelve
 * el access token a Decap CMS (panel /admin).
 *
 * Variables de entorno requeridas en Vercel:
 *   · OAUTH_CLIENT_ID      → Client ID de la GitHub OAuth App
 *   · OAUTH_CLIENT_SECRET  → Client Secret de la misma App
 */

export default async function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = req.query.code;

  if (!clientId || !clientSecret) {
    return res
      .status(500)
      .send('Faltan OAUTH_CLIENT_ID o OAUTH_CLIENT_SECRET en Vercel.');
  }
  if (!code) {
    return res.status(400).send('Falta el parámetro `code` de GitHub.');
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      return renderError(res, data.error_description || data.error || 'Error desconocido');
    }

    return renderSuccess(res, data.access_token);
  } catch (err) {
    return renderError(res, err.message);
  }
}

/**
 * Devuelve HTML que comunica el éxito a Decap CMS via postMessage.
 * Handshake: el popup envía "authorizing:github" hasta que el opener
 * (el panel) responde; entonces enviamos el token y cerramos.
 */
function renderSuccess(res, token) {
  const payload = JSON.stringify({ token, provider: 'github' });
  const safePayload = payload
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/</g, '\\u003c');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Autenticando…</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 480px;
      margin: 4rem auto;
      padding: 0 1rem;
      text-align: center;
      color: #2E3720;
    }
    .spinner {
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 3px solid #e6dfd2;
      border-top-color: #3F4A2A;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ok { color: #3F4A2A; }
    button { padding: 0.5rem 1rem; margin-top: 1rem; cursor: pointer; }
  </style>
</head>
<body>
  <div class="spinner" id="spinner"></div>
  <p id="status">Autenticación correcta. Volviendo al panel…</p>
  <p id="manual" style="display:none">
    <small>Si esta ventana no se cierra automáticamente, ya puedes cerrarla.<br>
    El panel de admin se ha actualizado en la otra pestaña.</small>
    <br><button onclick="window.close()">Cerrar ventana</button>
  </p>

<script>
(function() {
  var PAYLOAD = 'authorization:github:success:${safePayload}';
  var HANDSHAKE = 'authorizing:github';
  var sent = false;
  var attempts = 0;

  function postOpener(msg) {
    try {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(msg, '*');
        return true;
      }
    } catch (e) {}
    return false;
  }

  function onMessage(e) {
    if (sent) return;
    if (e && e.data && typeof e.data === 'string' && e.data.indexOf(HANDSHAKE) === 0) {
      sent = true;
      postOpener(PAYLOAD);
      window.removeEventListener('message', onMessage);
      finish();
    }
  }

  function finish() {
    var statusEl = document.getElementById('status');
    var spinner = document.getElementById('spinner');
    if (statusEl) statusEl.className = 'ok';
    if (statusEl) statusEl.textContent = '✓ Listo. Cerrando…';
    if (spinner) spinner.style.display = 'none';
    setTimeout(function(){
      try { window.close(); } catch (e) {}
      setTimeout(function(){
        var manual = document.getElementById('manual');
        if (manual) manual.style.display = 'block';
      }, 600);
    }, 400);
  }

  window.addEventListener('message', onMessage, false);

  if (!window.opener) {
    document.getElementById('status').textContent =
      'No se pudo comunicar con el panel. Cierra esta ventana e inténtalo otra vez.';
    document.getElementById('spinner').style.display = 'none';
    return;
  }

  function tryHandshake() {
    if (sent) return;
    attempts++;
    postOpener(HANDSHAKE);
    if (attempts < 30) {
      setTimeout(tryHandshake, 500);
    } else {
      var statusEl = document.getElementById('status');
      if (statusEl) statusEl.textContent =
        'No se ha podido completar el login. Cierra esta ventana e inténtalo de nuevo.';
      document.getElementById('spinner').style.display = 'none';
    }
  }
  tryHandshake();
})();
</script>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}

function renderError(res, message) {
  const safeMsg = String(message)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Error de autenticación</title></head>
<body style="font-family:sans-serif;text-align:center;padding:2rem;color:#b04a3a;">
<h1>Error de autenticación</h1>
<p>${safeMsg}</p>
<p><button onclick="window.close()">Cerrar ventana</button></p>
<script>
  if (window.opener) {
    window.opener.postMessage('authorization:github:error:${JSON.stringify(message).slice(1, -1)}', '*');
  }
</script>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(400).send(html);
}
