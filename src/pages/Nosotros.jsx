import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Heart, Eye, Users, Mountain, Quote } from 'lucide-react'
import Lightbox from '../components/Lightbox'

const WHATSAPP_URL = 'https://wa.me/5215562058871?text=' + encodeURIComponent('Hola, me gustaría conocer Vereda Silvestre.')

// =====================================================================
// DATOS EDITABLES — cambia aquí cuando tengas la información real.
// =====================================================================

const NOMBRE_DUENIA = 'Mine'
const FRASE_DESTACADA = 'El perro no es un proyecto que corregir, es un compañero que comprender.'

const HISTORIA = [
  'Crecí rodeada de perros. Desde niña, mi forma natural de relacionarme con el mundo ha pasado por ellos: los observaba, los acompañaba, aprendía a leer lo que sentían sin que tuvieran que decírmelo. Ese vínculo nunca se fue.',
  'Después de años trabajando en distintos espacios con animales, vi algo que se repetía: muchas familias quieren a sus perros, pero no siempre saben cómo entenderlos. Y muchos perros sufren no por falta de cariño, sino por falta de comunicación.',
  'Vereda Silvestre nace de ahí: del deseo de crear un lugar donde el perro sea escuchado de verdad, donde las familias encuentren acompañamiento real y donde el campo sirva como aula y como refugio.',
]

const FORMACION = [
  'Educación canina con enfoque cognitivo-emocional',
  'Etología y comportamiento canino aplicado',
  'Manejo respetuoso y comunicación asertiva',
  'Primeros auxilios caninos',
]

const PILARES = [
  {
    icon: Eye,
    titulo: 'Observación',
    texto: 'Antes de actuar, miramos. El comportamiento del perro siempre tiene una causa, y nuestro trabajo empieza por entenderla.',
  },
  {
    icon: Heart,
    titulo: 'Comunicación',
    texto: 'Lenguaje claro, coherente y respetuoso. El perro entiende cuando lo escuchamos, y aprende cuando no le imponemos.',
  },
  {
    icon: Users,
    titulo: 'Acompañamiento',
    texto: 'El cambio sostenible incluye al tutor. Te enseñamos a mantenerlo en casa para que el vínculo siga creciendo.',
  },
]

const CIFRAS = [
  { numero: '+5', etiqueta: 'años de experiencia' },
  { numero: '+100', etiqueta: 'perros acompañados' },
  { numero: '100%', etiqueta: 'manejo respetuoso' },
]

const GALERIA = [
  '/perro-atardecer.jpg',
  '/dos-perros-correa.jpg',
  '/mediano-1.jpg',
  '/pequeno-1.jpg',
  '/adiestramiento-1.jpg',
  '/mediano-3.jpg',
]

// =====================================================================

