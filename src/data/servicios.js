// Datos de todos los servicios.
// Cada servicio tiene un array "media" con elementos:
//   { tipo: 'imagen', src: '/foto.jpg' }
//   { tipo: 'video',  src: '/video.mp4', poster: '/foto-previa.jpg' (opcional) }
//   { tipo: 'pendiente', label: 'Texto a mostrar' }
// El campo "portada" es la foto que aparece en la card de la lista.
//
// Campo "estado" (opcional): 'activo' | 'finalizado'.
//   - 'finalizado': edición actual cerrada. Se muestra un badge "Finalizado"
//     sobre la card y el CTA cambia de "Reservar" a "Ver detalles".
//   - 'activo' (o ausente): CTA "Reservar" hacia WhatsApp.
//
// IMPORTANTE: el "slug" se usa como URL, asi que no debe tener acentos ni ñ.
// En "titulo" y descripciones SI puedes usar acentos y ñ.

export const servicios = [
  {
    slug: 'cachorro',
    titulo: 'Cachorro',
    categoria: 'Programa',
    precio: '1500 MXN',
    estado: 'finalizado',
    resumen: 'Programa formativo para cachorros: socialización temprana, manejo y primeras pautas de convivencia.',
    descripcion: [
      'Programa pensado para las primeras etapas de vida del cachorro, cuando se construyen las bases de su carácter y de su relación con el mundo. Trabajamos la socialización temprana, la habituación a estímulos y el manejo cotidiano.',
      'Acompañamos también a la familia para que entienda qué necesita su cachorro en cada momento: descanso, juego, límites claros y experiencias positivas. La idea no es adelantar etapas, sino dar a cada cachorro lo que le corresponde según su desarrollo.',
      'Edición actual finalizada. Si te interesa la próxima convocatoria, escríbenos y te avisamos en cuanto abra.'
    ],
    incluye: [
      'Sesiones de socialización temprana',
      'Habituación a estímulos y entornos',
      'Primeras pautas de manejo y convivencia',
      'Acompañamiento a la familia',
      'Material y seguimiento entre sesiones'
    ],
    media: [
      { tipo: 'imagen', src: '/cachorro-1.jpg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/cachorro-1.jpg',
  },
  {
    slug: 'educacion-canina-familiar',
    titulo: 'Educación canina familiar',
    categoria: 'Programa',
    precio: '2500 MXN',
    estado: 'finalizado',
    resumen: 'Trabajo con el binomio familia-perro: comunicación, rutinas y manejo cotidiano en casa.',
    descripcion: [
      'Programa centrado en el binomio familia-perro. No trabajamos solo con el perro: trabajamos con quienes conviven con él cada día, porque la convivencia sana se construye en casa, no solo en sesión.',
      'Abordamos comunicación, rutinas, manejo cotidiano y resolución de las pequeñas fricciones que aparecen en el día a día. El objetivo es que la familia gane criterio propio y autonomía para entender y acompañar a su perro.',
      'Edición actual finalizada. Escríbenos si quieres que te avisemos cuando abramos la próxima.'
    ],
    incluye: [
      'Evaluación del binomio familia-perro',
      'Trabajo de comunicación y lenguaje canino',
      'Diseño de rutinas y manejo en casa',
      'Pautas concretas para el día a día',
      'Acompañamiento y seguimiento'
    ],
    media: [
      { tipo: 'imagen', src: '/educacion-familiar-1.jpg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/educacion-familiar-1.jpg',
  },
  {
    slug: 'activacion-natural',
    titulo: 'Activación natural',
    categoria: 'Sesión',
    precio: '350 MXN',
    estado: 'activo',
    resumen: 'Sesión de enriquecimiento y trabajo de olfato y exploración en entorno natural.',
    descripcion: [
      'Sesión de enriquecimiento en entorno natural, centrada en el olfato y la exploración. Dejamos que el perro use la nariz, investigue y resuelva, que es una de las formas más completas de cansancio sano: el que viene de la cabeza, no solo de las patas.',
      'Trabajamos en espacios abiertos y seguros, respetando el ritmo de cada perro. Es ideal para perros con energía, perros que se aburren en casa o perros que necesitan ganar confianza explorando.',
      'Manejo respetuoso, lectura del lenguaje canino y rutas adaptadas. Sin prisa y sin presión.'
    ],
    incluye: [
      'Sesión de enriquecimiento en entorno natural',
      'Trabajo de olfato y exploración guiada',
      'Manejo respetuoso y lectura del lenguaje canino',
      'Espacios abiertos y seguros',
      'Pautas para repetir el trabajo en casa'
    ],
    media: [
      { tipo: 'imagen', src: '/activacion-natural-1.jpg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/activacion-natural-1.jpg',
  },
  {
    slug: 'pension-campestre',
    titulo: 'Pensión Campestre',
    categoria: 'Pensión',
    precio: '500 MXN / día',
    estado: 'activo',
    resumen: 'Hospedaje campestre con paseos diarios y manejo respetuoso.',
    descripcion: [
      'Hospedaje en entorno campestre en Jilotepec, Estado de México. Tu perro pasa el día al aire libre, con paseos guiados, descanso al sol o a la sombra y manejo respetuoso durante toda su estancia.',
      'Combinamos ejercicio, descanso y, cuando procede, convivencia controlada con grupos compatibles. Lectura del lenguaje canino y supervisión continua para que la estancia sea tranquila y enriquecedora, sea cual sea el tamaño del perro.',
      'Si lo deseas, te enviamos actualizaciones por WhatsApp para que sepas cómo lo está pasando.'
    ],
    incluye: [
      'Estancia diaria en pensión campestre',
      'Paseos diarios y descanso al aire libre',
      'Manejo respetuoso y supervisión continua',
      'Convivencia controlada con grupos compatibles',
      'Transporte a domicilio incluido (zona Jilotepec)',
      'Actualizaciones por WhatsApp opcionales'
    ],
    media: [
      { tipo: 'imagen', src: '/pension-campestre-1.jpg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/pension-campestre-1.jpg',
  },
  {
    slug: 'seminarios-formativos',
    titulo: 'Seminarios formativos',
    categoria: 'Formación',
    precio: '3500 MXN',
    estado: 'activo',
    resumen: 'Seminarios para tutores y profesionales: lectura del lenguaje canino, manejo y metodología.',
    descripcion: [
      'Seminarios formativos dirigidos a tutores y a profesionales que quieren afianzar criterio. Trabajamos lectura del lenguaje canino, manejo y la metodología que aplicamos en Vereda Silvestre.',
      'No buscamos dar recetas, sino herramientas para observar, entender y decidir. Combinamos teoría y práctica, con espacio para preguntas reales y casos concretos.',
      'Consulta fechas y plazas disponibles. Si vienes en grupo o desde otra organización, escríbenos y lo adaptamos.'
    ],
    incluye: [
      'Sesiones teórico-prácticas',
      'Lectura del lenguaje canino',
      'Manejo y metodología de trabajo',
      'Material de apoyo',
      'Espacio para casos y preguntas'
    ],
    media: [
      { tipo: 'imagen', src: '/seminarios-1.jpg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/seminarios-1.jpg',
  },
]

export function whatsappLinkServicio(titulo) {
  const numero = '5215562058871'
  const msg = `Hola, quiero información sobre ${titulo}.`
  return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
}
