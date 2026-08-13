// REQUISITO 6 (uso de una API): API REST propia con json-server (db.json).
// Endpoints /products y /products?slug=... consumidos con fetch; si la API no
// está levantada, se recurre al JSON local como fallback.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const FALLBACK = '/data/products.json'
const FAKE_LATENCY = 300 

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getJson(url, signal) {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

// Listado completo de productos (GET /products).
export async function fetchProducts(signal) {
  try {
    const data = await getJson(`${API_BASE}/products`, signal)
    await delay(FAKE_LATENCY)
    return data
  } catch (err) {
    if (err.name === 'AbortError') throw err
    // Fallback al JSON local
    return getJson(FALLBACK, signal)
  }
}

// Producto por slug.
export async function fetchProductBySlug(slug, signal) {
  try {
    const data = await getJson(
      `${API_BASE}/products?slug=${encodeURIComponent(slug)}`,
      signal,
    )
    if (Array.isArray(data) && data.length > 0) return data[0]
    throw new Error('Producto no encontrado en la API')
  } catch (err) {
    if (err.name === 'AbortError') throw err
    // Fallback: busca en el JSON local
    const all = await getJson(FALLBACK, signal)
    const product = all.find((p) => p.slug === slug)
    if (!product) throw new Error('Producto no encontrado')
    return product
  }
}
