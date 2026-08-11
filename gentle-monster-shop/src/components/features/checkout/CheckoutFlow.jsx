import { useState } from 'react'
import CheckoutEmailModal from './CheckoutEmailModal'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import SuccessModal from './SuccessModal'
import { useCart } from '../../../store/CartContext'
import { useToast } from '../../../store/ToastContext'

// Pasos posibles: 'email' | 'login' | 'registro' | 'exito' | null (cerrado)
export default function CheckoutFlow({ pasoInicial, onCerrarTodo }) {
  const [paso, setPaso] = useState(pasoInicial)
  const [correo, setCorreo] = useState('')
  const [sesionExito, setSesionExito] = useState(null)
  const { vaciarCarrito } = useCart()
  const { mostrarToast } = useToast()

  const cerrarTodo = () => {
    setPaso(null)
    onCerrarTodo()
  }

  const manejarContinuarEmail = (correoIngresado, destino) => {
    setCorreo(correoIngresado)
    setPaso(destino)
  }

  const manejarExito = (sesion) => {
    setSesionExito(sesion)
    setPaso('exito')
    vaciarCarrito()
    mostrarToast('Pedido confirmado. Revisa tu correo para el seguimiento.', 'success')
  }

  return (
    <>
      <CheckoutEmailModal
        abierto={paso === 'email'}
        onCerrar={cerrarTodo}
        onContinuar={manejarContinuarEmail}
      />
      <LoginModal
        abierto={paso === 'login'}
        onCerrar={cerrarTodo}
        correo={correo}
        onVolver={() => setPaso('email')}
        onExito={manejarExito}
      />
      <RegisterModal
        abierto={paso === 'registro'}
        onCerrar={cerrarTodo}
        correo={correo}
        onVolver={() => setPaso('email')}
        onExito={manejarExito}
      />
      <SuccessModal
        abierto={paso === 'exito'}
        onCerrar={cerrarTodo}
        nombre={sesionExito?.nombre}
        correo={sesionExito?.correo}
      />
    </>
  )
}
