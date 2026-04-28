// Datos de todos los servicios.
// Cada servicio tiene un array "media" con elementos:
//   { tipo: 'imagen', src: '/foto.jpg' }
//   { tipo: 'video',  src: '/video.mp4', poster: '/foto-previa.jpg' (opcional) }
//   { tipo: 'pendiente', label: 'Texto a mostrar' }
// El campo "portada" es la foto que aparece en la card de la lista.
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
    media:  [
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
    media:[
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
    media:  [
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
]

export function whatsappLinkServicio(titulo) {
  const numero = '5215562058871'
  const msg = `Hola, quiero información sobre ${titulo}.`
  return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`
}