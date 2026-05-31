/* eslint-disable react-refresh/only-export-components */
// Este archivo exporta el provider (componente) y el hook useCarrito juntos a
// propósito. Desactivamos la regla de fast-refresh porque conviven bien aquí.
import { createContext, useContext, useReducer, useEffect, useState } from 'react'

const STORAGE_KEY = 'vereda-carrito-v1'

const CarritoContext = createContext(null)

// Estado: { items: [{ productoId, cantidad }] }
const estadoInicial = { items: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'agregar': {
      const existe = state.items.find((i) => i.productoId === action.productoId)
      if (existe) {
        return {
          items: state.items.map((i) =>
            i.productoId === action.productoId
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { productoId: action.productoId, cantidad: 1 }] }
    }
    case 'quitar':
      return { items: state.items.filter((i) => i.productoId !== action.productoId) }
    case 'cambiarCantidad': {
      const cantidad = Math.max(1, action.cantidad)
      return {
        items: state.items.map((i) =>
          i.productoId === action.productoId ? { ...i, cantidad } : i
        ),
      }
    }
    case 'vaciar':
      return { items: [] }
    case 'hidratar':
      return { items: action.items }
    default:
      return state
  }
}

// Lee el estado persistido en localStorage de forma segura.
function leerStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return estadoInicial
    const parsed = JSON.parse(raw)
    if (parsed && Array.isArray(parsed.items)) return { items: parsed.items }
  } catch {
    // localStorage no disponible o JSON corrupto: empezamos vacío.
  }
  return estadoInicial
}

export function CarritoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, estadoInicial, leerStorage)
  const [abierto, setAbierto] = useState(false)

  // Persistir en cada cambio.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Si no hay localStorage, el carrito sigue funcionando en memoria.
    }
  }, [state])

  const value = {
    items: state.items,
    totalItems: state.items.reduce((acc, i) => acc + i.cantidad, 0),
    agregar: (productoId) => dispatch({ type: 'agregar', productoId }),
    quitar: (productoId) => dispatch({ type: 'quitar', productoId }),
    cambiarCantidad: (productoId, cantidad) =>
      dispatch({ type: 'cambiarCantidad', productoId, cantidad }),
    vaciar: () => dispatch({ type: 'vaciar' }),
    // Estado del drawer lateral.
    abierto,
    abrir: () => setAbierto(true),
    cerrar: () => setAbierto(false),
  }

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return ctx
}
