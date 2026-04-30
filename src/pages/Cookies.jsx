import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useSeo from '../hooks/useSeo'

export default function Cookies() {
  useSeo({
    title: 'Política de Cookies',
    description:
      'Política de cookies de Vereda Silvestre. Solo utilizamos cookies técnicas estrictamente necesarias para el funcionamiento del sitio.',
    path: '/cookies',
  })

  return (
    <div>
      <section className="border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-600 hover:text-[#3F4A2A] mb-5"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            Información legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2E3720] leading-[1.1] tracking-tight">
            Política de cookies
          </h1>
          <p className="mt-4 text-[13px] text-stone-600">
            Última actualización: abril de 2026
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="max-w-3xl mx-auto px-5 md:px-8">
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Esta página explica el uso que hacemos de cookies y tecnologías similares
            en el sitio web de Centro Canino Vereda Silvestre S.A.S. de C.V.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            ¿Qué son las cookies?
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Las cookies son pequeños archivos que un sitio web guarda en tu navegador
            para recordar información sobre tu visita. Sirven para que la web funcione
            correctamente, recordar preferencias o entender cómo se usa el sitio.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            ¿Qué cookies utiliza esta web?
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed mb-4">
            Esta web utiliza únicamente cookies <strong>técnicas y necesarias</strong>
            para su correcto funcionamiento. No utiliza cookies de seguimiento,
            publicidad ni análisis de comportamiento.
          </p>

          <div className="rounded-2xl border border-stone-200 overflow-hidden mt-5">
            <table className="w-full text-[14px]">
              <thead className="bg-[#FAF6EC] text-stone-700">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Cookie</th>
                  <th className="text-left px-5 py-3 font-medium">Finalidad</th>
                  <th className="text-left px-5 py-3 font-medium">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white text-stone-700">
                <tr>
                  <td className="px-5 py-3 font-mono text-[12.5px]">vs_cookies_aceptadas</td>
                  <td className="px-5 py-3">Recordar que has aceptado el aviso de cookies para no volver a mostrarlo.</td>
                  <td className="px-5 py-3 whitespace-nowrap">1 año</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            Mapa de Google
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            En la página de contacto incrustamos un mapa de Google Maps. Al cargarlo,
            Google puede instalar cookies propias. Puedes consultar la política de
            privacidad de Google en{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3F4A2A] underline underline-offset-2"
            >
              policies.google.com/privacy
            </a>.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            Cómo gestionar las cookies
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Puedes borrar o bloquear las cookies desde la configuración de tu
            navegador. Si las desactivas, algunas funciones del sitio pueden
            dejar de funcionar correctamente.
          </p>

          <div className="mt-12 p-5 rounded-2xl bg-[#F5EFDF] border border-[#3F4A2A]/10 text-[13px] text-stone-600 leading-relaxed">
            Para más información, consulta nuestro{' '}
            <Link to="/aviso-privacidad" className="text-[#3F4A2A] underline">
              aviso de privacidad
          