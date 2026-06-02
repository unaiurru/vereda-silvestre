import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { negocio, waLink } from '../data/negocio'

const WHATSAPP_URL = waLink()
const INSTAGRAM_URL = negocio.instagram
const FACEBOOK_URL = negocio.facebook

export default function Footer() {
  return (
    <footer className="bg-brand text-crema-clara/80 mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-crema-clara/15">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Vereda Silvestre"
                className="w-12 h-12 object-contain rounded-full bg-crema-clara p-0.5"
              />
              <div>
                <div className="font-serif text-lg text-crema-clara">Vereda Silvestre</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-dorado">Centro Canino</div>
              </div>
            </div>
            <p className="text-[13.5px] leading-relaxed max-w-xs">
              Cuidado, educación y bienestar canino en un entorno natural. Jilotepec, Estado de México.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-dorado mb-4">Navegación</div>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link to="/" className="hover:text-crema-clara transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-crema-clara transition-colors">Servicios</Link></li>
              <li><Link to="/tienda" className="hover:text-crema-clara transition-colors">Tienda</Link></li>
              <li><Link to="/nosotros" className="hover:text-crema-clara transition-colors">Nosotros</Link></li>
              <li><Link to="/tarifas" className="hover:text-crema-clara transition-colors">Tarifas</Link></li>
              <li><Link to="/unete" className="hover:text-crema-clara transition-colors">Únete</Link></li>
              <li><Link to="/contacto" className="hover:text-crema-clara transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-dorado mb-4">Contacto</div>
            <ul className="space-y-2.5 text-[14px]">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-1 text-dorado" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-crema-clara">
                  {negocio.telefonoVisible}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-1 text-dorado" />
                <a href={`mailto:${negocio.email}`} className="hover:text-crema-clara break-all">
                  {negocio.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-1 text-dorado" />
                <span>{negocio.ciudad}</span>
              </li>
            </ul>
            <div className="flex gap-2 mt-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-crema-clara/20 flex items-center justify-center hover:bg-crema-clara hover:text-brand transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-crema-clara/20 flex items-center justify-center hover:bg-crema-clara hover:text-brand transition-colors"
              >
                <Facebook size={14} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-crema-clara/20 flex items-center justify-center hover:bg-crema-clara hover:text-brand transition-colors"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-crema-clara/60">
          <div>© {new Date().getFullYear()} {negocio.nombreLegal}</div>
          <div className="flex gap-5">
            <Link to="/aviso-privacidad" className="hover:text-crema-clara">Aviso de privacidad</Link>
            <Link to="/cookies" className="hover:text-crema-clara">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}