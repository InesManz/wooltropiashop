import { Link } from 'react-router-dom'

const FOOTER_LINKS = ['Sobre nosotros', 'Envíos y devoluciones', 'Privacidad', 'Contacto']

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-5 py-14 md:grid-cols-4 md:px-16">
        <div className="md:col-span-2">
          <Link to="/" className="mb-4 block">
            <img src="/logo.png" alt="Wooltropia" className="h-10 w-auto" />
          </Link>
          <p className="max-w-sm text-sm text-on-surface-variant">
            © {new Date().getFullYear()} Wooltropia. Handcrafted by machines,
            designed for makers.
          </p>
        </div>
        <nav className="flex flex-col gap-3 md:col-span-2 md:flex-row md:justify-end md:gap-8">
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="label text-xs text-on-surface-variant transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
