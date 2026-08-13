import { useState } from 'react'
// REQUISITO 7 (formulario útil): checkout gestionado con react-hook-form.
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import Button from '../components/Button.jsx'
import { formatPrice } from '../utils/format.js'

const SHIPPING = 4.95

// Campo de formulario reutilizable dentro de la pagina.
function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="label text-xs text-on-surface-variant">{label}</span>
      {children}
      {error && <span className="text-xs text-error">{error.message}</span>}
    </label>
  )
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [order, setOrder] = useState(null)

  // Formulario controlado con react-hook-form (registro + validacion).
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  // Si el carrito esta vacio y no hay pedido confirmado, redirige.
  if (items.length === 0 && !order) {
    return <Navigate to="/carrito" replace />
  }

  const onSubmit = async (data) => {
    // Simula el envio del pedido a un backend.
    await new Promise((r) => setTimeout(r, 800))
    const ref = 'WT-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    setOrder({ ref, name: data.name, email: data.email })
    clearCart()
  }

  // Pantalla de confirmacion.
  if (order) {
    return (
      <div className="mx-auto max-w-content px-5 py-24 text-center md:px-16">
        <div className="mx-auto max-w-lg rounded-3xl bg-surface-container-lowest p-10 shadow-ambient">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-3xl">
            ✓
          </div>
          <h1 className="font-heading text-3xl text-on-background">
            ¡Gracias, {order.name}!
          </h1>
          <p className="mt-4 text-on-surface-variant">
            Tu pedido{' '}
            <span className="font-semibold text-primary">{order.ref}</span> está
            confirmado. Te hemos enviado un email a {order.email} con los
            detalles.
          </p>
          <div className="mt-8">
            <Button to="/tienda" size="lg">
              Seguir comprando
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const inputClass =
    'h-12 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 text-sm outline-none focus:border-primary'
  const total = subtotal + SHIPPING

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-16">
      <h1 className="mb-8 font-heading text-4xl text-on-background md:text-5xl">
        Finalizar compra
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 lg:col-span-2"
          noValidate
        >
          <fieldset className="space-y-4 rounded-2xl bg-surface-container-lowest p-6 shadow-ambient">
            <legend className="font-heading text-xl">Datos de contacto</legend>
            <Field label="Nombre completo" error={errors.name}>
              <input
                className={inputClass}
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 2, message: 'Nombre demasiado corto' },
                })}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                className={inputClass}
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email no válido',
                  },
                })}
              />
            </Field>
          </fieldset>

          <fieldset className="space-y-4 rounded-2xl bg-surface-container-lowest p-6 shadow-ambient">
            <legend className="font-heading text-xl">Dirección de envío</legend>
            <Field label="Dirección" error={errors.address}>
              <input
                className={inputClass}
                {...register('address', {
                  required: 'La dirección es obligatoria',
                })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ciudad" error={errors.city}>
                <input
                  className={inputClass}
                  {...register('city', { required: 'Obligatorio' })}
                />
              </Field>
              <Field label="Código postal" error={errors.zip}>
                <input
                  className={inputClass}
                  {...register('zip', {
                    required: 'Obligatorio',
                    pattern: {
                      value: /^\d{4,5}$/,
                      message: 'Código postal no válido',
                    },
                  })}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-2xl bg-surface-container-lowest p-6 shadow-ambient">
            <legend className="font-heading text-xl">Pago</legend>
            <Field label="Número de tarjeta" error={errors.card}>
              <input
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                className={inputClass}
                {...register('card', {
                  required: 'Introduce una tarjeta',
                  pattern: {
                    value: /^[\d\s]{12,19}$/,
                    message: 'Número de tarjeta no válido',
                  },
                })}
              />
            </Field>
            <p className="text-xs text-on-surface-variant">
              Pago de demostración. No introduzcas datos reales.
            </p>
          </fieldset>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Procesando…' : `Pagar ${formatPrice(total)}`}
          </Button>
        </form>

        {/* Resumen */}
        <aside className="h-fit rounded-2xl bg-surface-container-lowest p-6 shadow-ambient">
          <h2 className="mb-4 font-heading text-2xl">Tu pedido</h2>
          <ul className="divide-y divide-outline-variant">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between py-2 text-sm">
                <span className="text-on-surface-variant">
                  {i.qty}× {i.name}
                </span>
                <span className="font-semibold">
                  {formatPrice(i.price * i.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-outline-variant pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Envío</span>
              <span>{formatPrice(SHIPPING)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-heading">Total</span>
              <span className="font-heading text-primary">
                {formatPrice(total)}
              </span>
            </div>
          </div>
          <Link
            to="/carrito"
            className="mt-4 block text-center text-sm text-on-surface-variant underline hover:text-primary"
          >
            Volver al carrito
          </Link>
        </aside>
      </div>
    </div>
  )
}
