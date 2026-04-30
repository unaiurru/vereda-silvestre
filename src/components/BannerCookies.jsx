import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

const COOKIE_KEY = 'vs_cookies_aceptadas'

export default function BannerCookies() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Mostrar si no se ha aceptado antes
    try {
      const aceptadas = localStorage.getItem(COOKIE_KEY)
      if (!aceptadas) {
        // Pequeño retraso para que no aparezca de golpe al cargar
        const t = setTimeout(() => setVisible(true), 600)
        return () => clearTimeout(t)
      }
    } catch (e) {
      // Si localStorage no está disponible, mostramos el banner igualmente
      setVisible(true)
    }
  }, [])

  const aceptar = () => {
    try {
      localStorage.setItem(COOKIE_KEY, 'true')
    } catch (e) {
      // ignorar
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 md:p-5 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="rounded-2xl bg-[#2E3720] text-[#FAF6EC] shadow-2xl shadow-stone-900/30 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="hidden md:flex w-11 h-11 rounded-xl bg-[#FAF6EC]/10 shrink-0 items-center justify-center">
            <Cookie size={20} strokeWidth={1.7} />
          </div>
          <div className="flex-1 text-[13px] md:text-[14px] leading-relaxed">
            <div className="md:hidden flex items-center gap-2 mb-2">
              <Cookie size={16} />
              <span className="font-medium">Cookies</span>
            </div>
            <p>
              Usamos cookies técnicas necesarias para que la web funcione bien.
              No usamos cookies de publicidad ni de seguimiento. Consulta nuestra{' '}
              <Link
                to="/cookies"
                className="underline underline-offset-2 hover:text-white"
                onClick={() => setVisible(false)}
              >
                política de cookies
              </Link>{' '}
              y el{' '}
              <Link
                to="/aviso-privacidad"
                className="underline underline-offset-2 hover:text-white"
                onClick={() => setVisible(false)}
              >
                aviso de privacidad
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={aceptar}
              className="flex-1 md:flex-none rounded-full bg-[#FAF6EC] text-[#2E3720] px-6 py-2.5 text-[13px] font-medium hover:bg-white transition-colors whitespace-nowrap"
            >
              Aceptar y continuar
            </button>
            <button