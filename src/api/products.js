// Capa de acceso a datos (API).
// Los productos se sirven como un endpoint JSON (public/data/products.json) y se
// consumen con fetch. Se centraliza aqui para que las paginas no conozcan la URL.
// Se anade una pequena latencia simulada para poder mostrar estados de carga reales.

const ENDPOINT = '/data/products.json'
const FAKE_LATENCY = 500 // ms, para que el estado "loading" sea visible

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Devuelve el listado completo de productos.
export async function fetchProducts(signal) {
  const res = await fetch(ENDPOINT, { signal })
  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar los productos`)
  }
  const data = await res.json()
  await delay(FAKE_LATENCY)
  return data
}

// Devuelve un producto por su slug (usado en la ficha de producto).
export async function fetchProductBySlug(slug, signal) {
  const products = await fetchProducts(signal)
  const product = products.find((p) => p.slug === slug)
  if (!product) {
    throw new Error('Producto no encontrado')
  }
  return product
}
