import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import { negocio } from '../data/negocio'

export default function AvisoPrivacidad() {
  useSeo({
    title: 'Aviso de Privacidad',
    description:
      'Aviso de Privacidad Integral de Centro Canino Vereda Silvestre S.A.S. de C.V., conforme a la LFPDPPP y los lineamientos del INAI.',
    path: '/aviso-privacidad',
  })

  return (
    <div>
      <section className="border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-600 hover:text-oliva mb-5"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-600 mb-3">
            Información legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-brand leading-[1.1] tracking-tight">
            Aviso de Privacidad Integral
          </h1>
          <p className="mt-4 text-[13px] text-stone-600">
            Última actualización: abril de 2026
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="max-w-3xl mx-auto px-5 md:px-8 prose-content">
          <p className="text-[15px] text-stone-700 leading-relaxed">
            En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los
            Lineamientos del Aviso de Privacidad emitidos por el INAI,{' '}
            <strong>Centro Canino Vereda Silvestre S.A.S. de C.V.</strong> (en adelante,
            "Vereda Silvestre"), con domicilio en Jilotepec de Molina Enríquez, Estado de
            México, pone a tu disposición el presente Aviso de Privacidad Integral.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            1. Identidad y domicilio del responsable
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Centro Canino Vereda Silvestre S.A.S. de C.V., con domicilio en Jilotepec de
            Molina Enríquez, Estado de México, es responsable del tratamiento, uso y
            protección de tus datos personales. Para cualquier consulta relacionada con
            este aviso o con tus datos puedes escribirnos a{' '}
            <a href={`mailto:${negocio.email}`} className="text-oliva underline underline-offset-2">
              {negocio.email}
            </a>.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            2. Datos personales que recabamos
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Recabamos únicamente los datos personales que tú nos proporcionas
            voluntariamente cuando nos contactas a través de:
          </p>
          <ul className="text-[15px] text-stone-700 leading-relaxed list-disc pl-6 space-y-1.5 mt-3">
            <li>El formulario de contacto de esta web (nombre, teléfono y mensaje).</li>
            <li>WhatsApp, llamada telefónica o correo electrónico.</li>
            <li>Datos del perro y del tutor necesarios para prestar el servicio contratado (nombre, edad y características del perro, indicaciones veterinarias o de comportamiento, contacto del tutor).</li>
          </ul>
          <p className="text-[15px] text-stone-700 leading-relaxed mt-3">
            <strong>No recabamos datos personales sensibles</strong> (origen racial o
            étnico, estado de salud, información genética, creencias religiosas,
            filosóficas o morales, afiliación sindical, opiniones políticas, preferencia
            sexual) ni datos financieros o patrimoniales.
          </p>
          <p className="text-[15px] text-stone-700 leading-relaxed mt-3">
            Nuestros servicios están dirigidos a personas mayores de edad. <strong>No
            recabamos datos personales de menores de edad</strong> de manera consciente.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            3. Finalidades del tratamiento
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Tus datos se utilizan para las siguientes <strong>finalidades primarias</strong>,
            necesarias para la relación con Vereda Silvestre:
          </p>
          <ul className="text-[15px] text-stone-700 leading-relaxed list-disc pl-6 space-y-1.5 mt-3">
            <li>Atender consultas, dudas o solicitudes de información.</li>
            <li>Coordinar reservas, citas y servicios contratados.</li>
            <li>Facturación y registros administrativos del servicio prestado.</li>
            <li>Comunicar incidencias o información relevante sobre tu perro durante la estancia.</li>
            <li>Cumplir obligaciones legales y fiscales aplicables.</li>
          </ul>
          <p className="text-[15px] text-stone-700 leading-relaxed mt-4">
            <strong>No realizamos tratamientos con finalidades secundarias</strong> tales
            como mercadotecnia, publicidad o prospección comercial. Tampoco utilizamos
            tus datos para fines distintos a los descritos en este aviso.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            4. Transferencia de datos personales
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            <strong>No realizamos transferencias de datos personales a terceros que
            requieran tu consentimiento.</strong> Únicamente podríamos compartirlos en los
            supuestos previstos en el artículo 37 de la LFPDPPP (por ejemplo, requerimiento
            de autoridad competente o cumplimiento de una obligación legal), sin que en
            ningún caso se realicen transferencias con fines comerciales.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            5. Conservación y medidas de seguridad
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Conservamos tus datos durante el tiempo estrictamente necesario para cumplir
            con las finalidades descritas y, en su caso, durante el plazo legal que
            resulte aplicable (por ejemplo, materia fiscal). Hemos implementado medidas
            de seguridad administrativas, técnicas y físicas razonables para proteger tus
            datos frente a daño, pérdida, alteración, destrucción o uso, acceso o
            tratamiento no autorizados.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            6. Tus derechos ARCO
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Tienes derecho a <strong>Acceder</strong> a tus datos, <strong>Rectificarlos</strong>{' '}
            si son inexactos, <strong>Cancelarlos</strong> cuando consideres que no se
            requieren para alguna de las finalidades aquí señaladas o estén siendo utilizados
            de forma indebida, y <strong>Oponerte</strong> a su tratamiento para fines
            específicos (derechos ARCO). También puedes revocar en cualquier momento el
            consentimiento que nos hayas otorgado.
          </p>
          <p className="text-[15px] text-stone-700 leading-relaxed mt-4">
            Para ejercer cualquiera de estos derechos, limitar el uso o divulgación de tus
            datos o revocar tu consentimiento, envíanos una solicitud al correo{' '}
            <a
              href={`mailto:${negocio.email}`}
              className="text-oliva underline underline-offset-2"
            >
              {negocio.email}
            </a>{' '}
            indicando tu nombre, una descripción clara de lo que solicitas y un medio para
            contactarte. Te responderemos en los plazos que establece la ley.
          </p>

          <h2 className="font-serif text-2xl text-brand mt-10 mb-3">
            7. Cambios al presente aviso
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Nos reservamos el derecho de actualizar este Aviso de Privacidad en cualquier
            momento para reflejar cambios en nuestras prácticas o en la legislación
            aplicable. Cualquier modificación se publicará en esta misma página, por lo que
            te recomendamos revisarla periódicamente.
          </p>

          <div className="mt-12 p-5 rounded-2xl bg-crema border border-oliva/10 text-[13px] text-stone-600 leading-relaxed">
            Si tienes dudas sobre este aviso o sobre el tratamiento de tus datos, escríbenos a{' '}
            <a
              href={`mailto:${negocio.email}`}
              className="text-oliva underline"
            >
              {negocio.email}
            </a>.
          </div>
        </article>
      </section>
    </div>
  )
}