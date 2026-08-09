import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-5 py-32 text-center md:px-16">
      <p className="font-heading text-7xl text-primary">404</p>
      <h1 className="mt-4 font-heading text-3xl text-on-background">
        Página no encontrada
      </h1>
      <p className="mt-3 text-on-surface-variant">
        La página que buscas no existe o se ha movido.
      </p>
      <div className="mt-8">
        <Button to="/" size="lg">
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}
