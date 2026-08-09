// Etiqueta / chip para categorias y materiales.
const TONES = {
  neutral: 'bg-surface-container-high text-on-surface',
  brand: 'bg-secondary-fixed text-on-secondary-fixed',
  accent: 'bg-secondary-container text-on-secondary-container',
}

export default function Chip({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
