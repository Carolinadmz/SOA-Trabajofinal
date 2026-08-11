import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../store/CartContext'
import { formatoMoneda } from '../../data/products'

export default function CartDrawer({ abierto, onCerrar, onIrACheckout }) {
  const { items, actualizarCantidad, eliminarProducto, total } = useCart()

  const envio = items.length === 0 ? 0 : total >= 3000 ? 0 : 149
  const totalConEnvio = total + envio

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          abierto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCerrar}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-paper border-l border-line z-50 transform transition-transform duration-300 flex flex-col ${
          abierto ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!abierto}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-xl">Tu carrito</h2>
          <button onClick={onCerrar} aria-label="Cerrar carrito" className="text-ink-soft hover:text-accent">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 text-ink-soft">
            <ShoppingBag size={40} className="mb-4 text-ink-soft/30" />
            <p>Tu carrito está vacío.</p>
            <p className="text-sm mt-1">Explora la colección y encuentra tu próximo par.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl border border-line overflow-hidden shrink-0 bg-paper-soft">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-medium truncate">{item.nombre}</h3>
                        <p className="text-xs text-ink-soft">{item.color}</p>
                      </div>
                      <button
                        onClick={() => eliminarProducto(item.id)}
                        aria-label={`Eliminar ${item.nombre}`}
                        className="text-ink-soft/50 hover:text-danger shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-line rounded-full px-2 py-1">
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          aria-label="Disminuir cantidad"
                          className="text-ink-soft hover:text-accent"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-sm w-4 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          aria-label="Aumentar cantidad"
                          className="text-ink-soft hover:text-accent"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="font-mono text-sm">{formatoMoneda(item.precio * item.cantidad)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5 space-y-2">
              <div className="flex justify-between text-sm text-ink-soft">
                <span>Subtotal</span>
                <span className="font-mono">{formatoMoneda(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-soft">
                <span>Envío</span>
                <span className="font-mono">{envio === 0 ? 'Gratis' : formatoMoneda(envio)}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-2 border-t border-line mt-2">
                <span>Total</span>
                <span className="font-mono text-accent">{formatoMoneda(totalConEnvio)}</span>
              </div>

              <button
                onClick={onIrACheckout}
                className="w-full bg-accent text-paper font-medium rounded-full py-3 mt-4 hover:bg-accent/80 transition-colors"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
