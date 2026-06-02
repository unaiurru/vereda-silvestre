import useSeo from '../hooks/useSeo'
import PaginaLegal from '../components/PaginaLegal'
import data from '../data/aviso-privacidad.json'

export default function AvisoPrivacidad() {
  useSeo({
    title: 'Aviso de Privacidad',
    description:
      'Aviso de Privacidad Integral de Centro Canino Vereda Silvestre S.A.S. de C.V., conforme a la LFPDPPP y los lineamientos del INAI.',
    path: '/aviso-privacidad',
  })

  return <PaginaLegal data={data} />
}
