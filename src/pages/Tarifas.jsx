import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Info } from 'lucide-react'
import useSeo from '../hooks/useSeo'

const WHATSAPP_URL = 'https://wa.me/5215562058871?text=' + encodeURIComponent('Hola, me gustaría información sobre las tarifas de Vereda Silvestre.')

const bloques = [
  {
    titulo: 'Pensión campestre',
    nota: 'Precio por día. Transporte a domicilio incluido en zona Jilotepec.',
    items: [
      { concepto: 'Perro pequeño', precio: '400 MXN', unidad: '/ día', slug: 'pension-perro-pequeno' },
      { concepto: 'Perro mediano', precio: '500 MXN', unidad: '/ día', slug: 'pension-perro-mediano' },
      { concepto: 'Perro grande',  precio: '600 MXN', unidad: '/ día', slug: 'pension-perro-grande' },
    ],
  },
  {
    titulo: 'Adiestramiento',
    nota: 'Sesiones individuales o clases grupales. Comunicación clara y manejo respetuoso.',
    items: [
      { concepto: 'Clase grupal',                    precio: '50 MXN',  unidad: '/ clase', slug: 'clase-grupal' },
      { concepto: 'Sesión individual de obediencia', precio: '150 MXN', unidad: '/ hora',  slug: 'adiestramiento-obediencia' },
      { concepto: 'Sesión individual de agility',    precio: '150 MXN', unidad: '/ hora',  slug: 'adiestramiento-agility' },
    ],
  },
  {
    titulo: 'Paseos',
    nota: 'Paseos guiados con manejo respetuoso. Consulta disponibilidad por zona.',
    items: [
      { concepto: 'Paseo de 30 minutos', precio: '50 MXN',  unidad: '', slug: 'paseo-30-minutos' },
      { concepto: 'Paseo de 1 hora',     precio: '100 MXN', unidad: '', slug: 'paseo-1-hora' },
    ],
  },
  {
    titulo: 'Excursiones',
    nota: 'Salidas en grupo reducido al campo. Rutas adaptadas al grupo.',
    items: [
      { concepto: 'Perro pequeño',          precio: '300 MXN', unidad: '/ excursión', slug: 'excursion-perro-pequeno' },
      { concepto: 'Perro mediano o grande', precio: '350 MXN', unidad: '/ excursión', slug: 'excursion-perro-mediano-grande' },
    ],
  },
]

function FilaTarifa({ item }) {
  const contenido = (
    <>
      <div className="flex items-center gap-2 text-[15px] text-stone-800">
        <span>{item.concepto}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="font-serif text-[18px] md:text-[20px] text-[#3F4A2A] whitespace-nowrap">
          {item.precio}
          {item.unidad && (
            <span className="text-[12px] text-stone-600 font-sans ml-1.5">{item.unidad}</span>
          )}
        </div>
        {item.slug && (
          <ArrowRight
            size={15}
            className="text-stone-300 group-hover:text-[#3F4A2A] group-hover:translate-x-0.5 transition-all"
          />
        )}
      </div>
    </>
  )

  if (item.slug) {
    return (
      <Link
        to={'/servicios/' + item.slug}
        className="group flex items-center justify-between gap-4 px-6 md:px-8 py-5 hover:bg-[#FAF6EC] transition-colors"
      >
        {contenido}
      </Link>
    )
  }
  return (
    <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5">
      {contenido}
    </div>
  )
}

export default function Tarifas() {
  useSeo({
    title: 'Tarifas',
    description:
      'Tarifas claras y transparentes de pensión, adiestramiento, paseos y excursiones caninas en Jilotepec, Estado de México. Sin sorpresas.',
    path: '/tarifas',
  })

  return (
    <div>
      <section className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            Tarifas
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#2E3720] leading-[1.05] tracking-tight">
            Precios claros, sin sorpresas.
          </h1>
          <p className="mt-5 text-stone-600 max-w-2xl text-[15px] leading-relaxed">
            Estos son nuestros precios orientativos. Cualquier servicio combinado o necesidad
            específica la ajustamos contigo por WhatsApp para que pagues solo lo que necesitas.
          </p>
          <p className="mt-3 text-[13px] text-stone-600">
            Pulsa cualquier servicio para ver su descripción completa.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="space-y-12">
            {bloques.map((b) => (
              <div key={b.titulo}>
                <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
                  <h2 className="font-serif text-2xl md:text-3xl text-[#2E3720]">{b.titulo}</h2>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                  <div className="divide-y divide-stone-200">
                    {b.items.map((it, idx) => (
                      <FilaTarifa key={idx} item={it} />
                    ))}
                  </div>
                </div>

                {b.nota && (
                  <div className="mt-3 flex items-start gap-2 text-[12.5px] text-stone-600 leading-relaxed">
                    <Info size={13} className="mt-0.5 shrink-0" />
                    <span>{b.nota}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-[#F5EFDF] border border-[#3F4A2A]/10 p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-2">
              Información importante
            </div>
            <ul className="space-y-2 text-[14px] text-stone-700 leading-relaxed">
              <li>• Los precios pueden variar según la zona, la duración total del servicio o necesidades especiales.</li>
              <li>• Para reservas de pensión recomendamos contactar con antelación, sobre todo en periodos vacacionales.</li>
              <li>• Aceptamos pago en efectivo y transferencia. Confirma la modalidad por WhatsApp al reservar.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2E3720] leading-tight">
            ¿Tienes dudas sobre qué servicio te conviene?
          </h2>
          <p className="mt-4 text-stone-600 max-w-xl mx-auto text-[15px]">
            Cuéntanos cómo es tu perro y qué necesitas. Te ayudamos a encontrar la mejor opción
            sin compromiso.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#3F4A2A] text-[#FAF6EC] px-7 py-3.5 text-[14px] font-medium hover:bg-[#2E3720] transition-colors"
            >
              <MessageCircle size={16} />
              Pregunta por WhatsApp
            </a>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 rounded-full border border-[#3F4A2A]/25 text-[#3