import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Sprout, Users, Compass } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import { waLink } from '../data/negocio'

const AREAS = [
  'Apoyo en salidas',
  'Pensión',
  'Educador en formación',
  'Otro',
]

const PERFILES = [
  {
    icon: Compass,
    titulo: 'Apoyo en salidas',
    texto: 'Acompañamiento en paseos y salidas estructuradas, con manejo respetuoso y atención al grupo.',
  },
  {
    icon: Sprout,
    titulo: 'Pensión',
    texto: 'Cuidado diario en la pensión campestre: rutinas, descanso, manejo y bienestar de cada perro.',
  },
  {
    icon: Users,
    titulo: 'Educador en formación',
    texto: 'Formación interna en nuestro enfoque técnico y comunitario para construir criterio profesional.',
  },
]

export default function Unete() {
  useSeo({
    title: 'Únete a nuestro equipo',
    description:
      'Vereda Silvestre está en expansión. Buscamos personal de apoyo en salidas y pensión, y educadores en formación. Envíanos tu candidatura espontánea.',
    path: '/unete',
  })

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    area: AREAS[0],
    mensaje: '',
    sitio_web: '',
  })
  const [enviado, setEnviado] = useState(false)
  const [tiempoApertura] = useState(() => Date.now())

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Anti-bot 1: honeypot oculto.
    if (form.sitio_web) {
      setEnviado(true)
      setTimeout(() => setEnviado(false), 4000)
      return
    }
    // Anti-bot 2: tiempo mínimo de 2 s desde que se abrió el formulario.
    if (Date.now() - tiempoApertura < 2000) {
      setEnviado(true)
      setTimeout(() => setEnviado(false), 4000)
      return
    }

    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) return

    const msg =
      `Hola, quiero formar parte del equipo de Vereda Silvestre.\n` +
      `Nombre: ${form.nombre}\n` +
      `Email: ${form.email}\n` +
      (form.telefono ? `Teléfono: ${form.telefono}\n` : '') +
      `Área de interés: ${form.area}\n` +
      `Mensaje: ${form.mensaje}`

    window.open(waLink(msg), '_blank')
    setEnviado(true)
    setTimeout(() => setEnviado(false), 4000)
  }

  const inputClass =
    'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-[14px] text-stone-800 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:border-oliva transition-colors'

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-600 hover:text-oliva mb-5"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                Trabaja con nosotros
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-brand leading-[1.05] tracking-tight">
                Únete a nuestro equipo
              </h1>
              <p className="mt-5 text-stone-600 max-w-xl text-[15px] leading-relaxed">
                Vereda Silvestre está en expansión. Buscamos personas que compartan nuestra
                forma de entender el trabajo con perros: desde el respeto, la observación y la
                comunicación asertiva.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-crema aspect-[4/3]">
              <img
                src="/adiestradora-vaquera-perro-llanura.jpeg"
                alt="Entorno natural del centro canino Vereda Silvestre"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre el trabajo */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="space-y-4 text-[15px] md:text-[16px] text-stone-700 leading-relaxed">
            <p>
              Actualmente contamos con personal de apoyo en salidas estructuradas y pensión, y
              nos encontramos formando educadores bajo nuestro enfoque técnico y comunitario.
              No buscamos solo manos: buscamos personas con criterio, ganas de aprender y
              respeto por el perro y por las familias.
            </p>
            <p>
              Creemos en la formación interna. Acompañamos a quien se incorpora para que
              construya su propio criterio profesional, entienda el porqué de cada decisión y
              gane autonomía. Trabajar aquí es trabajar al aire libre, en equipo y con los
              perros como punto de partida, no como problema a resolver.
            </p>
            <p>
              Si esto te resuena, aunque ahora mismo no veas una vacante concreta, escríbenos.
              Guardamos las candidaturas espontáneas y te avisamos cuando encaje.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            {PERFILES.map((p) => (
              <div key={p.titulo} className="rounded-2xl border border-stone-200 bg-white p-6">
                <div className="w-10 h-10 rounded-full bg-oliva/10 text-oliva flex items-center justify-center mb-4">
                  <p.icon size={18} strokeWidth={1.7} />
                </div>
                <h3 className="font-serif text-lg text-brand mb-2">{p.titulo}</h3>
                <p className="text-[13.5px] text-stone-600 leading-relaxed">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo aplicar */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl border border-stone-200 bg-crema/60 p-7 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
              ¿Cómo aplicar?
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand leading-[1.1] mb-3">
              Cuéntanos sobre ti
            </h2>
            <p className="text-[14px] text-stone-600 leading-relaxed mb-8 max-w-xl">
              Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar.
              Así podemos seguir la conversación de la forma más ágil.
            </p>

            <form onSubmit={onSubmit} noValidate={false} className="space-y-5">
              {/* Honeypot anti-bot: oculto para personas, tentador para bots. */}
              <label className="hidden" aria-hidden="true">
                Sitio web
                <input
                  type="text"
                  name="sitio_web"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.sitio_web}
                  onChange={onChange}
                />
              </label>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nombre" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                    Nombre <span className="text-oliva">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.nombre}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                    Email <span className="text-oliva">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="telefono" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    value={form.telefono}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="Opcional"
                  />
                </div>
                <div>
                  <label htmlFor="area" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                    Área de interés
                  </label>
                  <select
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={onChange}
                    className={inputClass}
                  >
                    {AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-[13px] font-medium text-stone-700 mb-1.5">
                  Mensaje <span className="text-oliva">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={onChange}
                  className={inputClass + ' resize-y'}
                  placeholder="Cuéntanos sobre ti, tu experiencia con perros y por qué te interesa formar parte."
                />
              </div>

              <button
                type="submit"
                disabled={!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full px-7 py-3.5 text-[14px] font-medium bg-oliva text-crema-clara hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={15} />
                Enviar por WhatsApp
              </button>

              {enviado && (
                <div className="text-[13px] text-oliva">
                  ✓ Hemos abierto WhatsApp con tu mensaje. Si no se abrió, revisa tu navegador.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
