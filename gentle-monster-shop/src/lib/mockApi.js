// Simula el backend de VisionHaus (Node/Express + JWT + bcrypt) usando localStorage.
// Sustituye por llamadas fetch/axios reales a tu API cuando el backend esté disponible.

const CLAVE_USUARIOS = 'gmstyle_usuarios'
const CLAVE_SESION = 'gmstyle_sesion'

const esperar = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms))

function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || []
  } catch {
    return []
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
}

export async function verificarCorreo(correo) {
  await esperar(500)
  const usuarios = leerUsuarios()
  const existe = usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase())
  return { existe }
}

export async function iniciarSesion(correo, password) {
  await esperar(800)
  const usuarios = leerUsuarios()
  const usuario = usuarios.find((u) => u.correo.toLowerCase() === correo.toLowerCase())

  if (!usuario) {
    const error = new Error('No encontramos una cuenta con ese correo.')
    error.codigo = 'NO_EXISTE'
    throw error
  }
  if (usuario.password !== password) {
    const error = new Error('La contraseña es incorrecta. Intenta de nuevo.')
    error.codigo = 'PASSWORD_INVALIDA'
    throw error
  }

  const sesion = { nombre: usuario.nombre, correo: usuario.correo, token: `mock.${Date.now()}` }
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
  return sesion
}

export async function registrarUsuario(datos) {
  await esperar(900)
  const usuarios = leerUsuarios()
  if (usuarios.some((u) => u.correo.toLowerCase() === datos.correo.toLowerCase())) {
    const error = new Error('Ese correo ya está registrado.')
    error.codigo = 'YA_EXISTE'
    throw error
  }

  // Nota: en el backend real, el password se hashea con bcrypt antes de persistir.
  usuarios.push(datos)
  guardarUsuarios(usuarios)

  const sesion = { nombre: datos.nombre, correo: datos.correo, token: `mock.${Date.now()}` }
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
  return sesion
}

export function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}
