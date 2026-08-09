import { memo } from 'react'
import { Link } from 'react-router-dom'
import Chip from './Chip.jsx'
import Rating from './Rating.jsx'
import { formatPrice } from '../utils/format.js'

// Tarjeta de producto reutilizable.
// Envuelta en React.memo: solo se vuelve a renderizar si cambian sus props.
// Como en Shop pasamos un `onAdd` estable (useCallback), el grid completo no
// se re-renderiza al actualizarse otros estados de la pagina.
function ProductCard({ product, onAdd }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-ambient hover-lift">
      <Link
        to={`/producto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-surface-container"
        aria-label={`Ver ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock <= 5 && (
          <span className="absolute left-3 top-3">
            <Chip tone="accent">Últimas {product.stock}</Chip>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <Chip>{product.category}</Chip>
          <Rating value={product.rating} />
        </div>

        <h3 className="font-heading text-xl leading-tight text-on-background">
          <Link to={`/producto/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-on-surface-variant">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-heading text-2xl text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="label rounded-xl bg-primary px-4 py-2 text-xs text-on-primary transition-colors hover:bg-primary-container"
          >
            Añadir
          </button>
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
