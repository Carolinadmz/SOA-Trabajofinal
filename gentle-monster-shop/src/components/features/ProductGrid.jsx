import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { productos } from '../../data/products'
import ProductCard from './ProductCard'
import { useCart } from '../../store/CartContext'
import { useToast } from '../../store/ToastContext'

export default function ProductGrid() {
  const [busqueda, setBusqueda] = useState('')
  const [coleccion, setColeccion] = useState('Todas')
  const { agregarProducto } = useCart()
  const { mostrarToast } = useToast()

  const colecciones = useMemo(
    () => ['Todas', ...new Set(productos.map((p) => p.coleccion))],
    []
  )

  const filtrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideTexto =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.coleccion.toLowerCase().includes(busqueda.toLowerCase())
      const coincideColeccion = coleccion === 'Todas' || p.coleccion === coleccion
      return coincideTexto && coincideColeccion
    })
  }, [busqueda, coleccion])

  const manejarAgregar = (producto) => {
    agregarProducto(producto)
    mostrarToast(`${producto.nombre} se agregó al carrito`, 'success')
  }

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-6 py-24">
      <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-line pb-8">
        <div>
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">Catálogo</p>
          <h2 className="font-display text-4xl sm:text-5xl">Colección destacada</h2>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar modelo o colección..."
            aria-label="Buscar productos"
            className="w-full bg-transparent border-b border-line focus:border-accent pl-6 pr-2 py-2 text-sm outline-none transition-colors"
          />
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="80" className="flex gap-2 flex-wrap mb-12">
        {colecciones.map((c) => (
          <button
            key={c}
            onClick={() => setColeccion(c)}
            className={`text-[11px] uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors ${
              coleccion === c
                ? 'bg-ink text-paper border-ink'
                : 'border-line text-ink-soft hover:border-accent hover:text-accent'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-ink-soft py-16">No encontramos modelos con esos filtros. Intenta con otra búsqueda.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtrados.map((producto, i) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={manejarAgregar}
              aosDelay={(i % 3) * 100}
            />
          ))}
        </div>
      )}
    </section>
  )
}
