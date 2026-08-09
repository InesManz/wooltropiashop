import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

// -----------------------------------------------------------------------------
// Estado global del carrito mediante useContext + useReducer.
// Cualquier pagina/componente accede al carrito con el hook useCart() sin
// prop-drilling. El reducer centraliza toda la logica de mutacion.
// -----------------------------------------------------------------------------

const CartContext = createContext(null)

const STORAGE_KEY = 'wooltropia-cart'

// Estado inicial: intenta rehidratar desde localStorage.
function init() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : { items: [] }
  } catch {
    return { items: [] }
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, qty = 1 } = action
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + qty } : i,
          ),
        }
      }
      return { items: [...state.items, { ...product, qty }] }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'SET_QTY':
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i,
          )
          .filter((i) => i.qty > 0),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, init)

  // Persistimos el carrito en cada cambio.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Acciones memoizadas: identidad estable -> evita re-renders innecesarios
  // en los consumidores que las reciben como props/callbacks.
  const addItem = useCallback(
    (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
    [],
  )
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE', id }), [])
  const setQty = useCallback(
    (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  // Valores derivados memoizados.
  const { count, subtotal } = useMemo(() => {
    return state.items.reduce(
      (acc, i) => {
        acc.count += i.qty
        acc.subtotal += i.qty * i.price
        return acc
      },
      { count: 0, subtotal: 0 },
    )
  }, [state.items])

  // El value se memoiza para no crear un objeto nuevo en cada render del provider.
  const value = useMemo(
    () => ({
      items: state.items,
      count,
      subtotal,
      addItem,
      removeItem,
      setQty,
      clearCart,
    }),
    [state.items, count, subtotal, addItem, removeItem, setQty, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook de consumo. Lanza si se usa fuera del provider (error temprano y claro).
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de <CartProvider>')
  }
  return ctx
}
