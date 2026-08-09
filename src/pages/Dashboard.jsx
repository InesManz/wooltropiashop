import { Link } from 'react-router-dom'
import Chip from '../components/Chip.jsx'

// Panel "App" portado desde el code.html original a JSX + tokens de marca.
const PROJECTS = [
  {
    name: 'Yarn Bowl Bulbasaur',
    image: '/img/afef35a7199a2d74b7609febb9aee21e.jpg',
    material: 'PLA Verde',
    progress: 85,
    eta: '2 h 15 min',
    status: 'done',
  },
  {
    name: 'Yarn Bowl Pez Globo',
    image: '/img/53353115ea194681af2258725125c815.jpg',
    material: 'PLA Blanco',
    progress: 30,
    eta: '14 h 30 min',
    status: 'sync',
  },
]

function QuickAction({ children, primary }) {
  return (
    <button
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 label text-sm transition-colors ${
        primary
          ? 'bg-primary text-on-primary hover-lift'
          : 'border border-secondary text-secondary hover:bg-surface-container-low'
      }`}
    >
      {children}
    </button>
  )
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-16 md:py-16">
      <header className="mb-12">
        <h1 className="mb-4 font-heading text-4xl text-on-background md:text-5xl">
          Tu panel
        </h1>
        <p className="max-w-2xl text-lg text-on-surface-variant">
          Gestiona tus proyectos de impresión 3D en curso, explora nuevos
          patrones algorítmicos y sigue tu progreso creativo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Acciones rapidas */}
        <section className="flex flex-col gap-3 rounded-3xl bg-surface-container-lowest p-6 shadow-ambient md:col-span-4">
          <h2 className="mb-4 font-heading text-2xl">Acciones rápidas</h2>
          <QuickAction primary>＋ Empezar un proyecto</QuickAction>
          <QuickAction>▦ Ver patrones</QuickAction>
          <QuickAction>▤ Seguir progreso</QuickAction>
        </section>

        {/* Proyectos activos */}
        <section className="rounded-3xl bg-surface-container-lowest p-6 shadow-ambient md:col-span-8 md:p-8">
          <div className="mb-6 flex items-end justify-between border-b border-outline-variant pb-4">
            <h2 className="font-heading text-2xl">Proyectos activos</h2>
            <Link
              to="/tienda"
              className="label text-xs text-primary hover:underline"
            >
              Ver todo
            </Link>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((p) => (
              <article
                key={p.name}
                className="flex flex-col gap-6 rounded-xl border border-transparent p-4 transition-colors hover:border-surface-variant hover:bg-surface-container-low md:flex-row"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-surface-container md:w-32">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-grow flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-heading text-xl">{p.name}</h3>
                      <Chip tone={p.status === 'done' ? 'accent' : 'neutral'}>
                        {p.status === 'done' ? '✓' : '⟳'} {p.progress}%
                      </Chip>
                    </div>
                    <p className="mb-4 text-sm text-on-surface-variant">
                      Material:{' '}
                      <Chip tone="brand" className="ml-1">
                        {p.material}
                      </Chip>
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 h-2 w-full rounded-full bg-surface-variant">
                      <div
                        className={`h-2 rounded-full ${
                          p.status === 'done' ? 'bg-primary' : 'bg-secondary'
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-on-surface-variant">
                      Finalización est.: {p.eta}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
