import { useState } from 'react'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '../../store/CartContext'
import { useAuth } from '../../store/AuthContext'

export default function Navbar({ onAbrirCarrito, onAbrirCuenta }) {
  const { cantidadTotal } = useCart()
  const { usuario, cerrarSesion } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuAbierto((v) => !v)}
            aria-label="Abrir menú"
            className="md:hidden text-ink"
          >
            {menuAbierto ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a href="#inicio" className="font-display text-xl tracking-tight">
            GM<span className="text-accent">STYLE</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-9 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          <a href="#catalogo" className="hover:text-accent transition-colors">Colección</a>
          <a href="#nosotros" className="hover:text-accent transition-colors">Nosotros</a>
          <a href="#contacto" className="hover:text-accent transition-colors">Contacto</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {usuario ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline text-sm text-ink-soft">
                Hola, <span className="text-accent">{usuario.nombre.split(' ')[0]}</span>
              </span>
              <button
                onClick={cerrarSesion}
                className="text-[11px] uppercase tracking-wider text-ink-soft/70 hover:text-accent transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={onAbrirCuenta}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider border border-line hover:border-accent hover:text-accent rounded-full px-3 sm:px-4 py-2 transition-colors"
            >
              <User size={14} /> <span className="hidden sm:inline">Iniciar sesión</span>
            </button>
          )}

          <button
            onClick={onAbrirCarrito}
            aria-label="Carrito de compras"
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-line hover:border-accent transition-colors"
          >
            <ShoppingBag size={17} />
            {cantidadTotal > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-paper text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cantidadTotal}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-5 text-sm uppercase tracking-wider text-ink-soft border-t border-line pt-4">
          <a href="#catalogo" onClick={() => setMenuAbierto(false)} className="py-2 hover:text-accent">Colección</a>
          <a href="#nosotros" onClick={() => setMenuAbierto(false)} className="py-2 hover:text-accent">Nosotros</a>
          <a href="#contacto" onClick={() => setMenuAbierto(false)} className="py-2 hover:text-accent">Contacto</a>
        </nav>
      )}
    </header>
  )
}
