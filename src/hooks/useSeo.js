import { useEffect } from 'react'

const SITE_NAME = 'Vereda Silvestre'
const SITE_URL = 'https://www.veredasilvestre.mx'
const DEFAULT_TITLE = 'Vereda Silvestre · Centro Canino en Jilotepec, Edo. de México'
const DEFAULT_DESCRIPTION =
  'Centro canino en Jilotepec, Estado de México. Pensión, paseos, excursiones y adiestramiento en entorno rural y seguro.'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Actualiza title, description, canonical y meta sociales según la ruta.
 * Uso: useSeo({ title: 'Servicios', description: '...', path: '/servicios' })
 */
export default function useSeo({ title, description, path = '' } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)

    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
  }, [title, description, path])
}
