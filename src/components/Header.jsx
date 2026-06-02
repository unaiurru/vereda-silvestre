import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

const WHATSAPP_URL = 'https://wa.me/5215562058871?text=' + encodeURIComponent('Hola, me gustaria reservar un servicio en Vereda Silvestre.')

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/tarifas', label: 'Tarifas' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, abrir } = useCarrito()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClass = scrolled
    ? 'bg-crema-clara/90 backdrop-blur-md border-b border-stone-200/60'
    : 'bg-crema-clara'

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'px-4 py-2 text-[14px] text-oliva font-medium transition-colors'
      : 'px-4 py-2 text-[14px] text-stone-600 hover:text-oliva transition-colors'

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'py-3 text-[15px] border-b border-stone-200/70 last:border-0 text-oliva font-medium'
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
            <div className="font-serif text-base text-brand">Vereda Silvestre</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-600">Centro Canino</div>
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
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-oliva text-crema-clara px-5 py-2.5 text-[13px] font-medium hover:bg-brand transition-colors"
          >
            <MessageCircle size={14} />
            Reservar
          </a>

          {/* Carrito */}
          <button
            onClick={abrir}
            className="relative w-11 h-11 text-brand flex items-center justify-center rounded-md hover:bg-oliva/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva transition-colors"
            aria-label={'Abrir carrito' + (totalItems > 0 ? ' (' + totalItems + ')' : '')}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-oliva text-crema-clara text-[10px] font-medium flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 -mr-2 text-brand flex items-center justify-center rounded-md hover:bg-oliva/5 transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={'lg:hidden overflow-hidden transition-all duration-300 bg-crema-clara ' + (open ? 'max-h-96 border-b border-stone-200' : 'max-h-0')}>
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