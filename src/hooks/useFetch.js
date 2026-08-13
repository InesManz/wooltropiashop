import { useEffect, useState } from 'react'

// REQUISITO 10 (custom hook) + REQUISITO 5 (useEffect para peticiones de datos).
// Ejecuta un fetcher dentro de useEffect y gestiona loading/error/data,
// cancelando la petición con AbortController al desmontar.
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
