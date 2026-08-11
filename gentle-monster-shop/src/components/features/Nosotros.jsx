export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-paper-soft border-y border-line">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div data-aos="fade-right" className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-paper to-paper-soft border border-line flex items-center justify-center">
          <img
            src="/products/07-oval-carey.png"
            alt="Detalle de los lentes MONARCH, colección Heritage"
            className="w-3/4 h-3/4 object-contain"
            loading="lazy"
          />
        </div>

        <div data-aos="fade-left">
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Nuestra visión</p>
          <h2 className="font-display font-light text-3xl sm:text-4xl leading-snug mb-6">
            Diseñamos lentes como si fueran esculturas para el rostro:
            <span className="italic text-accent"> audaces, precisas, inolvidables.</span>
          </h2>
          <p className="text-ink-soft leading-relaxed mb-6">
            Cada modelo nace de la intersección entre arquitectura, moda y tecnología óptica.
            Trabajamos con acetatos italianos y aleaciones ligeras para que cada pieza se sienta
            tan bien como se ve.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-line">
            <div>
              <p className="font-display text-3xl text-accent">22+</p>
              <p className="text-xs uppercase tracking-wider text-ink-soft mt-1">Modelos</p>
            </div>
            <div>
              <p className="font-display text-3xl text-accent">8</p>
              <p className="text-xs uppercase tracking-wider text-ink-soft mt-1">Colecciones</p>
            </div>
            <div>
              <p className="font-display text-3xl text-accent">100%</p>
              <p className="text-xs uppercase tracking-wider text-ink-soft mt-1">Protección UV</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