export default function Nosotros() {
  return (
    <div>
      {/* Cabecera */}
      <section className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
            Quiénes somos
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#2E3720] leading-[1.05] tracking-tight">
            Una vereda que recorremos contigo y con tu perro.
          </h1>
          <p className="mt-5 text-stone-600 max-w-2xl text-[15px] leading-relaxed">
            Vereda Silvestre es un proyecto pequeño y cuidado. Sin franquicias, sin recetas mágicas.
            Solo trabajo honesto, escucha real y mucho respeto por cada perro que pasa por aquí.
          </p>
        </div>
      </section>

      {/* PRESENTACION DUEÑA */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-[#F5EFDF] max-w-md mx-auto">
                <Lightbox src="/duenia.jpg" alt={'Foto de ' + NOMBRE_DUENIA}>
                  <img
                    src="/duenia.jpg"
                    alt={'Foto de ' + NOMBRE_DUENIA}
                    className="w-full h-auto block"
                  />
                </Lightbox>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-amber-700/80 mb-3">
                Hola
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2E3720] leading-[1.1] mb-6">
                Soy {NOMBRE_DUENIA}.
              </h2>
              <div className="space-y-4 text-[15.5px] text-stone-700 leading-relaxed">
                {HISTORIA.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRASE DESTACADA */}
      <section className="py-12 md:py-16 bg-[#3F4A2A] text-[#FAF6EC]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Quote
            size={44}
            className="mx-auto text-[#E0A458] mb-5"
            strokeWidth={1.2}
            fill="#E0A458"
          />
          <blockquote className="font-serif text-2xl md:text-4xl leading-[1.25] tracking-tight italic">
            "{FRASE_DESTACADA}"
          </blockquote>
          <div className="mt-6 text-[12px] uppercase tracking-[0.22em] text-[#FAF6EC]/60">
            — {NOMBRE_DUENIA}, Vereda Silvestre
          </div>
        </div>
      </section>

      {/* FORMACION + ENFOQUE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
                Formación y experiencia
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2E3720] leading-[1.15] mb-6">
                Aprender no es opcional.
              </h2>
              <p className="text-[15px] text-stone-700 leading-relaxed mb-7">
                El trabajo con perros exige actualización constante. Combinamos formación
                profesional, lectura y experiencia diaria para hacer las cosas bien.
              </p>
              <ul className="space-y-3.5">
                {FORMACION.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] text-stone-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3F4A2A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
                Nuestro enfoque
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2E3720] leading-[1.15] mb-8">
                Tres pilares que no negociamos.
              </h2>

              <div className="space-y-5">
                {PILARES.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 p-6 rounded-2xl border border-stone-200 bg-white"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#3F4A2A]/10 text-[#3F4A2A] shrink-0 flex items-center justify-center">
                      <p.icon size={20} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#2E3720] mb-1.5">{p.titulo}</h3>
                      <p className="text-[14px] text-stone-600 leading-relaxed">{p.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RANCHO + CIFRAS */}
      <section className="py-16 md:py-24 bg-[#F5EFDF]/50 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
                El lugar
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2E3720] leading-[1.1] mb-6">
                Un rancho a las afueras de Jilotepec.
              </h2>
              <div className="space-y-4 text-[15px] text-stone-700 leading-relaxed">
                <p>
                  Espacios abiertos, vistas al campo, aire limpio. Aquí los perros pueden moverse,
                  oler, descansar y volver a ser perros. Lejos del ruido de la ciudad y cerca de
                  todo lo que de verdad necesitan.
                </p>
                <p>
                  Tenemos zonas de descanso al aire libre y resguardadas, áreas para entrenamiento,
                  espacios de convivencia controlada y rutas seguras para paseos y excursiones.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-5 max-w-md">
                {CIFRAS.map((c, i) => (
                  <div key={i}>
                    <div className="font-serif text-3xl md:text-4xl text-[#3F4A2A]">{c.numero}</div>
                    <div className="text-[12px] uppercase tracking-wider text-stone-500 mt-1 leading-tight">
                      {c.etiqueta}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                <Lightbox src="/rancho.jpg" alt="Rancho Vereda Silvestre">
                  <img
                    src="/rancho.jpg"
                    alt="Rancho Vereda Silvestre"
                    className="w-full h-full object-cover"
                  />
                </Lightbox>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
              El día a día
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2E3720] leading-[1.1]">
              Algunos momentos de Vereda Silvestre.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALERIA.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-stone-100">
                <Lightbox sources={GALERIA} startIndex={i} alt="">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Lightbox>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl bg-[#3F4A2A] text-[#FAF6EC] p-10 md:p-14 text-center">
            <Mountain size={36} className="mx-auto mb-5 text-[#E0A458]" strokeWidth={1.4} />
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              ¿Hablamos de tu perro?
            </h2>
            <p className="mt-4 text-[#FAF6EC]/80 max-w-xl mx-auto leading-relaxed">
              Si te ha gustado lo que has leído, escríbenos. Te conocemos a ti y a tu perro
              sin compromiso, y desde ahí decidimos juntos qué necesitáis.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF6EC] text-[#2E3720] px-7 py-3.5 text-[14px] font-medium hover:bg-white transition-colors"
              >
                <MessageCircle size={16} />
                Escribir por WhatsApp
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 rounded-full border border-[#FAF6EC]/30 text-[#FAF6EC] px-7 py-3.5 text-[14px] font-medium hover:bg-[#FAF6EC]/10 transition-colors"
              >
                Ver servicios
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}