import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Heart, Mountain, PawPrint, Sparkles } from 'lucide-react'
import CarruselAuto from '../components/CarruselAuto'
import RejillaShuffle from '../components/RejillaShuffle'
import useSeo from '../hooks/useSeo'
import { waLink } from '../data/negocio'
import inicio from '../data/inicio.json'

const WHATSAPP_URL = waLink('Hola, me gustaría reservar un servicio en Vereda Silvestre.')

// Mapa nombre→icono para los beneficios (el icono se elige por nombre en el JSON).
const ICONOS = { Heart, Mountain, PawPrint, Sparkles }

export default function Inicio() {
  useSeo({
    title: null, // usa el título por defecto del sitio
    description:
      'Centro canino en Jilotepec, Edo. de México. Pensión campestre, adiestramiento, paseos y excursiones con manejo respetuoso. Atención personalizada para tu perro.',
    path: '/',
  })

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-6">
                <span className="h-1 w-6 bg-oliva" />
                {inicio.hero.ubicacion}
              </div>
              <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight text-brand">
                {inicio.hero.titulo}
              </h1>
              <p className="mt-6 text-[16px] md:text-[17px] text-stone-600 leading-relaxed max-w-lg">
                {inicio.hero.subtitulo}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-oliva text-crema-clara px-6 py-3.5 text-[14px] font-medium hover:bg-brand transition-colors"
                >
                  <MessageCircle size={16} />
                  {inicio.hero.ctaWhatsapp}
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 rounded-full border border-oliva/25 text-oliva px-6 py-3.5 text-[14px] font-medium hover:bg-oliva/5 transition-colors"
                >
                  {inicio.hero.ctaServicios}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-stone-900/10">
                <RejillaShuffle />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="border-t border-stone-200 bg-white/40" aria-labelledby="beneficios-heading">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
          <h2 id="beneficios-heading" className="sr-only">Por qué elegir Vereda Silvestre</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {inicio.beneficios.map((b) => {
              const Icono = ICONOS[b.icono] || Heart
              return (
                <div key={b.titulo}>
                  <div className="w-10 h-10 rounded-full bg-oliva/10 text-oliva flex items-center justify-center mb-4">
                    <Icono size={18} strokeWidth={1.7} />
                  </div>
                  <h3 className="font-serif text-lg text-brand mb-2">{b.titulo}</h3>
                  <p className="text-[13.5px] text-stone-600 leading-relaxed">{b.texto}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">{inicio.programas.epigrafe}</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand leading-[1.1]">
              {inicio.programas.titulo}
            </h2>
            <p className="mt-4 text-stone-600">
              {inicio.programas.subtitulo}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {inicio.programas.items.map((s) => (
              <Link
                key={s.titulo}
                to="/servicios"
                className="group rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-oliva/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <CarruselAuto images={s.imgs} alt={s.titulo} intervalMs={3500} />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-xl text-brand mb-3">{s.titulo}</h3>
                  <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">{s.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-oliva">
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
              className="inline-flex items-center gap-2 text-[14px] font-medium text-oliva hover:text-brand"
            >
              {inicio.programas.verTodos}
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
              <div className="rounded-2xl overflow-hidden bg-crema max-w-md mx-auto">
                <img
                  src={inicio.intro.imagen}
                  alt="Vereda Silvestre"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {inicio.intro.epigrafe}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-brand leading-[1.1] mb-6">
                {inicio.intro.titulo}
              </h2>
              <div className="space-y-4 text-[15px] text-stone-700 leading-relaxed">
                {inicio.intro.parrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                to="/nosotros"
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-oliva hover:text-brand"
              >
                {inicio.intro.enlace}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ÚNETE AL EQUIPO */}
      <section className="pb-20" aria-labelledby="unete-heading">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-stone-200">
            <div className="bg-crema p-10 md:p-14 flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
                {inicio.unete.epigrafe}
              </div>
              <h2 id="unete-heading" className="font-serif text-3xl md:text-4xl text-brand leading-[1.1]">
                {inicio.unete.titulo}
              </h2>
              <p className="mt-5 text-[15px] text-stone-700 leading-relaxed max-w-md">
                {inicio.unete.texto}
              </p>
              <div className="mt-7">
                <Link
                  to="/unete"
                  className="inline-flex items-center gap-2 rounded-full bg-oliva text-crema-clara px-6 py-3.5 text-[14px] font-medium hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors"
                >
                  {inicio.unete.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="bg-crema min-h-[260px] md:min-h-0">
              <img
                src={inicio.unete.imagen}
                alt="Entorno natural del centro canino Vereda Silvestre"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl bg-oliva text-crema-clara p-10 md:p-14 text-center">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              {inicio.ctaFinal.titulo}
            </h2>
            <p className="mt-3 text-crema-clara/75 max-w-xl mx-auto">
              {inicio.ctaFinal.texto}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-crema-clara text-brand px-7 py-3.5 text-[14px] font-medium hover:bg-white transition-colors"
            >
              <MessageCircle size={16} />
              {inicio.ctaFinal.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
