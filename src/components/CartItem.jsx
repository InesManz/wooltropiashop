import { memo } from 'react'
import { Link } from 'react-router-dom'
import QuantityStepper from './QuantityStepper.jsx'
import { formatPrice } from '../utils/format.js'

// Linea del carrito. Memoizada: cada fila solo se re-renderiza si cambia su item.
function CartItem({ item, onQty, onRemove }) {
  return (
    <div className="flex gap-4 py-4">
      <Link
        to={`/producto/${item.slug}`}
        className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-heading text-lg leading-tight">{item.name}</h4>
            <p className="text-xs text-on-surface-variant">{item.material}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-xs text-on-surface-variant underline hover:text-error"
          >
            Quitar
          </button>
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper
            value={item.qty}
            onChange={(qty) => onQty(item.id, qty)}
          />
          <span className="font-semibold text-primary">
            {formatPrice(item.price * item.qty)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
