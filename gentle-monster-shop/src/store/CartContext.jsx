import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

const CartContext = createContext(null)
const CLAVE_CARRITO = 'gmstyle_carrito'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items))
  }, [items])

  const agregarProducto = useCallback((producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === producto.id)
      if (existente) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
  }, [])

  const actualizarCantidad = useCallback((id, cantidad) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
    )
  }, [])

  const eliminarProducto = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const vaciarCarrito = useCallback(() => setItems([]), [])

  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [items]
  )
  const cantidadTotal = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, agregarProducto, actualizarCantidad, eliminarProducto, vaciarCarrito, total, cantidadTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
