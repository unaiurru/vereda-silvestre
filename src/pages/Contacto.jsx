import { useState } from 'react'
import { MessageCircle, Mail, MapPin, Clock, Send, Phone } from 'lucide-react'

const WHATSAPP_NUMBER = '5215562058871'
const WHATSAPP_DISPLAY = '+52 1 55 6205 8871'
const EMAIL = 'v.silvestre.info@gmail.com'
const LOCATION_TEXT = 'Jilotepec de Molina Enríquez, Estado de México'

const MAPA_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.213254299979!2d-99.70211522417542!3d20.125148918198853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3b242f4b086b1%3A0x6fab260cda796163!2s54273%20San%20Ignacio%20de%20Loyola%2C%20M%C3%A9x.%2C%20M%C3%A9xico!5e0!3m2!1ses!2ses!4v1777375412486!5m2!1ses!2ses'

const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', telefono: '', mensaje: '', sitio_web: '' })
  const [enviado, setEnviado] = useState(false)
  // Tiempo en el que se montó el formulario (para detectar bots que lo rellenan al instante)
  const [tiempoApertura] = useState(() => Date.now())

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Anti-bot 1: honeypot. Si el campo oculto está relleno, es un bot.
    if (form.sitio_web) {
      setEnviado(true)
      setTimeout(() => setEnviado(false), 4000)
      return
    }

    // Anti-bot 2: tiempo mínimo de 2 segundos desde que se abrió el formulario.
    if (Date.now() - tiempoApertura < 2000) {
      setEnviado(true)
      setTimeout(() => setEnviado(false), 4000)
      return
    }

    if (!form.nombre.trim() || !form.mensaje.trim()) return

    const msg =
      `Hola, soy ${form.nombre}.` +
      (form.telefono ? ` Mi teléfono: ${form.telefono}.` : '') +
      ` ${form.mensaje}`

    window.open(waLink(msg), '_blank')
    setEnviado(true)
    setTimeout(() => setEnviado(false), 4000)
  }

  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
            Contacto
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#2E3720] leading-[1.05] tracking-tight">
            Hablemos de tu perro.
          </h1>
          <p className="mt-5 text-stone-600 max-w-2xl text-[15px] leading-relaxed">
            La forma más rápida de contactarnos es por WhatsApp. Si lo prefieres, llámanos,
            envíanos un email o utiliza el formulario y te respondemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Tarjetas de contacto directo */}
      <section className="py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {/* WhatsApp */}
            <a
              href={waLink('Hola, me gustaría información sobre Vereda Silvestre.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-[#3F4A2A] text-[#FAF6EC] p-7 hover:bg-[#2E3720] transition-colors flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FAF6EC]/10 flex items-center justify-center mb-5">
                <MessageCircle size={20} strokeWidth={1.7} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458] mb-1">
                WhatsApp · más rápido
              </div>
              <div className="font-serif text-xl mb-1">{WHATSAPP_DISPLAY}</div>
              <p className="text-[13px] text-[#FAF6EC]/75 mt-2 leading-relaxed flex-1">
                Te respondemos en horario laboral. Cuéntanos lo que necesites.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium">
                Abrir WhatsApp →
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group rounded-2xl border border-stone-200 bg-white p-7 hover:border-[#3F4A2A]/40 transition-colors flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-[#3F4A2A]/8 text-[#3F4A2A] flex items-center justify-center mb-5">
                <Mail size={20} strokeWidth={1.7} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-1">
                Email
              </div>
              <div className="font-serif text-base text-[#2E3720] mb-1 break-all">{EMAIL}</div>
              <p className="text-[13px] text-stone-600 mt-2 leading-relaxed flex-1">
                Para consultas más detalladas o documentación.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3F4A2A]">
                Escribir un email →
              </div>
            </a>

            {/* Ubicación */}
            <div className="rounded-2xl border border-stone-200 bg-white p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#3F4A2A]/8 text-[#3F4A2A] flex items-center justify-center mb-5">
                <MapPin size={20} strokeWidth={1.7} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-1">
                Ubicación
              </div>
              <div className="font-serif text-base text-[#2E3720] leading-tight mb-1">
                Jilotepec de Molina Enríquez
              </div>
              <div className="text-[13px] text-stone-500">Estado de México</div>
              <p className="text-[13px] text-stone-600 mt-3 leading-relaxed flex-1">
                Te compartimos la dirección exacta al confirmar tu visita o reserva.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[13px] text-stone-500">
                <Clock size={14} />
                <span>Lun–Sáb · 9:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa + Formulario */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Mapa */}
            <div className="lg:col-span-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
                Cómo llegar
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#2E3720] leading-tight mb-5">
                {LOCATION_TEXT}
              </h2>
              <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-[4/3]">
                <iframe
                  title="Ubicación Vereda Silvestre"
                  src={MAPA_EMBED_SRC}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-[13px] text-stone-500 leading-relaxed">
                Por privacidad y seguridad, compartimos la ubicación exacta del centro al confirmar
                la visita o la reserva por WhatsApp.
              </p>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
                Formulario
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#2E3720] leading-tight mb-5">
                Envíanos un mensaje
              </h2>
              <form onSubmit={onSubmit} className="rounded-2xl border border-stone-200 bg-white p-7">
                <p className="text-[13px] text-stone-500 mb-6 leading-relaxed">
                  Al enviar, abriremos WhatsApp con tu mensaje listo. No almacenamos
                  tu información en este sitio.
                </p>

                <div className="space-y-5">
                  <label className="block">
                    <span className="text-[12px] uppercase tracking-wider text-stone-500">
                      Tu nombre *
                    </span>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={onChange}
                      required
                      className="mt-2 w-full bg-transparent border-b border-stone-300 focus:border-[#3F4A2A] py-2.5 text-[15px] outline-none transition-colors"
                      placeholder="María García"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[12px] uppercase tracking-wider text-stone-500">
                      Teléfono (opcional)
                    </span>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={onChange}
                      className="mt-2 w-full bg-transparent border-b border-stone-300 focus:border-[#3F4A2A] py-2.5 text-[15px] outline-none transition-colors"
                      placeholder="55 1234 5678"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[12px] uppercase tracking-wider text-stone-500">
                      ¿En qué te podemos ayudar? *
                    </span>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={onChange}
                      rows={4}
                      required
                      className="mt-2 w-full bg-transparent border-b border-stone-300 focus:border-[#3F4A2A] py-2.5 text-[15px] outline-none resize-none transition-colors"
                      placeholder="Cuéntanos sobre tu perro y qué servicio te interesa…"
                    />
                  </label>

                  {/* Honeypot anti-bot - invisible para humanos, los bots lo rellenan */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label>
                      No rellenes este campo si eres humano:
                      <input
                        type="text"
                        name="sitio_web"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.sitio_web}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!form.nombre.trim() || !form.mensaje.trim()}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium bg-[#3F4A2A] text-[#FAF6EC] hover:bg-[#2E3720] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                  Enviar por WhatsApp
                </button>

                {enviado && (
                  <div className="mt-4 text-[13px] text-[#3F4A2A]">
                    ✓ Hemos abierto WhatsApp con tu mensaje. Si no se abrió, revisa tu navegador.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Banda inferior con teléfono grande */}
      <section className="py-14 md:py-16 border-t border-stone-200 bg-[#F5EFDF]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Phone size={28} className="mx-auto text-[#3F4A2A] mb-4" strokeWidth={1.5} />
          <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-2">
            ¿Prefieres llamar?
          </div>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="font-serif text-3xl md:text-4xl text-[#2E3720] hover:text-[#3F4A2A] transition-colors"
          >
            {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-4 text-[14px] text-stone-600">
            Atención de lunes a sábado, de 9:00 a 19:00.
          </p>
        </div>
      </section>
    </div>
  )
}