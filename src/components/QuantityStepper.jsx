// Selector de cantidad reutilizable (usado en la ficha y en el carrito).
export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="inline-flex items-center rounded-xl border border-outline-variant">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
        className="h-10 w-10 text-lg text-on-surface-variant hover:text-primary disabled:opacity-40"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className="h-10 w-10 text-lg text-on-surface-variant hover:text-primary disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}
