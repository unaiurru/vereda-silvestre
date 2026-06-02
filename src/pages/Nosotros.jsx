import { Link } from 'react-router-dom'
import { MessageCircle, Heart, Eye, Users, Mountain, Quote } from 'lucide-react'
import Lightbox from '../components/Lightbox'
import InteractiveBentoGallery from '../components/InteractiveBentoGallery'
import useSeo from '../hooks/useSeo'
import { waLink } from '../data/negocio'
import nosotros from '../data/nosotros.json'

const WHATSAPP_URL = waLink('Hola, me gustaría conocer Vereda Silvestre.')

// Mapa nombre→icono para los pilares (el icono se elige por nombre en el JSON).
const ICONOS = { Eye, Heart, Users }

const NOMBRE = nosotros.nombreDuenia

export default function Nosotros() {
  useSeo({
    title: 'Nosotros',
    description:
      'Conoce a Mine y la historia de Vereda Silvestre: comunicación asertiva, manejo respetuoso y un entorno rural pensado para el bienestar de tu perro.',
    path: '/nosotros',
  })

  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            {nosotros.cabecera.epigrafe}
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-brand leading-[1.05] tracking-tight">
            {nosotros.cabecera.titulo}
          </h1>
          <p className="mt-5 text-stone-600 max-w-2xl text-[15px] leading-relaxed">
            {nosotros.cabecera.subtitulo}
          </p>
        </div>
      </section>

      {/* PRESENTACION DUEÑA */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-crema max-w-md mx-auto">
                <Lightbox src={nosotros.presentacion.imagen} alt={'Foto de ' + NOMBRE}>
                  <img
                    src={nosotros.presentacion.imagen}
                    alt={'Foto de ' + NOMBRE}
                    className="w-full h-auto block"
                  />
                </Lightbox>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-3">
                {nosotros.presentacion.epigrafe}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-brand leading-[1.1] mb-6">
                Soy {NOMBRE}.
              </h2>
              <div className="space-y-4 text-[15.5px] text-stone-700 leading-relaxed">
                {nosotros.presentacion.historia.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRASE DESTACADA */}
      <section className="py-12 md:py-16 bg-oliva text-crema-clara">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Quote
            size={44}
            className="mx-auto text-dorado mb-5"
            strokeWidth={1.2}
            fill="rgb(var(--vs-dorado))"
          />
          <blockquote className="font-serif text-2xl md:text-4xl leading-[1.25] tracking-tight italic">
            "{nosotros.frase}"
          </blockquote>
          <div className="mt-6 text-[12px] uppercase tracking-[0.22em] text-crema-clara/60">
            — {NOMBRE}, Vereda Silvestre
          </div>
        </div>
      </section>

      {/* FORMACION + ENFOQUE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {nosotros.formacion.epigrafe}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand leading-[1.15] mb-6">
                {nosotros.formacion.titulo}
              </h2>
              <p className="text-[15px] text-stone-700 leading-relaxed mb-7">
                {nosotros.formacion.texto}
              </p>
              <ul className="space-y-3.5">
                {nosotros.formacion.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] text-stone-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-oliva shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {nosotros.enfoque.epigrafe}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand leading-[1.15] mb-8">
                {nosotros.enfoque.titulo}
              </h2>

              <div className="space-y-5">
                {nosotros.enfoque.pilares.map((p, i) => {
                  const Icono = ICONOS[p.icono] || Eye
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-5 p-6 rounded-2xl border border-stone-200 bg-white"
                    >
                      <div className="w-11 h-11 rounded-xl bg-oliva/10 text-oliva shrink-0 flex items-center justify-center">
                        <Icono size={20} strokeWidth={1.7} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-brand mb-1.5">{p.titulo}</h3>
                        <p className="text-[14px] text-stone-600 leading-relaxed">{p.texto}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RANCHO + CIFRAS */}
      <section className="py-16 md:py-24 bg-crema/50 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {nosotros.rancho.epigrafe}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-brand leading-[1.1] mb-6">
                {nosotros.rancho.titulo}
              </h2>
              <div className="space-y-4 text-[15px] text-stone-700 leading-relaxed">
                {nosotros.rancho.parrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-5 max-w-md">
                {nosotros.rancho.cifras.map((c, i) => (
                  <div key={i}>
                    <div className="font-serif text-3xl md:text-4xl text-oliva">{c.numero}</div>
                    <div className="text-[12px] uppercase tracking-wider text-stone-600 mt-1 leading-tight">
                      {c.etiqueta}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                <Lightbox src={nosotros.rancho.imagen} alt="Rancho Vereda Silvestre">
                  <img
                    src={nosotros.rancho.imagen}
                    alt="Rancho Vereda Silvestre"
                    className="w-full h-full object-cover"
                  />
                </Lightbox>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA — bento interactiva */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <InteractiveBentoGallery
            mediaItems={nosotros.galeria.items}
            title={nosotros.galeria.titulo}
            description={nosotros.galeria.epigrafe}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl bg-oliva text-crema-clara p-10 md:p-14 text-center">
            <Mountain size={36} className="mx-auto mb-5 text-dorado" strokeWidth={1.4} />
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              {nosotros.cta.titulo}
            </h2>
            <p className="mt-4 text-crema-clara/80 max-w-xl mx-auto leading-relaxed">
              {nosotros.cta.texto}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-crema-clara text-brand px-7 py-3.5 text-[14px] font-medium hover:bg-white transition-colors"
              >
                <MessageCircle size={16} />
                {nosotros.cta.ctaWhatsapp}
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 rounded-full border border-crema-clara/30 text-crema-clara px-7 py-3.5 text-[14px] font-medium hover:bg-crema-clara/10 transition-colors"
              >
                {nosotros.cta.ctaServicios}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
