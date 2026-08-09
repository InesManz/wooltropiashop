// Formateo de precios en euros (es-ES).
const formatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

export function formatPrice(value) {
  return formatter.format(value)
}
