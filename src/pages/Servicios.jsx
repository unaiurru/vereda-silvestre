import { Link } from 'react-router-dom'
import { ArrowRight, ImageOff } from 'lucide-react'
import { servicios } from '../data/servicios'

export default function Servicios() {
  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
            Nuestros servicios
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#2E3720] leading-[1.05] tracking-tight">
            Cada perro tiene lo que necesita.
          </h1>
          <p className="mt-5 text-stone-600 max-w-xl text-[15px] leading-relaxed">
            Pension campestre, adiestramiento, paseos y excursiones. Elige el servicio
            que mejor encaje con tu perro o escribenos y te ayudamos a decidir.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((s) => (
              <Link
                key={s.slug}
                to={'/servicios/' + s.slug}
                className="group rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-[#3F4A2A]/40 hover:-translate-y-1 transition-all duration-300"
              >
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
                      <span className="text-[11px] uppercase tracking-wider">Foto proximamente</span>
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">
                    {s.categoria}
                  </div>
                  <h3 className="font-serif text-xl text-[#2E3720] mb-3">{s.titulo}</h3>
                  <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">
                    {s.resumen}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                    <span className="font-serif text-[15px] text-[#2E3720]">{s.precio}</span>
                    <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#3F4A2A]">
                      Ver detalles
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}