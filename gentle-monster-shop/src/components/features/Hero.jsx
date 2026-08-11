import Hero3D from './Hero3D'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(173,138,83,0.12),transparent_55%)]" />

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">
        <div data-aos="fade-right" data-aos-duration="800">
          <p className="text-accent text-xs uppercase tracking-[0.35em] mb-5">Colección 2026</p>
          <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            Visión audaz.
          </h1>
          <h1 className="font-display italic font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-accent mb-6">
            Estilo sin límites.
          </h1>
          <p className="text-ink-soft text-base sm:text-lg max-w-md mb-8 leading-relaxed">
            Descubre la colección de lentes con diseño interactivo. Gira, explora y enamórate del detalle.
          </p>
          <a
            href="#catalogo"
            className="inline-block bg-ink text-paper text-sm uppercase tracking-widest font-medium px-9 py-4 hover:bg-accent transition-colors"
          >
            Ver colección
          </a>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="150"
          className="h-[360px] sm:h-[480px] lg:h-[560px]"
        >
          <Hero3D />
        </div>
      </div>
    </section>
  )
}
