import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Info } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import { waLink } from '../data/negocio'

const WHATSAPP_URL = waLink('Hola, me gustaría información sobre las tarifas de Vereda Silvestre.')

const bloques = [
  {
    titulo: 'Pensión',
    nota: 'Precio por día. Transporte a domicilio incluido en zona Jilotepec.',
    items: [
      { concepto: 'Perro pequeño', precio: '400 MXN', unidad: '/ día', slug: 'pension-perro-pequeno' },
      { concepto: 'Perro mediano', precio: '500 MXN', unidad: '/ día', slug: 'pension-perro-mediano' },
      { concepto: 'Perro grande',  precio: '600 MXN', unidad: '/ día', slug: 'pension-perro-grande' },
      { concepto: 'Pensión Campestre', precio: '500 MXN', unidad: '/ día', slug: 'pension-campestre' },
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
  {
    titulo: 'Programas',
    nota: 'Programas por convocatoria. La edición actual está finalizada; escríbenos y te avisamos de la próxima.',
    items: [
      { concepto: 'Cachorro', precio: '1500 MXN', unidad: '', slug: 'cachorro', etiqueta: 'Finalizado' },
      { concepto: 'Educación canina familiar', precio: '2500 MXN', unidad: '', slug: 'educacion-canina-familiar', etiqueta: 'Finalizado' },
    ],
  },
  {
    titulo: 'Sesiones',
    nota: 'Trabajo de enriquecimiento y olfato en entorno natural, adaptado a cada perro.',
    items: [
      { concepto: 'Activación natural', precio: '350 MXN', unidad: '/ sesión', slug: 'activacion-natural' },
    ],
  },
  {
    titulo: 'Formación',
    nota: 'Seminarios para tutores y profesionales. Consulta fechas y plazas disponibles.',
    items: [
      { concepto: 'Seminarios formativos', precio: '3500 MXN', unidad: '', slug: 'seminarios-formativos' },
    ],
  },
]

function FilaTarifa({ item }) {
  const contenido = (
    <>
      <div className="flex items-center gap-2 text-[15px] text-stone-800">
        <span>{item.concepto}</span>
        {item.etiqueta && (
          <span className="bg-stone-700 text-crema-clara px-2 py-0.5 text-[10px] uppercase tracking-wide rounded">
            {item.etiqueta}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="font-serif text-[18px] md:text-[20px] text-oliva whitespace-nowrap">
          {item.precio}
          {item.unidad && (
            <span className="text-[12px] text-stone-600 font-sans ml-1.5">{item.unidad}</span>
          )}
        </div>
        {item.slug && (
          <ArrowRight
            size={15}
            className="text-stone-300 group-hover:text-oliva group-hover:translate-x-0.5 transition-all"
          />
        )}
      </div>
    </>
  )

  if (item.slug) {
    return (
      <Link
        to={'/servicios/' + item.slug}
        className="group flex items-center justify-between gap-4 px-6 md:px-8 py-5 hover:bg-crema-clara transition-colors"
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
      'Tarifas de pensión, adiestramiento, paseos, excursiones, programas, activación natural y seminarios en Jilotepec, Estado de México. Sin sorpresas.',
    path: '/tarifas',
  })

  return (
    <div>
      <section className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            Tarifas
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-brand leading-[1.05] tracking-tight">
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
                  <h2 className="font-serif text-2xl md:text-3xl text-brand">{b.titulo}</h2>
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

          <div className="mt-14 rounded-2xl bg-crema border border-oliva/10 p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-2">
              Información importante
            </div>
            <ul className="space-y-2 text-[14px] text-stone-700 leading-relaxed">
              <li>• Los precios pueden variar según la zona, la duración total del servicio o necesidades especiales.</li>
              <li>• Para reservas de pensión recomendamos contactar con antelación, sobre todo en periodos vacacionales.</li>
              <li>• Aceptamos pago en efectivo y transferencia. Confirma la modalidad por WhatsApp al reservar.</li>
              <li>• ¿Buscas material para tu perro? Visita nuestra <Link to="/tienda" className="text-oliva underline underline-offset-2">tienda</Link>.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand leading-tight">
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
              className="inline-flex items-center gap-2 rounded-full bg-oliva text-crema-clara px-7 py-3.5 text-[14px] font-medium hover:bg-brand transition-colors"
            >
              <MessageCircle size={16} />
              Pregunta por WhatsApp
            </a>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 rounded-full border border-oliva/25 text-oliva px-7 py-3.5 text-[14px] font-medium hover:bg-oliva/5 transition-colors"
            >
              Ver servicios
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
