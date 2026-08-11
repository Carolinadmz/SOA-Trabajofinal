import { Plus } from 'lucide-react'
import { formatoMoneda } from '../../data/products'

export default function ProductCard({ producto, onAgregar, aosDelay = 0 }) {
  return (
    <article data-aos="fade-up" data-aos-delay={aosDelay} className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft mb-4">
        {producto.etiqueta && (
          <span className="absolute top-4 left-4 z-10 bg-paper/90 text-ink text-[10px] font-medium uppercase tracking-[0.15em] px-3 py-1.5">
            {producto.etiqueta}
          </span>
        )}
        <img
          src={producto.imagen}
          alt={`Lentes ${producto.nombre}, colección ${producto.coleccion}`}
          className="w-full h-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={() => onAgregar(producto)}
          aria-label={`Agregar ${producto.nombre} al carrito`}
          className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-paper text-ink shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ink hover:text-paper"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-accent mb-1">{producto.coleccion}</p>
          <h3 className="font-display text-lg">{producto.nombre}</h3>
          <p className="text-xs text-ink-soft mt-0.5">{producto.color}</p>
        </div>
        <span className="font-mono text-sm text-ink-soft pt-1">{formatoMoneda(producto.precio)}</span>
      </div>
    </article>
  )
}
