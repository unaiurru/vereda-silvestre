import { waLink } from './negocio'

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
    slug: 'pension-perro-grande',
    titulo: 'Pensión perro grande',
    categoria: 'Pensión',
    precio: '600 MXN / día',
    resumen: 'Hospedaje campestre con espacios amplios, paseos diarios y supervisión profesional para perros de raza grande.',
    descripcion: [
      'Hospedaje en entorno campestre en Jilotepec, Estado de México. Pensado para perros grandes que necesitan espacios abiertos, ejercicio adecuado y rutinas firmes para descansar de verdad.',
      'Tu perro pasa el día al aire libre, con paseos guiados, descanso al sol o a la sombra y manejo respetuoso durante toda su estancia. Le tratamos como a uno más, no como a un huésped.',
      'Si lo deseas, te enviamos actualizaciones por WhatsApp para que sepas cómo lo está pasando.'
    ],
    incluye: [
      'Estancia diaria en pensión campestre',
      'Paseos diarios y descanso al aire libre',
      'Manejo profesional y supervisión continua',
      'Transporte a domicilio incluido (zona Jilotepec)',
      'Actualizaciones por WhatsApp opcionales'
    ],
    media: [
      { tipo: 'imagen', src: '/perro-atardecer.jpg' },
      { tipo: 'imagen', src: '/dos-perros-correa.jpg' },
    ],
    portada: '/perro-atardecer.jpg',
  },
  {
    slug: 'pension-perro-mediano',
    titulo: 'Pensión perro mediano',
    categoria: 'Pensión',
    precio: '500 MXN / día',
    resumen: 'Estancia campestre con paseos diarios y convivencia respetuosa adaptada a perros medianos.',
    descripcion: [
      'Hospedaje en pensión campestre en Jilotepec, Estado de México, para perros medianos. Espacios amplios, paseos diarios y rutinas adaptadas al carácter de cada perro.',
      'Combinamos descanso, ejercicio y socialización controlada con grupos compatibles. Lectura del lenguaje canino y manejo profesional para que la estancia sea tranquila y enriquecedora.',
      'Te enviamos actualizaciones por WhatsApp si lo deseas, para que sepas cómo lo está pasando tu perro.'
    ],
    incluye: [
      'Estancia diaria en pensión campestre',
      'Paseos diarios y descanso al aire libre',
      'Convivencia controlada con grupos compatibles',
      'Manejo profesional y supervisión continua',
      'Transporte a domicilio incluido (zona Jilotepec)',
      'Actualizaciones por WhatsApp opcionales'
    ],
    media: [
      { tipo: 'imagen', src: '/mediano-1.jpg' },
      { tipo: 'imagen', src: '/mediano-2.jpg' },
      { tipo: 'imagen', src: '/mediano-3.jpg' },
    ],
    portada: '/mediano-1.jpg',
  },
  {
    slug: 'pension-perro-pequeno',
    titulo: 'Pensión perro pequeño',
    categoria: 'Pensión',
    precio: '400 MXN / día',
    resumen: 'Estancia campestre con atención personalizada para perros pequeños. Rutinas suaves y manejo cuidadoso.',
    descripcion: [
      'Hospedaje en pensión campestre en Jilotepec, Estado de México, para perros pequeños. Espacios seguros, descanso tranquilo y manejo cuidadoso adaptado a su tamaño.',
      'Atención personalizada para que tu perro esté cómodo y bien acompañado durante toda la estancia. Rutinas suaves, paseos adaptados y supervisión continua.',
      'Te enviamos actualizaciones por WhatsApp si lo deseas, para que sepas cómo lo está pasando.'
    ],
    incluye: [
      'Estancia diaria en pensión campestre',
      'Paseos diarios adaptados al tamaño',
      'Espacios seguros y descanso tranquilo',
      'Manejo cuidadoso y supervisión continua',
      'Transporte a domicilio incluido (zona Jilotepec)',
      'Actualizaciones por WhatsApp opcionales'
    ],
    media: [
      { tipo: 'imagen', src: '/pension-pequeno-1.jpg' },
      { tipo: 'imagen', src: '/pension-pequeno-2.jpg' },
      { tipo: 'imagen', src: '/pension-pequeno-3.jpg' },
      { tipo: 'imagen', src: '/pension-pequeno-4.jpg' },
      { tipo: 'imagen', src: '/pension-pequeno-5.jpg' },
    ],
    portada: '/pension-pequeno-1.jpg',
  },
  {
    slug: 'adiestramiento-agility',
    titulo: 'Adiestramiento canino · Agility',
    categoria: 'Adiestramiento',
    precio: '150 MXN / hora',
    resumen: 'Sesión individual de 1 hora. Trabajo con saltos, túnel y circuito de agility.',
    descripcion: [
      'Sesión de adiestramiento individual de 1 hora enfocada en agility: saltos, túnel, slalom y trabajo de coordinación física.',
      'Es ideal para perros con energía, que disfrutan del movimiento y necesitan retos físicos y mentales. También es una herramienta excelente para reforzar el vínculo con el tutor.',
      'Comunicación clara, refuerzo del comportamiento sano y manejo respetuoso. Sin métodos coercitivos.'
    ],
    incluye: [
      'Sesión individual de 1 hora',
      'Plan de trabajo personalizado',
      'Material de agility (saltos, túnel)',
      'Acompañamiento al tutor con pautas para casa',
      'Seguimiento posterior a las sesiones'
    ],
    media: [
      { tipo: 'imagen', src: '/adiestramiento-1.jpg' },
      { tipo: 'pendiente', label: 'Vídeo próximamente' },
      { tipo: 'pendiente', label: 'Vídeo próximamente' },
    ],
    portada: '/adiestramiento-1.jpg',
  },
  {
    slug: 'adiestramiento-obediencia',
    titulo: 'Adiestramiento canino · Obediencia',
    categoria: 'Adiestramiento',
    precio: '150 MXN / hora',
    resumen: 'Sesión individual de 1 hora. Llamada, caminar con correa, control en casa y habilidades de convivencia.',
    descripcion: [
      'Sesión de adiestramiento individual de 1 hora enfocada en obediencia: llamada, caminar con correa, esperas, control en casa y manejo cotidiano.',
      'Trabajamos las habilidades que tu perro necesita para una convivencia sana y para responder con seguridad en distintos entornos. Nuestra metodología está avalada por reconocimientos en certámenes oficiales de la Federación Canófila Mexicana.',
      'Comunicación clara, refuerzo del comportamiento sano y manejo respetuoso. Sin métodos coercitivos. Acompañamos también al tutor.'
    ],
    incluye: [
      'Sesión individual de 1 hora',
      'Plan de trabajo personalizado según el binomio',
      'Trabajo de habilidades de obediencia',
      'Acompañamiento al tutor con pautas para casa',
      'Seguimiento posterior a las sesiones'
    ],
    media: [
      { tipo: 'imagen', src: '/adiestramiento-obediencia-1.jpg' },
    ],
    portada: '/adiestramiento-obediencia-1.jpg',
  },
  {
    slug: 'clase-grupal',
    titulo: 'Clase grupal de adiestramiento',
    categoria: 'Adiestramiento',
    precio: '50 MXN / clase',
    resumen: 'Sesión grupal de adiestramiento canino: obediencia o agility, según el día.',
    descripcion: [
      'Clase grupal de adiestramiento canino. Trabajamos en grupo reducido habilidades de obediencia o de agility según el día y el grupo.',
      'Las clases grupales son una excelente forma de socializar a tu perro mientras aprende, y de practicar lo que ya sabéis en un entorno con más estímulos. Pregunta por horarios disponibles.',
      'Comunicación clara, refuerzo del comportamiento sano y manejo respetuoso.'
    ],
    incluye: [
      'Clase en grupo reducido',
      'Trabajo de obediencia o agility según el día',
      'Socialización supervisada',
      'Pautas y consejos para practicar en casa'
    ],
    media: [
      { tipo: 'imagen', src: '/clase-grupal-1.jpg' },
      { tipo: 'imagen', src: '/clase-grupal-2.jpg' },
      { tipo: 'imagen', src: '/clase-grupal-3.jpg' },
      { tipo: 'imagen', src: '/clase-grupal-4.jpg' },
    ],
    portada: '/clase-grupal-1.jpg',
  },
  {
    slug: 'paseo-30-minutos',
    titulo: 'Paseo de 30 minutos',
    categoria: 'Paseo',
    precio: '50 MXN',
    resumen: 'Paseo guiado de 30 minutos con manejo respetuoso y ritmo adaptado al perro.',
    descripcion: [
      'Paseo de 30 minutos guiado por una profesional. Ideal para descarga sensorial y rutina diaria, especialmente para perros que ya tienen ejercicio adicional o que necesitan salidas más cortas.',
      'Manejo profesional, lectura del lenguaje canino y rutas seguras. El paseo se adapta al carácter y al ritmo de tu perro.',
      'Si lo deseas, te enviamos un breve reporte por WhatsApp al terminar.'
    ],
    incluye: [
      'Paseo guiado de 30 minutos',
      'Manejo respetuoso y seguro',
      'Lectura del lenguaje canino',
      'Rutas seguras y adaptadas',
      'Reporte breve al tutor tras el paseo'
    ],
    media: [
      { tipo: 'imagen', src: '/paseo-30min-1.jpg' },
    ],
    portada: '/paseo-30min-1.jpg',
  },
  {
    slug: 'paseo-1-hora',
    titulo: 'Paseo de 1 hora',
    categoria: 'Paseo',
    precio: '100 MXN',
    resumen: 'Paseo extendido de 1 hora con trabajo de olfato y rutas más largas para perros con más necesidad de movimiento.',
    descripcion: [
      'Paseo extendido de 1 hora pensado para perros con más necesidad de actividad física y mental. Combinamos caminata, descansos y trabajo de olfato cuando procede.',
      'Manejo profesional, rutas variadas y ritmo adaptado al perro. Es una opción excelente para razas activas o perros que pasan muchas horas en casa.',
      'Te enviamos un breve reporte por WhatsApp al terminar si lo deseas.'
    ],
    incluye: [
      'Paseo guiado de 1 hora',
      'Trabajo de olfato cuando procede',
      'Manejo respetuoso y seguro',
      'Rutas variadas en entorno seguro',
      'Reporte breve al tutor tras el paseo'
    ],
    media: [
      { tipo: 'imagen', src: '/paseo-1h-1.jpg' },
    ],
    portada: '/paseo-1h-1.jpg',
  },
  {
    slug: 'excursion-perro-pequeno',
    titulo: 'Excursión perro pequeño',
    categoria: 'Excursión',
    precio: '300 MXN',
    resumen: 'Salida al campo en grupo reducido para perros pequeños. Rutas suaves y socialización supervisada.',
    descripcion: [
      'Excursión en grupo reducido pensada para perros pequeños. Rutas adaptadas a su tamaño y ritmo, con descansos frecuentes y manejo cuidadoso.',
      'Estímulos naturales, exploración guiada y socialización supervisada con perros compatibles. Una experiencia enriquecedora para perros que disfrutan del contacto con la naturaleza.',
      'Te enviamos un reporte fotográfico de la salida.'
    ],
    incluye: [
      'Salida grupal en entorno natural',
      'Rutas suaves adaptadas a perros pequeños',
      'Grupos reducidos y compatibles',
      'Manejo profesional y supervisión',
      'Descansos y agua disponible',
      'Reporte fotográfico de la salida'
    ],
    media: [
      { tipo: 'imagen', src: '/pequeno-1.jpg' },
      { tipo: 'imagen', src: '/pequeno-2.jpg' },
      { tipo: 'imagen', src: '/pequeno-3.jpg' },
    ],
    portada: '/pequeno-1.jpg',
  },
  {
    slug: 'excursion-perro-mediano-grande',
    titulo: 'Excursión perro mediano o grande',
    categoria: 'Excursión',
    precio: '350 MXN',
    resumen: 'Salida al campo en grupo reducido para perros medianos y grandes. Rutas amplias y trabajo de exploración.',
    descripcion: [
      'Excursión en grupo reducido para perros medianos o grandes. Rutas amplias y exigentes, adaptadas a perros con más necesidad de movimiento físico y mental.',
      'Estímulos naturales, espacios abiertos, contacto con el entorno y socialización supervisada con perros compatibles. Manejo profesional durante toda la salida.',
      'Te enviamos un reporte fotográfico de la salida para que veas cómo lo vivió tu perro.'
    ],
    incluye: [
      'Salida grupal en entorno natural',
      'Rutas amplias adaptadas al nivel físico',
      'Grupos reducidos y compatibles',
      'Manejo profesional y supervisión',
      'Descansos y agua disponible',
      'Reporte fotográfico de la salida'
    ],
    media: [
      { tipo: 'imagen', src: '/excursion-grande-1.jpg' },
      { tipo: 'imagen', src: '/excursion-grande-2.jpg' },
      { tipo: 'imagen', src: '/excursion-grande-3.jpg' },
    ],
    portada: '/excursion-grande-1.jpg',
  },
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
      { tipo: 'imagen', src: '/cachorro-poodle-bicolor-primer-plano.jpeg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/cachorro-poodle-bicolor-primer-plano.jpeg',
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
      { tipo: 'imagen', src: '/mujer-saludando-dos-perros-pradera.JPG' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/mujer-saludando-dos-perros-pradera.JPG',
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
      { tipo: 'imagen', src: '/perro-canela-entre-hierba-alta.JPG' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/perro-canela-entre-hierba-alta.JPG',
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
      { tipo: 'imagen', src: '/dos-perros-campo.jpg' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/dos-perros-campo.jpg',
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
      { tipo: 'imagen', src: '/grupo-adiestradores-perros-pastoreo.JPG' },
      { tipo: 'pendiente', label: 'Fotos próximamente' },
    ],
    portada: '/grupo-adiestradores-perros-pastoreo.JPG',
  },
]

export function whatsappLinkServicio(titulo) {
  return waLink(`Hola, quiero información sobre ${titulo}.`)
}
