import { useState } from 'react'
import Modal from '../../ui/Modal'
import Campo, { inputClases } from '../../ui/Campo'
import Spinner from '../../ui/Spinner'
import { iniciarSesion } from '../../../lib/mockApi'
import { useAuth } from '../../../store/AuthContext'

export default function LoginModal({ abierto, onCerrar, correo, onVolver, onExito }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { iniciarSesionLocal } = useAuth()

  const manejarEnvio = async (e) => {
    e.preventDefault()
    if (!password) {
      setError('Ingresa tu contraseña.')
      return
    }
    setError('')
    setCargando(true)
    try {
      const sesion = await iniciarSesion(correo, password)
      iniciarSesionLocal(sesion)
      onExito(sesion)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <Modal abierto={abierto} onCerrar={onCerrar}>
      <h2 className="font-display text-2xl mb-2">¡Qué gusto verte de nuevo! 👋</h2>
      <p className="text-sm text-ink-soft mb-6">
        Detectamos una cuenta con este correo. Ingresa tu contraseña para continuar.
      </p>

      <form onSubmit={manejarEnvio} noValidate>
        <Campo label="Correo electrónico" htmlFor="loginCorreo">
          <input id="loginCorreo" type="email" value={correo} readOnly className={inputClases(false) + ' opacity-60'} />
        </Campo>

        <Campo label="Contraseña" htmlFor="loginPassword" error={error}>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className={inputClases(!!error)}
          />
        </Campo>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-accent text-paper font-medium rounded-full py-3 flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors disabled:opacity-60"
        >
          {cargando && <Spinner />} Iniciar sesión y continuar
        </button>
        <button
          type="button"
          onClick={onVolver}
          className="w-full text-center text-sm text-ink-soft hover:text-accent mt-4"
        >
          ← Usar otro correo
        </button>
      </form>
    </Modal>
  )
}
