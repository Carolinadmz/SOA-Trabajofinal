import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const RUTA_MODELO = '/models/lentes.glb'

export default function Hero3D() {
  const contenedorRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const contenedor = contenedorRef.current
    if (!contenedor) return

    const ancho = contenedor.clientWidth
    const alto = contenedor.clientHeight

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(35, ancho / alto, 0.1, 100)
    camara.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(ancho, alto)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    contenedor.appendChild(renderer.domElement)

    // Entorno PBR neutro y cálido para que los materiales metálicos/vidrio del modelo
    // reflejen luz de forma realista (sin esto se ven planos/oscuros).
    const pmrem = new THREE.PMREMGenerator(renderer)
    escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    escena.add(new THREE.AmbientLight(0xfff6e8, 0.6))
    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1.4)
    luzPrincipal.position.set(3, 4, 5)
    escena.add(luzPrincipal)
    const luzRelleno = new THREE.DirectionalLight(0xad8a53, 0.5)
    luzRelleno.position.set(-4, -1, 3)
    escena.add(luzRelleno)

    const pivote = new THREE.Group()
    escena.add(pivote)

    let modelo = null
    let activo = true
    let objetivoX = 0
    let objetivoY = 0

    const loader = new GLTFLoader()
    loader.load(
      RUTA_MODELO,
      (gltf) => {
        if (!activo) return
        modelo = gltf.scene

        // Centrar y escalar el modelo para que llene el encuadre sin importar su tamaño original
        const caja = new THREE.Box3().setFromObject(modelo)
        const centro = caja.getCenter(new THREE.Vector3())
        const tamano = caja.getSize(new THREE.Vector3())
        const dimensionMax = Math.max(tamano.x, tamano.y, tamano.z) || 1

        modelo.position.sub(centro)
        const escala = 3.4 / dimensionMax
        modelo.scale.setScalar(escala)

        modelo.traverse((hijo) => {
          if (hijo.isMesh) {
            hijo.castShadow = false
            hijo.receiveShadow = false
          }
        })

        pivote.add(modelo)
      },
      undefined,
      (err) => {
        console.error('No se pudo cargar el modelo 3D de los lentes:', err)
        if (activo) setError(true)
      }
    )

    const manejarMovimiento = (e) => {
      const rect = contenedor.getBoundingClientRect()
      objetivoX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8
      objetivoY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.4
    }
    contenedor.addEventListener('mousemove', manejarMovimiento)

    const reloj = new THREE.Clock()
    const animar = () => {
      if (!activo) return
      requestAnimationFrame(animar)
      const t = reloj.getElapsedTime()

      pivote.rotation.y = t * 0.3 + objetivoX
      pivote.rotation.x = Math.sin(t * 0.6) * 0.06 - objetivoY
      pivote.position.y = Math.sin(t * 0.9) * 0.15

      renderer.render(escena, camara)
    }
    animar()

    const manejarResize = () => {
      const w = contenedor.clientWidth
      const h = contenedor.clientHeight
      camara.aspect = w / h
      camara.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', manejarResize)

    return () => {
      activo = false
      window.removeEventListener('resize', manejarResize)
      contenedor.removeEventListener('mousemove', manejarMovimiento)
      pmrem.dispose()
      if (contenedor.contains(renderer.domElement)) {
        contenedor.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={contenedorRef}
      className="w-full h-full min-h-[380px] relative"
      role="img"
      aria-label="Modelo 3D animado de un par de lentes girando lentamente"
    >
      {error && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-ink-soft text-center px-8">
          No se pudo cargar el modelo 3D de los lentes.
        </p>
      )}
    </div>
  )
}
