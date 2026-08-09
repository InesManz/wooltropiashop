// Estrellas de valoracion (solo lectura).
export default function Rating({ value = 0, className = '' }) {
  const rounded = Math.round(value)
  return (
    <span
      className={`inline-flex items-center gap-1 text-secondary ${className}`}
      aria-label={`Valoración ${value} de 5`}
      title={`${value} / 5`}
    >
      <span aria-hidden="true">
        {'★'.repeat(rounded)}
        <span className="text-outline-variant">{'★'.repeat(5 - rounded)}</span>
      </span>
      <span className="text-xs font-semibold text-on-surface-variant">
        {value.toFixed(1)}
      </span>
    </span>
  )
}
