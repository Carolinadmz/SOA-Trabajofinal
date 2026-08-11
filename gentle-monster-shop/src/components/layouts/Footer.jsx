import { Mail, Phone, MessageCircle, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-line bg-paper">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl mb-3">GM<span className="text-accent">STYLE</span></p>
          <p className="text-sm text-ink-soft leading-relaxed">
            Lentes de diseño inspirados en la visión audaz de Gentle Monster. Proyecto académico de e-commerce.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Atención al cliente</p>
          <ul className="space-y-3 text-sm text-ink-soft">
            <li className="flex items-center gap-2"><MessageCircle size={15} className="text-accent" /> WhatsApp: 55 1234 5678</li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-accent" /> hola@gmstyle.com</li>
            <li className="flex items-center gap-2"><Phone size={15} className="text-accent" /> 800 123 4567</li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Políticas</p>
          <ul className="space-y-2.5 text-sm text-ink-soft">
            <li><a href="#" className="hover:text-accent transition-colors">Envíos y entregas</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Cambios y devoluciones</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Garantía</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Términos y condiciones</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Aviso de privacidad</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Compra protegida</p>
          <div className="flex items-center gap-2 text-sm text-ink-soft mb-2">
            <ShieldCheck size={16} className="text-accent" /> Conexión cifrada HTTPS/SSL
          </div>
          <p className="text-sm text-ink-soft">Cumplimos con RGPD / LFPDPPP para la protección de tus datos.</p>
        </div>
      </div>

      <div className="border-t border-line py-6 text-center text-xs text-ink-soft">
        © 2026 GM STYLE — Inspirado en el diseño visionario de Gentle Monster. Proyecto académico de e-commerce.
      </div>
    </footer>
  )
}
