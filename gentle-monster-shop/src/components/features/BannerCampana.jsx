export default function BannerCampana() {
  return (
    <section className="relative h-[70vh] min-h-[420px] overflow-hidden bg-ink flex items-center">
      <img
        src="/products/09-shield-plata-lila.png"
        alt="Campaña GM Style: lentes NOVA de la colección Studio"
        className="absolute inset-0 w-full h-full object-cover opacity-70 scale-125"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />

      <div className="relative z-10 w-full px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-aos="fade-up" className="text-paper/70 text-xs uppercase tracking-[0.3em] mb-3">
          Campaña Studio
        </p>
        <h2
          data-aos="fade-up"
          data-aos-delay="80"
          className="font-display font-light italic text-paper text-4xl sm:text-6xl max-w-2xl leading-tight"
        >
          Cada mirada cuenta una historia distinta.
        </h2>
      </div>
    </section>
  )
}
