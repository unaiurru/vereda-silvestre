import useSeo from '../hooks/useSeo'
import PaginaLegal from '../components/PaginaLegal'
import data from '../data/cookies.json'

export default function Cookies() {
  useSeo({
    title: 'Política de Cookies',
    description:
      'Política de cookies de Vereda Silvestre. Solo utilizamos cookies técnicas estrictamente necesarias para el funcionamiento del sitio.',
    path: '/cookies',
  })

  return <PaginaLegal data={data} />
}
