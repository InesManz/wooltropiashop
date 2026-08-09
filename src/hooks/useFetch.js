import { useEffect, useState } from 'react'

// Custom hook reutilizable para peticiones de datos.
// Ejecuta el `fetcher` dentro de un useEffect, gestiona los estados
// loading / error / data y cancela la peticion si el componente se desmonta
// (AbortController) evitando actualizaciones de estado sobre componentes muertos.
//
// @param {(signal: AbortSignal) => Promise<any>} fetcher  funcion asincrona
// @param {Array} deps  dependencias que, al cambiar, relanzan la peticion
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoading(true)
    setError(null)

    fetcher(controller.signal)
      .then((result) => {
        if (active) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        // Ignoramos los aborts intencionados
        if (err.name === 'AbortError') return
        if (active) {
          setError(err.message || 'Ha ocurrido un error')
          setLoading(false)
        }
      })

    return () => {
      active = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
