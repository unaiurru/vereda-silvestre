import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { negocio } from '../data/negocio'

// Renderiza texto con marcas sencillas:
//   **negrita**      -> <strong>
//   {email}          -> enlace al email del negocio
//   [texto](url)     -> enlace (interno si empieza por "/", externo si no)
function renderTexto(texto, keyBase) {
  const conEmail = String(texto).split('{email}').join(`[${negocio.email}](mailto:${negocio.email})`)
  const nodes = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let m
  let i = 0
  while ((m = regex.exec(conEmail)) !== null) {
    if (m.index > last) nodes.push(conEmail.slice(last, m.index))
    if (m[1] !== undefined) {
      const txt = m[1]
      const url = m[2]
      if (url.startsWith('/')) {
        nodes.push(
          <Link key={`${keyBase}-l${i}`} to={url} className="text-oliva underline underline-offset-2">
            {txt}
          </Link>
        )
      } else {
        const externo = url.startsWith('http')
        nodes.push(
          <a
            key={`${keyBase}-l${i}`}
            href={url}
            {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-oliva underline underline-offset-2"
          >
            {txt}
          </a>
        )
      }
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={`${keyBase}-b${i}`}>{m[3]}</strong>)
    }
    last = regex.lastIndex
    i++
  }
  if (last < conEmail.length) nodes.push(conEmail.slice(last))
  return nodes
}

const TABLA_COOKIES_ENCABEZADOS = ['Cookie', 'Finalidad', 'Duración']

export default function PaginaLegal({ data }) {
  return (
    <div>
      <section className="border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-600 hover:text-oliva mb-5"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            {data.epigrafe}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-brand leading-[1.1] tracking-tight">
            {data.titulo}
          </h1>
          {data.actualizacion && (
            <p className="mt-4 text-[13px] text-stone-600">{data.actualizacion}</p>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="max-w-3xl mx-auto px-5 md:px-8">
          {data.intro && (
            <p className="text-[15px] text-stone-700 leading-relaxed">
              {renderTexto(data.intro, 'intro')}
            </p>
          )}

          {(data.secciones || []).map((s, si) => (
            <div key={si}>
              <h2 className="font-serif text-2xl text-brand mt-10 mb-3">{s.titulo}</h2>

              {(s.parrafos || []).map((p, pi) => (
                <p key={pi} className="text-[15px] text-stone-700 leading-relaxed mt-3 first:mt-0">
                  {renderTexto(p, `${si}-${pi}`)}
                </p>
              ))}

              {s.lista && s.lista.length > 0 && (
                <ul className="text-[15px] text-stone-700 leading-relaxed list-disc pl-6 space-y-1.5 mt-3">
                  {s.lista.map((li, lii) => (
                    <li key={lii}>{renderTexto(li, `${si}-li${lii}`)}</li>
                  ))}
                </ul>
              )}

              {(s.parrafosFinal || []).map((p, pi) => (
                <p key={`f${pi}`} className="text-[15px] text-stone-700 leading-relaxed mt-3">
                  {renderTexto(p, `${si}-f${pi}`)}
                </p>
              ))}

              {s.tablaCookies && s.tablaCookies.length > 0 && (
                <div className="rounded-2xl border border-stone-200 overflow-hidden mt-5">
                  <table className="w-full text-[14px]">
                    <thead className="bg-crema-clara text-stone-700">
                      <tr>
                        {TABLA_COOKIES_ENCABEZADOS.map((h) => (
                          <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white text-stone-700">
                      {s.tablaCookies.map((row, ri) => (
                        <tr key={ri}>
                          <td className="px-5 py-3 font-mono text-[12.5px]">{row.nombre}</td>
                          <td className="px-5 py-3">{row.finalidad}</td>
                          <td className="px-5 py-3 whitespace-nowrap">{row.duracion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {data.cierre && (
            <div className="mt-12 p-5 rounded-2xl bg-crema border border-oliva/10 text-[13px] text-stone-600 leading-relaxed">
              {renderTexto(data.cierre, 'cierre')}
            </div>
          )}
        </article>
      </section>
    </div>
  )
}
