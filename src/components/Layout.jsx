import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import BannerCookies from './BannerCookies'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EC] text-stone-800 font-sans">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BannerCookies />
    </div>
  )
}