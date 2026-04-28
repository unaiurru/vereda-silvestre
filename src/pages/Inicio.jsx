import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Heart, Mountain, PawPrint, Sparkles } from 'lucide-react'
import CarruselAuto from '../components/CarruselAuto'

const WHATSAPP_URL = 'https://wa.me/5215562058871?text=' + encodeURIComponent('Hola, me gustaría reservar un servicio en Vereda Silvestre.')

const beneficios = [
  { icon: Heart, title: 'Atención personalizada', text: 'Cada perro es único. Conocemos su historia y carácter.' },
  { icon: Mountain, title: 'Entorno natural', text: 'Espacios abiertos en pleno campo. El mejor lugar para descansar.' },
  { icon: PawPrint, title: 'Educación respetuosa', text: 'Comunicación clara, sin coerción. Acompañamos sin imponer.' },
  { icon: Sparkles, title: 'Bienestar integral', text: 'Cuerpo, mente y entorno en equilibrio durante toda la estancia.' },
]

const serviciosDestacados = [
  {
    titulo: 'Pensión campestre',
    desc: 'Estancia diaria con paseos, descanso y supervisión profesional. Adaptada a cada tamaño.',
    link: '/servicios',
    imgs: ['/pension-pequeno-1.jpg', '/mediano-1.jpg', '/perro-atardecer.jpg'],
  },
  {
    titulo: 'Adiestramiento',
    desc: 'Sesiones individuales (agility u obediencia) y clases grupales. Manejo respetuoso.',
    link: '/servicios',
    imgs: ['/adiestramiento-obediencia-1.jpg', '/adiestramiento-1.jpg', '/clase-grupal-1.jpg'],
  },
  {
    titulo: 'Paseos y excursiones',
    desc: 'Salidas al campo con manejo respetuoso y rutas adaptadas a cada perro.',
    link: '/servicios',
    imgs: ['/paseo-1h-1.jpg', '/paseo-30min-1.jpg', '/excursion-grande-1.jpg'],
  },
]

export default function Inicio() {
  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-6">
                <span className="h-1 w-6 bg-[#3F4A2A]" />
                Jilotepec, Edo. de México
              </div>
              <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight text-[#2E3720]">
                Cuidado, educación y bienestar canino en un entorno natural.
              </h1>
              <p className="mt-6 text-[16px] md:text-[17px] text-stone-600 leading-relaxed max-w-lg">
                Acompañamos a perros y a sus familias desde el respeto y la comunicación asertiva.
                Pensión, adiestramiento, paseos y excursiones en pleno campo.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#3F4A2A] text-[#FAF6EC] px-6 py-3.5 text-[14px] font-medium hover:bg-[#2E3720] transition-colors"
                >
                  <MessageCircle size={16} />
                  Reservar por WhatsApp
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 rounded-full border border-[#3F4A2A]/25 text-[#3F4A2A] px-6 py-3.5 text-[14px] font-medium hover:bg-[#3F4A2A]/5 transition-colors"
                >
                  Ver servicios
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 shadow-xl shadow-stone-900/10">
                <img
                  src="/dos-perros-campo.jpg"
                  alt="Perros en el campo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="border-t border-stone-200 bg-white/40">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((b) => (
              <div key={b.title}>
                <div className="w-10 h-10 rounded-full bg-[#3F4A2A]/10 text-[#3F4A2A] flex items-center justify-center mb-4">
                  <b.icon size={18} strokeWidth={1.7} />
                </div>
                <h3 className="font-serif text-lg text-[#2E3720] mb-2">{b.title}</h3>
                <p className="text-[13.5px] text-stone-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">Servicios</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2E3720] leading-[1.1]">
              Todo lo que tu perro necesita.
            </h2>
            <p className="mt-4 text-stone-600">
              Pensión, adiestramiento, paseos y excursiones. Cada servicio se adapta al perro, no al revés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {serviciosDestacados.map((s) => (
              <Link
                key={s.titulo}
                to={s.link}
                className="group rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-[#3F4A2A]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <CarruselAuto images={s.imgs} alt={s.titulo} intervalMs={3500} />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-xl text-[#2E3720] mb-3">{s.titulo}</h3>
                  <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">{s.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3F4A2A]">
                    Saber más
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#3F4A2A] hover:text-[#2E3720]"
            >
              Ver todos los servicios
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* QUIENES SOMOS - INTRO */}
      <section className="py-20 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-[#F5EFDF] max-w-md mx-auto">
                <img
                  src="/duenia.jpg"
                  alt="Vereda Silvestre"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
                Quiénes somos
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2E3720] leading-[1.1] mb-6">
                Una vereda que recorremos contigo y con tu perro.
              </h2>
              <div className="space-y-4 text-[15px] text-stone-700 leading-relaxed">
                <p>
                  Vereda Silvestre nace de la necesidad de hacer las cosas de otra manera.
                  Después de años acompañando a familias y a sus perros, nos dimos cuenta de
                  algo simple: el perro no es un proyecto que corregir, es un compañero que
                  comprender.
                </p>
                <p>
                  Trabajamos desde la observación del comportamiento, el manejo respetuoso y
                  la comunicación asertiva. Sin atajos, sin métodos coercitivos, sin recetas
                  mágicas. Cada perro tiene su historia, su carácter y su ritmo, y ese es el
                  punto de partida real.
                </p>
              </div>
              <Link
                to="/nosotros"
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-[#3F4A2A] hover:text-[#2E3720]"
              >
                Conócenos mejor
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl bg-[#3F4A2A] text-[#FAF6EC] p-10 md:p-14 text-center">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Hablemos de tu perro.
            </h2>
            <p className="mt-3 text-[#FAF6EC]/75 max-w-xl mx-auto">
              Cuéntanos cómo es y qué necesita. Te respondemos por WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FAF6EC] text-[#2E3720] px-7 py-3.5 text-[14px] font-medium hover:bg-white transition-colors"
            >
              <MessageCircle size={16} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}