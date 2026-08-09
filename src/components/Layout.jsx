import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

// Layout comun a todas las rutas: navbar fija + contenido + footer.
// Usa <Outlet /> de react-router para inyectar la pagina activa.
export default function Layout() {
  const { pathname } = useLocation()

  // Al cambiar de ruta, subimos el scroll al inicio.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
