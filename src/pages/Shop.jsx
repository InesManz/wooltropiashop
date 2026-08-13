import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '../hooks/useFetch.js'
import { fetchProducts } from '../api/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Loader from '../components/Loader.jsx'

const SORTS = {
  featured: 'Destacados',
  'price-asc': 'Precio: menor a mayor',
  'price-desc': 'Precio: mayor a menor',
  rating: 'Mejor valorados',
}

// Orden en el que se muestran las secciones (chips y bloques de la tienda).
const SECTION_ORDER = [
  'Cuencos',
  'Portaovillos',
  'Marcadores',
  'Medición',
  'Topes',
  'Accesorios',
  'Personalizados',
]

export default function Shop() {
  // Peticion de datos (useEffect via useFetch).
  const { data: products, loading, error } = useFetch((signal) =>
    fetchProducts(signal),
  )
  const { addItem } = useCart()

  // Estados de la pagina (filtros de la tienda).
  // REQUISITO 4 (varios estados con sentido): búsqueda, categoría y orden.
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('featured')

  const handleAdd = useCallback((product) => addItem(product, 1), [addItem])

  // Categorias derivadas de los datos, ordenadas segun SECTION_ORDER.
  const categories = useMemo(() => {
    const set = new Set((products || []).map((p) => p.category))
    const ordered = SECTION_ORDER.filter((c) => set.has(c))
    const rest = [...set].filter((c) => !SECTION_ORDER.includes(c))
    return ['Todos', ...ordered, ...rest]
  }, [products])

  // Lista filtrada y ordenada, memoizada: solo se recalcula si cambian
  // los datos o los filtros, no en cada render.
  const visible = useMemo(() => {
    let list = products || []
    if (category !== 'Todos') list = list.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q),
      )
    }
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return sorted
  }, [products, category, query, sort])

  // Cuando no hay filtro ni búsqueda, mostramos la tienda agrupada por secciones.
  const showSections = category === 'Todos' && !query.trim()
  const sections = useMemo(() => {
    const order = categories.filter((c) => c !== 'Todos')
    return order
      .map((name) => ({ name, items: visible.filter((p) => p.category === name) }))
      .filter((s) => s.items.length > 0)
  }, [categories, visible])

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-16">
      <header className="mb-8">
        <h1 className="font-heading text-4xl text-on-background md:text-5xl">
          La tienda
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-on-surface-variant">
          Cuencos de lana y accesorios de tejido, en cerámica y en impresión 3D,
          para makers de punto y ganchillo.
        </p>
      </header>

      {/* Barra de filtros */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                category === c
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o material…"
            aria-label="Buscar productos"
            className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-sm outline-none focus:border-primary"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar"
            className="h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 text-sm outline-none focus:border-primary"
          >
            {Object.entries(SORTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <Loader label="Cargando productos…" />}
      {error && <p className="py-16 text-center text-error">{error}</p>}

      {!loading && !error && visible.length === 0 && (
        <p className="py-16 text-center text-on-surface-variant">
          No hay resultados para tu búsqueda.
        </p>
      )}

      {/* Vista por secciones (sin filtro ni búsqueda) */}
      {!loading && !error && visible.length > 0 && showSections && (
        <div className="space-y-14">
          {sections.map((s) => (
            <section key={s.name}>
              <div className="mb-5 flex items-baseline justify-between border-b border-outline-variant pb-2">
                <h2 className="font-heading text-2xl text-on-background md:text-3xl">
                  {s.name}
                </h2>
                <span className="text-xs text-on-surface-variant">
                  {s.items.length} art.
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {s.items.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={handleAdd} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Vista plana (con filtro o búsqueda activos) */}
      {!loading && !error && visible.length > 0 && !showSections && (
        <>
          <p className="mb-4 text-sm text-on-surface-variant">
            {visible.length} producto{visible.length !== 1 && 's'}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
