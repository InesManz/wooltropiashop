import { useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { fetchProductBySlug } from '../api/products.js'
import { useCart } from '../context/CartContext.jsx'
import Button from '../components/Button.jsx'
import Chip from '../components/Chip.jsx'
import Rating from '../components/Rating.jsx'
import Loader from '../components/Loader.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { formatPrice } from '../utils/format.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  // Peticion dependiente del parametro de ruta: se relanza si cambia el slug.
  const { data: product, loading, error } = useFetch(
    (signal) => fetchProductBySlug(slug, signal),
    [slug],
  )

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = useCallback(() => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }, [addItem, product, qty])

  if (loading) return <Loader label="Cargando producto…" />
  if (error)
    return (
      <div className="mx-auto max-w-content px-5 py-24 text-center md:px-16">
        <p className="mb-6 text-error">{error}</p>
        <Button to="/tienda" variant="outline">
          Volver a la tienda
        </Button>
      </div>
    )

  return (
    <div className="mx-auto max-w-content px-5 py-10 md:px-16">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-on-surface-variant hover:text-primary"
      >
        ← Volver
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Imagen */}
        <div className="overflow-hidden rounded-3xl bg-surface-container shadow-ambient">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-3 flex items-center gap-3">
            <Chip>{product.category}</Chip>
            <Rating value={product.rating} />
          </div>

          <h1 className="font-heading text-4xl leading-tight text-on-background md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 font-heading text-3xl text-primary">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 text-on-surface-variant">{product.description}</p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-on-background">Material:</dt>
              <dd className="text-on-surface-variant">{product.material}</dd>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <dt className="font-semibold text-on-background">Colores:</dt>
              {product.colors.map((c) => (
                <Chip key={c} tone="brand">
                  {c}
                </Chip>
              ))}
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-on-background">Stock:</dt>
              <dd className="text-on-surface-variant">
                {product.stock} unidades
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
            <Button onClick={handleAdd} size="lg">
              {added ? '✓ Añadido' : 'Añadir al carrito'}
            </Button>
          </div>

          <Link
            to="/carrito"
            className="mt-4 text-sm text-on-surface-variant underline hover:text-primary"
          >
            Ir al carrito
          </Link>
        </div>
      </div>
    </div>
  )
}
