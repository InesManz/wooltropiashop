import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Tienda' },
  { to: '/dashboard', label: 'App' },
]

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false) // estado del menu movil

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-primary font-bold border-b-2 border-primary pb-1'
      : 'text-on-surface-variant font-medium hover:text-primary transition-colors'

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-5 md:px-16">
        <Link to="/" className="block" aria-label="Wooltropia inicio">
          <img src="/logo.png" alt="Wooltropia" className="h-10 w-auto" />
        </Link>

        {/* Navegacion escritorio */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/carrito"
            className="relative text-primary transition-transform hover:scale-95"
            aria-label={`Carrito, ${count} artículos`}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-on-primary">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="text-primary md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu movil desplegable */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-outline-variant bg-background px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className="py-2 font-medium text-on-surface-variant"
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
