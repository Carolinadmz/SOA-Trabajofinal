import { useState, useEffect } from 'react'
import AOS from 'aos'

import { AuthProvider } from './store/AuthContext'
import { CartProvider } from './store/CartContext'
import { ToastProvider } from './store/ToastContext'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Hero from './components/features/Hero'
import Marquesina from './components/features/Marquesina'
import ProductGrid from './components/features/ProductGrid'
import BannerCampana from './components/features/BannerCampana'
import Nosotros from './components/features/Nosotros'
import CartDrawer from './components/features/CartDrawer'
import CheckoutFlow from './components/features/checkout/CheckoutFlow'

function Tienda() {
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [pasoCheckout, setPasoCheckout] = useState(null) // null | 'email'

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' })
  }, [])

  const abrirCheckout = () => {
    setCarritoAbierto(false)
    setPasoCheckout('email')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onAbrirCarrito={() => setCarritoAbierto(true)}
        onAbrirCuenta={() => setPasoCheckout('email')}
      />

      <main className="flex-1">
        <Hero />
        <Marquesina />
        <ProductGrid />
        <BannerCampana />
        <Nosotros />
      </main>

      <Footer />

      <CartDrawer
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        onIrACheckout={abrirCheckout}
      />

      {pasoCheckout && (
        <CheckoutFlow pasoInicial={pasoCheckout} onCerrarTodo={() => setPasoCheckout(null)} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Tienda />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
