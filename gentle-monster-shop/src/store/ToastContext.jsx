import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null)

  const mostrarToast = useCallback((mensaje, tipo = 'info') => {
    clearTimeout(timeoutRef.current)
    setToast({ mensaje, tipo, id: Date.now() })
    timeoutRef.current = setTimeout(() => setToast(null), 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {toast && (
          <div
            className={`px-5 py-3 rounded-full text-sm font-medium shadow-xl border backdrop-blur-md ${
              toast.tipo === 'error'
                ? 'bg-danger/10 border-danger/30 text-danger'
                : toast.tipo === 'success'
                ? 'bg-success/10 border-success/30 text-success'
                : 'bg-paper border-accent/30 text-ink'
            }`}
          >
            {toast.mensaje}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx
}
