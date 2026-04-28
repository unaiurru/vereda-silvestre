import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/5215562058871'
const INSTAGRAM_URL = 'https://www.instagram.com/vereda_silvestre/'
const FACEBOOK_URL = 'https://www.facebook.com/people/Vereda-Silvestre/61565697153668/'

export default function Footer() {
  return (
    <footer className="bg-[#2E3720] text-[#FAF6EC]/80 mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-[#FAF6EC]/15">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Vereda Silvestre"
                className="w-12 h-12 object-contain rounded-full bg-[#FAF6EC] p-0.5"
              />
              <div>
                <div className="font-serif text-lg text-[#FAF6EC]">Vereda Silvestre</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#E0A458]">Centro Canino</div>
              </div>
            </div>
            <p className="text-[13.5px] leading-relaxed max-w-xs">
              Cuidado, educación y bienestar canino en un entorno natural. Jilotepec, Estado de México.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458] mb-4">Navegación</div>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link to="/" className="hover:text-[#FAF6EC] transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-[#FAF6EC] transition-colors">Servicios</Link></li>
              <li><Link to="/nosotros" className="hover:text-[#FAF6EC] transition-colors">Nosotros</Link></li>
              <li><Link to="/tarifas" className="hover:text-[#FAF6EC] transition-colors">Tarifas</Link></li>
              <li><Link to="/contacto" className="hover:text-[#FAF6EC] transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#E0A458] mb-4">Contacto</div>
            <ul className="space-y-2.5 text-[14px]">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-1 text-[#E0A458]" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF6EC]">
                  +52 1 55 6205 8871
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-1 text-[#E0A458]" />
                <a href="mailto:v.silvestre.info@gmail.com" className="hover:text-[#FAF6EC] break-all">
                  v.silvestre.info@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-1 text-[#E0A458]" />
                <span>Jilotepec, Estado de México</span>
              </li>
            </ul>
            <div className="flex gap-2 mt-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#FAF6EC]/20 flex items-center justify-center hover:bg-[#FAF6EC] hover:text-[#2E3720] transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#FAF6EC]/20 flex items-center justify-center hover:bg-[#FAF6EC] hover:text-[#2E3720] transition-colors"
              >
                <Facebook size={14} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-[#FAF6EC]/20 flex items-center justify-center hover:bg-[#FAF6EC] hover:text-[#2E3720] transition-colors"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#FAF6EC]/60">
          <div>© {new Date().getFullYear()} Centro Canino Vereda Silvestre S.A.S. de C.V.</div>
          <div className="flex gap-5">
            <Link to="/aviso-privacidad" className="hover:text-[#FAF6EC]">Aviso de privacidad</Link>
            <Link to="/cookies" className="hover:text-[#FAF6EC]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}