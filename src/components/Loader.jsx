// Indicador de carga reutilizable (estado loading de las peticiones).
export default function Loader({ label = 'Cargando…' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-24 text-on-surface-variant"
      role="status"
      aria-live="polite"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-surface-variant border-t-primary" />
      <p className="label text-xs">{label}</p>
    </div>
  )
}
