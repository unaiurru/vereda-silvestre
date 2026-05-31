import { Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import ServicioDetalle from './pages/ServicioDetalle'
import Tienda from './pages/Tienda'
import ProductoDetalle from './pages/ProductoDetalle'
import Unete from './pages/Unete'
import Nosotros from './pages/Nosotros'
import Tarifas from './pages/Tarifas'
import Contacto from './pages/Contacto'
import AvisoPrivacidad from './pages/AvisoPrivacidad'
import Cookies from './pages/Cookies'

export default function App() {
  return (
    <CarritoProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="servicios/:slug" element={<ServicioDetalle />} />
          <Route path="tienda" element={<Tienda />} />
          <Route path="tienda/:id" element={<ProductoDetalle />} />
          <Route path="unete" element={<Unete />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="tarifas" element={<Tarifas />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="aviso-privacidad" element={<AvisoPrivacidad />} />
          <Route path="cookies" element={<Cookies />} />
        </Route>
      </Routes>
    </CarritoProvider>
  )
}
