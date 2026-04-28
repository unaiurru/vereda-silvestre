import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/5215562058871?text=' + encodeURIComponent('Hola, me gustaria reservar un servicio en Vereda Silvestre.')

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/tarifas', label: 'Tarifas' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClass = scrolled
    ? 'bg-[#FAF6EC]/90 backdrop-blur-md border-b border-stone-200/60'
    : 'bg-[#FAF6EC]'

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'px-4 py-2 text-[14px] text-[#3F4A2A] font-medium transition-colors'
      : 'px-4 py-2 text-[14px] text-stone-600 hover:text-[#3F4A2A] transition-colors'

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'py-3 text-[15px] border-b border-stone-200/70 last:border-0 text-[#3F4A2A] font-medium'
      : 'py-3 text-[15px] border-b border-stone-200/70 last:border-0 text-stone-700'

  return (
    <header className={'sticky top-0 z-40 transition-all duration-300 ' + headerClass}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Vereda Silvestre"
            className="w-12 h-12 object-contain rounded-full"
          />
          <div className="leading-tight hidden sm:block">
            <div className="font-serif text-base text-[#2E3720]">Vereda Silvestre</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Centro Canino</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#3F4A2A] text-[#FAF6EC] px-5 py-2.5 text-[13px] font-medium hover:bg-[#2E3720] transition-colors"
          >
            <MessageCircle size={14} />
            Reservar
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2 text-[#2E3720]"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={'lg:hidden overflow-hidden transition-all duration-300 bg-[#FAF6EC] ' + (open ? 'max-h-96 border-b border-stone-200' : 'max-h-0')}>
        <nav className="px-5 py-3 flex flex-col">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={mobileLinkClass}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}