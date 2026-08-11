import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ abierto, onCerrar, children, ancho = 'max-w-md' }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!abierto) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', onKeyDown)
    modalRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar()
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${ancho} bg-paper border border-line rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto focus:outline-none`}
      >
        <button
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute top-5 right-5 text-ink-soft hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}
