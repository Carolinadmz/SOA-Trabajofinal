import Modal from '../../ui/Modal'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessModal({ abierto, onCerrar, nombre, correo }) {
  return (
    <Modal abierto={abierto} onCerrar={onCerrar}>
      <div className="text-center">
        <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
        <h2 className="font-display text-2xl mb-2">¡Listo, {nombre?.split(' ')[0]}!</h2>
        <p className="text-sm text-ink-soft mb-1">
          Tu pedido fue confirmado. Enviamos los detalles y el seguimiento a:
        </p>
        <p className="text-accent text-sm mb-6">{correo}</p>
        <button
          onClick={onCerrar}
          className="w-full bg-accent text-paper font-medium rounded-full py-3 hover:bg-accent/80 transition-colors"
        >
          Continuar explorando
        </button>
      </div>
    </Modal>
  )
}
