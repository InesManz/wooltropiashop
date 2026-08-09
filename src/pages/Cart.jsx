import { useCart } from '../context/CartContext.jsx'
import CartItem from '../components/CartItem.jsx'
import Button from '../components/Button.jsx'
import { formatPrice } from '../utils/format.js'

const SHIPPING = 4.95

export default function Cart() {
  const { items, subtotal, count, setQty, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-content px-5 py-24 text-center md:px-16">
        <h1 className="font-heading text-4xl text-on-background">
          Tu carrito está vacío
        </h1>
        <p className="mt-4 text-on-surface-variant">
          Aún no has añadido ninguna pieza.
        </p>
        <div className="mt-8">
          <Button to="/tienda" size="lg">
            Explorar la tienda
          </Button>
        </div>
      </div>
    )
  }

  const total = subtotal + SHIPPING

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-16">
      <h1 className="mb-8 font-heading text-4xl text-on-background md:text-5xl">
        Tu carrito
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Lista */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-outline-variant rounded-2xl bg-surface-container-lowest p-6 shadow-ambient">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQty={setQty}
                onRemove={removeItem}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 text-sm text-on-surface-variant underline hover:text-error"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <aside className="h-fit rounded-2xl bg-surface-container-lowest p-6 shadow-ambient">
          <h2 className="mb-4 font-heading text-2xl">Resumen</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">
                Subtotal ({count} art.)
              </span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Envío</span>
              <span className="font-semibold">{formatPrice(SHIPPING)}</span>
            </div>
            <div className="flex justify-between border-t border-outline-variant pt-3 text-base">
              <span className="font-heading">Total</span>
              <span className="font-heading text-primary">
                {formatPrice(total)}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Button to="/checkout" size="lg" className="w-full">
              Finalizar compra
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
