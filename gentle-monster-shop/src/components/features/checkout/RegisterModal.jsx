import { useState } from 'react'
import Modal from '../../ui/Modal'
import Campo, { inputClases } from '../../ui/Campo'
import Spinner from '../../ui/Spinner'
import { ShieldCheck } from 'lucide-react'
import {
  validarPassword,
  validarTelefono,
  validarLuhn,
  detectarTipoTarjeta,
  formatearNumeroTarjeta,
  formatearExpiracion,
  validarExpiracion,
} from '../../../lib/validators'
import { registrarUsuario } from '../../../lib/mockApi'
import { useAuth } from '../../../store/AuthContext'

const PASOS = [
  { n: 1, etiqueta: 'Datos personales' },
  { n: 2, etiqueta: 'Contacto y envío' },
  { n: 3, etiqueta: 'Método de pago' },
]

export default function RegisterModal({ abierto, onCerrar, correo, onVolver, onExito }) {
  const [paso, setPaso] = useState(1)
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')
  const { iniciarSesionLocal } = useAuth()

  const [form, setForm] = useState({
    nombre: '',
    password: '',
    telefono: '',
    direccion: '',
    titular: '',
    tipoTarjeta: 'credito',
    numeroTarjeta: '',
    expTarjeta: '',
    cvv: '',
  })

  const actualizar = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }))

  const validarPaso1 = () => {
    const e = {}
    if (!form.nombre.trim() || form.nombre.trim().length < 3) e.nombre = 'Ingresa tu nombre completo.'
    if (!validarPassword(form.password)) e.password = 'Usa al menos 8 caracteres.'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const validarPaso2 = () => {
    const e = {}
    if (!validarTelefono(form.telefono)) e.telefono = 'Ingresa un teléfono a 10 dígitos.'
    if (!form.direccion.trim() || form.direccion.trim().length < 8) e.direccion = 'Ingresa una dirección completa.'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const validarPaso3 = () => {
    const e = {}
    if (!form.titular.trim()) e.titular = 'Ingresa el nombre del titular.'
    if (!validarLuhn(form.numeroTarjeta)) e.numeroTarjeta = 'El número de tarjeta no es válido.'
    if (!validarExpiracion(form.expTarjeta)) e.expTarjeta = 'Fecha inválida o vencida.'
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = 'CVV inválido.'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const siguiente = (destino) => {
    const valido = paso === 1 ? validarPaso1() : paso === 2 ? validarPaso2() : true
    if (valido) setPaso(destino)
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    if (!validarPaso3()) return
    setErrorGeneral('')
    setCargando(true)
    try {
      const sesion = await registrarUsuario({ ...form, correo })
      iniciarSesionLocal(sesion)
      onExito(sesion)
    } catch (err) {
      setErrorGeneral(err.message)
    } finally {
      setCargando(false)
    }
  }

  const tipoDetectado = detectarTipoTarjeta(form.numeroTarjeta)

  return (
    <Modal abierto={abierto} onCerrar={onCerrar} ancho="max-w-lg">
      <h2 className="font-display text-2xl mb-2">Crea tu cuenta GM Style ✨</h2>
      <p className="text-sm text-ink-soft mb-6">
        No encontramos una cuenta con este correo. Completa tus datos para crear tu perfil y finalizar la compra.
      </p>

      <div className="flex items-center gap-2 mb-8">
        {PASOS.map((p) => (
          <div key={p.n} className="flex-1">
            <div
              className={`h-1 rounded-full mb-2 transition-colors ${
                paso >= p.n ? 'bg-accent' : 'bg-line'
              }`}
            />
            <p className={`text-[11px] uppercase tracking-wide ${paso >= p.n ? 'text-accent' : 'text-ink-soft/50'}`}>
              {p.n}. {p.etiqueta}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={manejarEnvio} noValidate>
        {paso === 1 && (
          <fieldset>
            <Campo label="Nombre completo" htmlFor="regNombre" error={errores.nombre}>
              <input
                id="regNombre"
                type="text"
                value={form.nombre}
                onChange={(e) => actualizar('nombre', e.target.value)}
                placeholder="Ej. Ana Pérez García"
                required
                className={inputClases(!!errores.nombre)}
              />
            </Campo>

            <Campo
              label="Crea una contraseña"
              htmlFor="regPassword"
              error={errores.password}
              hint="Usa al menos 8 caracteres. Te recomendamos combinar letras y números."
            >
              <input
                id="regPassword"
                type="password"
                value={form.password}
                onChange={(e) => actualizar('password', e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                autoComplete="new-password"
                className={inputClases(!!errores.password)}
              />
            </Campo>

            <button
              type="button"
              onClick={() => siguiente(2)}
              className="w-full bg-accent text-paper font-medium rounded-full py-3 hover:bg-accent/80 transition-colors"
            >
              Siguiente
            </button>
          </fieldset>
        )}

        {paso === 2 && (
          <fieldset>
            <Campo label="Correo electrónico" htmlFor="regCorreoVisible">
              <input id="regCorreoVisible" type="email" value={correo} readOnly className={inputClases(false) + ' opacity-60'} />
            </Campo>

            <Campo label="Teléfono" htmlFor="regTelefono" error={errores.telefono}>
              <input
                id="regTelefono"
                type="tel"
                value={form.telefono}
                onChange={(e) => actualizar('telefono', e.target.value)}
                placeholder="Ej. 5512345678"
                required
                className={inputClases(!!errores.telefono)}
              />
            </Campo>

            <Campo label="Dirección de envío" htmlFor="regDireccion" error={errores.direccion}>
              <textarea
                id="regDireccion"
                rows={2}
                value={form.direccion}
                onChange={(e) => actualizar('direccion', e.target.value)}
                placeholder="Calle, número, colonia, ciudad, CP"
                required
                className={inputClases(!!errores.direccion)}
              />
            </Campo>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaso(1)}
                className="flex-1 border border-line rounded-full py-3 hover:border-accent transition-colors"
              >
                ← Atrás
              </button>
              <button
                type="button"
                onClick={() => siguiente(3)}
                className="flex-1 bg-accent text-paper font-medium rounded-full py-3 hover:bg-accent/80 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </fieldset>
        )}

        {paso === 3 && (
          <fieldset>
            <p className="flex items-center gap-2 text-xs text-ink-soft mb-4">
              <ShieldCheck size={14} className="text-accent" /> Tus datos de pago se procesan de forma segura.
            </p>

            <Campo label="Nombre del titular" htmlFor="regTitular" error={errores.titular}>
              <input
                id="regTitular"
                type="text"
                value={form.titular}
                onChange={(e) => actualizar('titular', e.target.value)}
                placeholder="Como aparece en la tarjeta"
                required
                className={inputClases(!!errores.titular)}
              />
            </Campo>

            <Campo label="Tipo de tarjeta" htmlFor="regTipoTarjeta">
              <select
                id="regTipoTarjeta"
                value={form.tipoTarjeta}
                onChange={(e) => actualizar('tipoTarjeta', e.target.value)}
                className={inputClases(false)}
              >
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
              </select>
            </Campo>

            <Campo
              label="Número de tarjeta"
              htmlFor="regNumeroTarjeta"
              error={errores.numeroTarjeta}
              hint={tipoDetectado ? `Detectada: ${tipoDetectado}` : undefined}
            >
              <input
                id="regNumeroTarjeta"
                type="text"
                inputMode="numeric"
                maxLength={23}
                value={form.numeroTarjeta}
                onChange={(e) => actualizar('numeroTarjeta', formatearNumeroTarjeta(e.target.value))}
                placeholder="0000 0000 0000 0000"
                required
                className={inputClases(!!errores.numeroTarjeta)}
              />
            </Campo>

            <div className="grid grid-cols-2 gap-4">
              <Campo label="Expiración (MM/AA)" htmlFor="regExpTarjeta" error={errores.expTarjeta}>
                <input
                  id="regExpTarjeta"
                  type="text"
                  maxLength={5}
                  value={form.expTarjeta}
                  onChange={(e) => actualizar('expTarjeta', formatearExpiracion(e.target.value))}
                  placeholder="MM/AA"
                  required
                  className={inputClases(!!errores.expTarjeta)}
                />
              </Campo>
              <Campo label="CVV" htmlFor="regCvv" error={errores.cvv}>
                <input
                  id="regCvv"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={form.cvv}
                  onChange={(e) => actualizar('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  required
                  className={inputClases(!!errores.cvv)}
                />
              </Campo>
            </div>

            {errorGeneral && (
              <p className="text-sm text-danger mb-3" role="alert">{errorGeneral}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaso(2)}
                className="flex-1 border border-line rounded-full py-3 hover:border-accent transition-colors"
              >
                ← Atrás
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-accent text-paper font-medium rounded-full py-3 flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors disabled:opacity-60"
              >
                {cargando && <Spinner />} Crear cuenta
              </button>
            </div>
          </fieldset>
        )}
      </form>

      <button
        type="button"
        onClick={onVolver}
        className="w-full text-center text-sm text-ink-soft hover:text-accent mt-5"
      >
        ← Usar otro correo
      </button>
    </Modal>
  )
}
