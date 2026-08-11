import { useState } from 'react'
import Modal from '../../ui/Modal'
import Campo, { inputClases } from '../../ui/Campo'
import Spinner from '../../ui/Spinner'
import { validarCorreo } from '../../../lib/validators'
import { verificarCorreo } from '../../../lib/mockApi'
import { useCart } from '../../../store/CartContext'
import { formatoMoneda } from '../../../data/products'

export default function CheckoutEmailModal({ abierto, onCerrar, onContinuar }) {
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { total, cantidadTotal } = useCart()

  const manejarEnvio = async (e) => {
    e.preventDefault()
    if (!validarCorreo(correo)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    setError('')
    setCargando(true)
    try {
      const { existe } = await verificarCorreo(correo)
      onContinuar(correo, existe ? 'login' : 'registro')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Modal abierto={abierto} onCerrar={onCerrar}>
      <h2 className="font-display text-2xl mb-2">Continuar con tu compra</h2>
      <p className="text-sm text-ink-soft mb-6">
        Ingresa tu correo electrónico para continuar. Verificaremos si ya tienes una cuenta.
      </p>

      <form onSubmit={manejarEnvio} noValidate>
        <Campo label="Correo electrónico" htmlFor="checkCorreo" error={error}>
          <input
            id="checkCorreo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tu@correo.com"
            required
            className={inputClases(!!error)}
          />
        </Campo>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-accent text-paper font-medium rounded-full py-3 flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors disabled:opacity-60"
        >
          {cargando && <Spinner />} Continuar
        </button>
      </form>

      <p className="text-center text-sm text-ink-soft mt-5">
        {cantidadTotal} {cantidadTotal === 1 ? 'artículo' : 'artículos'} · Total {formatoMoneda(total)}
      </p>
    </Modal>
  )
}
