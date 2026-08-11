import { createContext, useContext, useState, useCallback } from 'react'
import { obtenerSesion, cerrarSesion as cerrarSesionApi } from '../lib/mockApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => obtenerSesion())

  const iniciarSesionLocal = useCallback((sesion) => {
    setUsuario(sesion)
  }, [])

  const cerrarSesion = useCallback(() => {
    cerrarSesionApi()
    setUsuario(null)
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesionLocal, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
