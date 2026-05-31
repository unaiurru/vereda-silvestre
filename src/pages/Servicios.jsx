import { Link } from 'react-router-dom'
import { ArrowRight, ImageOff, MessageCircle } from 'lucide-react'
import { servicios, whatsappLinkServicio } from '../data/servicios'
import useSeo from '../hooks/useSeo'

export default function Servicios() {
  useSeo({
    title: 'Servicios',
    description:
      'Programas formativos, sesiones de activación natural, pensión campestre y seminarios para perros y tutores en Jilotepec, Estado de México.',
    path: '/servicios',
  })

  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            Nuestros servicios
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#2E3720] leading-[1.05] tracking-tight">
            Cada perro tiene lo que necesita.
          </h1>
          <p className="mt-5 text-stone-600 max-w-xl text-[15px] leading-relaxed">
            Programas, sesiones de activación natural, pensión campestre y formación.
            Elige el servicio que mejor encaje con tu perro o escríbenos y te ayudamos a decidir.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((s) => {
              const finalizado = s.estado === 'finalizado'
              return (
                <article
                  key={s.slug}
                  className="group relative rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-[#3F4A2A]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Badge "Finalizado" */}
                  {finalizado && (
                    <span className="absolute top-3 left-3 z-10 bg-stone-700 text-[#FAF6EC] px-3 py-1 text-xs uppercase tracking-wide rounded">
                      Finalizado
                    </span>
                  )}

                  <div className="aspect-[4/3] overflow-hidden bg-[#F5EFDF] flex items-center justify-center">
                    {s.portada ? (
                      <img
                        src={s.portada}
                        alt={s.titulo}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-stone-400 flex flex-col items-center gap-2">
                        <ImageOff size={28} strokeWidth={1.4} />
                        <span className="text-[11px] uppercase tracking-wider">Foto próximamente</span>
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">
                      {s.categoria}
                    </div>
                    <h3 className="font-serif text-xl text-[#2E3720] mb-3">{s.titulo}</h3>
                    <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">
                      {s.resumen}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-200">
                      <span className="font-serif text-[15px] text-[#2E3720]">{s.precio}</span>
                      {finalizado ? (
                        <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#3F4A2A]">
                          Ver detalles
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      ) : (
                        // CTA "Reservar" hacia WhatsApp. relative+z-10 para quedar por
                        // encima del enlace que cubre toda la card (ver más abajo).
                        <a
                          href={whatsappLinkServicio(s.titulo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative z-10 inline-flex items-center gap-1.5 min-h-[44px] rounded-full bg-[#3F4A2A] text-[#FAF6EC] px-4 py-2 text-[12.5px] font-medium hover:bg-[#2E3720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F4A2A] focus-visible:ring-offset-2 transition-colors"
                        >
                          <MessageCircle size={14} />
                          Reservar
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Enlace que cubre toda la card hacia el detalle (stretched link).
                      Va al final para no tapar el botón "Reservar" (z-10). */}
                  <Link
                    to={'/servicios/' + s.slug}
                    className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F4A2A] focus-visible:ring-offset-2"
                    aria-label={'Ver detalles de ' + s.titulo}
                  >
                    <span className="sr-only">Ver detalles de {s.titulo}</span>
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
