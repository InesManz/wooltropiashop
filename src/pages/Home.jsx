import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { fetchProducts } from '../api/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Button from '../components/Button.jsx'
import Loader from '../components/Loader.jsx'

const VALUE_PROPS = [
  {
    title: 'Diseño algorítmico',
    text: 'Patrones generados y refinados a mano para piezas irrepetibles.',
  },
  {
    title: 'Materiales responsables',
    text: 'Lana de origen ético y PLA reciclado, elegidos por su tacto y durabilidad.',
  },
  {
    title: 'Hecho bajo demanda',
    text: 'Producimos cada pieza cuando la pides. Menos stock, menos residuo.',
  },
]

export default function Home() {
  // useEffect (dentro de useFetch) para traer los datos de la API.
  const { data: products, loading, error } = useFetch((signal) =>
    fetchProducts(signal),
  )
  const { addItem } = useCart()

  // Callback estable -> ProductCard (memo) no se re-renderiza de mas.
  const handleAdd = useCallback((product) => addItem(product, 1), [addItem])

  // Derivado memoizado: solo los destacados.
  const featured = useMemo(
    () => (products || []).filter((p) => p.featured).slice(0, 3),
    [products],
  )

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="label mb-4 text-xs text-secondary">
              Design · Connect · Craft
            </p>
            <h1 className="font-heading text-5xl leading-[1.05] text-on-background md:text-6xl">
              Artesanía cálida, <span className="text-primary">precisión</span>{' '}
              algorítmica.
            </h1>
            <p className="mt-6 max-w-md text-lg text-on-surface-variant">
              Cuencos de lana y accesorios de tejido, en cerámica y en impresión
              3D. Piezas con carácter para quienes aman hacer punto y ganchillo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/tienda" size="lg">
                Explorar la tienda
              </Button>
              <Button to="/dashboard" variant="outline" size="lg">
                Ver la App
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-surface-container shadow-ambient">
              <img
                src="/img/087ac3095e10b39dda7059314cb833bf.jpg"
                alt="Yarn bowl Kirby impreso en 3D con un ovillo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden w-40 rotate-[-6deg] overflow-hidden rounded-2xl bg-surface-container-lowest p-2 shadow-lift md:block">
              <img
                src="/img/5922540e13b461b48a055081ca44d133.jpg"
                alt="Cuenco de lana cerámico con asa"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="border-y border-outline-variant bg-surface-container-low">
        <div className="mx-auto grid max-w-content gap-8 px-5 py-14 md:grid-cols-3 md:px-16">
          {VALUE_PROPS.map((v) => (
            <div key={v.title}>
              <h3 className="font-heading text-xl text-on-background">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-16">
        <div className="mb-8 flex items-end justify-between border-b border-outline-variant pb-4">
          <h2 className="font-heading text-3xl text-on-background">Destacados</h2>
          <Link
            to="/tienda"
            className="label text-xs text-primary hover:underline"
          >
            Ver todo
          </Link>
        </div>

        {loading && <Loader label="Cargando destacados…" />}
        {error && <p className="py-10 text-center text-error">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
