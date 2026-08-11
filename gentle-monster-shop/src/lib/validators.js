// Algoritmo de Luhn para validar el número de tarjeta (mismo patrón usado en VisionHaus)
export function validarLuhn(numero) {
  const digitos = numero.replace(/\D/g, '')
  if (digitos.length < 13 || digitos.length > 19) return false

  let suma = 0
  let alternar = false
  for (let i = digitos.length - 1; i >= 0; i--) {
    let n = parseInt(digitos[i], 10)
    if (alternar) {
      n *= 2
      if (n > 9) n -= 9
    }
    suma += n
    alternar = !alternar
  }
  return suma % 10 === 0
}

export function detectarTipoTarjeta(numero) {
  const digitos = numero.replace(/\D/g, '')
  if (/^4/.test(digitos)) return 'Visa'
  if (/^5[1-5]/.test(digitos)) return 'Mastercard'
  if (/^3[47]/.test(digitos)) return 'American Express'
  return null
}

export function formatearNumeroTarjeta(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 19)
  return digitos.replace(/(.{4})/g, '$1 ').trim()
}

export function formatearExpiracion(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 4)
  if (digitos.length <= 2) return digitos
  return `${digitos.slice(0, 2)}/${digitos.slice(2)}`
}

export function validarExpiracion(valor) {
  const match = valor.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false
  const mes = parseInt(match[1], 10)
  const anio = parseInt(`20${match[2]}`, 10)
  if (mes < 1 || mes > 12) return false

  const ahora = new Date()
  const expira = new Date(anio, mes, 0, 23, 59, 59)
  return expira >= ahora
}

export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}

export function validarTelefono(telefono) {
  return /^\d{10}$/.test(telefono.replace(/\D/g, ''))
}

export function validarPassword(password) {
  return password.length >= 8
}
