import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function AvisoPrivacidad() {
  return (
    <div>
      <section className="border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-stone-500 hover:text-[#3F4A2A] mb-5"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <div className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-3">
            Información legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2E3720] leading-[1.1] tracking-tight">
            Aviso de privacidad
          </h1>
          <p className="mt-4 text-[13px] text-stone-500">
            Última actualización: abril de 2026
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="max-w-3xl mx-auto px-5 md:px-8 prose-content">
          <p className="text-[15px] text-stone-700 leading-relaxed">
            En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares (LFPDPPP), <strong>Centro Canino
            Vereda Silvestre S.A.S. de C.V.</strong> (en adelante, "Vereda Silvestre"),
            con domicilio en Jilotepec de Molina Enríquez, Estado de México, pone a tu
            disposición el presente aviso de privacidad.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            1. Responsable del tratamiento de datos
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Centro Canino Vereda Silvestre S.A.S. de C.V. es responsable del uso y
            protección de tus datos personales. Para cualquier consulta puedes
            escribirnos a <a href="mailto:v.silvestre.info@gmail.com" className="text-[#3F4A2A] underline underline-offset-2">v.silvestre.info@gmail.com</a>.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            2. Datos personales que recabamos
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Recabamos únicamente los datos que tú nos proporcionas voluntariamente
            cuando nos contactas a través de:
          </p>
          <ul className="text-[15px] text-stone-700 leading-relaxed list-disc pl-6 space-y-1.5 mt-3">
            <li>El formulario de contacto de esta web (nombre, teléfono y mensaje).</li>
            <li>WhatsApp, llamada telefónica o correo electrónico.</li>
            <li>Datos del perro y del tutor necesarios para prestar el servicio contratado.</li>
          </ul>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            3. Finalidades del tratamiento
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Tus datos se utilizan exclusivamente para:
          </p>
          <ul className="text-[15px] text-stone-700 leading-relaxed list-disc pl-6 space-y-1.5 mt-3">
            <li>Atender consultas, dudas o solicitudes de información.</li>
            <li>Coordinar reservas, citas y servicios contratados.</li>
            <li>Facturación y registros administrativos del servicio prestado.</li>
            <li>Comunicar incidencias o información relevante sobre tu perro durante la estancia.</li>
          </ul>
          <p className="text-[15px] text-stone-700 leading-relaxed mt-3">
            <strong>No utilizamos tus datos con fines publicitarios ni los compartimos con terceros</strong>
            salvo obligación legal.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            4. Conservación y seguridad
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Conservamos tus datos durante el tiempo estrictamente necesario para
            cumplir con las finalidades descritas y, en su caso, durante el plazo legal
            que aplique. Adoptamos las medidas razonables para protegerlos frente a
            acceso no autorizado, pérdida o uso indebido.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            5. Tus derechos (ARCO)
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Tienes derecho a <strong>acceder, rectificar, cancelar u oponerte</strong> al
            tratamiento de tus datos personales (los conocidos como derechos ARCO).
            Para ejercerlos, escríbenos a{' '}
            <a href="mailto:v.silvestre.info@gmail.com" className="text-[#3F4A2A] underline underline-offset-2">
              v.silvestre.info@gmail.com
            </a>{' '}
            indicando tu nombre, el derecho que deseas ejercer y un medio de contacto.
            Te responderemos en un plazo razonable.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            6. Formulario de contacto de esta web
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            El formulario de la sección de contacto <strong>no almacena tus datos en
            ningún servidor</strong>. Al enviarlo, abre directamente WhatsApp con el
            mensaje pre-rellenado para que tú decidas si quieres mandárnoslo o no.
            Si nos escribes por WhatsApp, tu número y mensaje quedan en la conversación
            de WhatsApp como en cualquier chat normal.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            7. Cookies
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Esta web utiliza cookies técnicas mínimas necesarias para su funcionamiento.
            Puedes consultar el detalle en nuestra{' '}
            <Link to="/cookies" className="text-[#3F4A2A] underline underline-offset-2">
              política de cookies
            </Link>.
          </p>

          <h2 className="font-serif text-2xl text-[#2E3720] mt-10 mb-3">
            8. Modificaciones
          </h2>
          <p className="text-[15px] text-stone-700 leading-relaxed">
            Nos reservamos el derecho a modificar este aviso de privacidad cuando sea
            necesario. La versión vigente será siempre la publicada en esta web, con
            indicación de su fecha de última actualización.
          </p>

          <div className="mt-12 p-5 rounded-2xl bg-[#F5EFDF] border border-[#3F4A2A]/10 text-[13px] text-stone-600 leading-relaxed">
            Si tienes cualquier duda sobre este aviso, escríbenos a{' '}
            <a href="mailto:v.silvestre.info@gmail.com" className="text-[#3F4A2A] underline">
              v.silvestre.info@gmail.com
            </a>{' '}
            y te respondemos.
          </div>
        </article>
      </section>
    </div>
  )
}