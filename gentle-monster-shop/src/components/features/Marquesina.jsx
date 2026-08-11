const COLECCIONES = ['Nightwalk', 'Gold Line', 'Angular', 'Minimal', 'Desert', 'Ocean', 'Heritage', 'Studio']

export default function Marquesina() {
  const texto = COLECCIONES.join('  ✦  ') + '  ✦  '

  return (
    <div className="border-y border-line bg-ink overflow-hidden py-4">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        <span className="text-paper text-sm uppercase tracking-[0.3em] pr-6">{texto.repeat(3)}</span>
        <span className="text-paper text-sm uppercase tracking-[0.3em] pr-6" aria-hidden="true">{texto.repeat(3)}</span>
      </div>
    </div>
  )
}
