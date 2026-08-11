# GM STYLE — E-commerce de lentes de diseño

Proyecto React + Tailwind CSS v4 + AOS + Three.js. Segunda iteración: paleta clara y
elegante, navegación y layout inspirados en la estructura real de gentlemonster.com
(nav en mayusculas, grids editoriales tipo "LATEST"), y un par de lentes 3D animados
en el hero, construidos con geometria procedural (no usa assets ni modelos de terceros).

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`, tokens en `src/index.css` via `@theme`)
- **Three.js** para el modelo 3D animado del hero (rotacion continua + parallax al mouse)
- **AOS** (Animate on Scroll) para las animaciones de entrada
- **react-router-dom** y **lucide-react** instalados y listos para usarse
- Persistencia de carrito/sesion con `localStorage` (capa `src/lib/mockApi.js` simulando el backend)

## Paleta (clara y elegante)

| Token | Uso |
|---|---|
| `paper` `#FBFAF6` | Fondo principal |
| `paper-soft` `#F2EDE2` | Secciones alternas |
| `ink` `#1C1A16` | Texto principal, botones oscuros |
| `ink-soft` `#6B675C` | Texto secundario |
| `accent` `#AD8A53` | Acento champan/dorado suave |
| `line` `#E4DDCC` | Bordes y divisores finos |

## Como correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para produccion:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  components/
    layouts/     Navbar, Footer
    ui/          Modal, Spinner, Campo
    features/    Hero, Hero3D (lentes 3D animados), ProductGrid, ProductCard, CartDrawer, Nosotros
      checkout/  CheckoutFlow, CheckoutEmailModal, LoginModal, RegisterModal, SuccessModal
  store/         AuthContext, CartContext, ToastContext
  lib/           validators.js (Luhn, correo, telefono...), mockApi.js
  data/          products.js (catalogo mock)
```

## El componente 3D (`Hero3D.jsx`)

Construye un par de lentes de forma procedural con primitivas de Three.js (toros para
los aros, circulos para los cristales con material de vidrio, cilindros para el puente
y las varillas). Se anima con:

- Rotacion continua sobre el eje Y
- Ligera flotacion vertical tipo "breathing"
- Parallax: los lentes siguen sutilmente la posicion del mouse dentro del contenedor

No depende de imagenes ni modelos externos, por lo que no hay archivos pesados que descargar.

## Cobertura de las 12 caracteristicas minimas de e-commerce

1. **Diseno responsive y usabilidad** - layout mobile-first con Tailwind.
2. **Catalogo de productos** - `ProductGrid` con buscador y filtro por coleccion.
3. **Carrito de compras** - `CartDrawer` + `CartContext`: agregar, editar, eliminar, totales en tiempo real.
4. **Registro e inicio de sesion** - flujo de 3 modales (verificar correo -> login o registro).
5. **Metodos de pago seguros** - validacion Luhn, deteccion de tipo de tarjeta, aviso de cifrado.
6. **Metodos de envio** - calculo de envio gratis/costo en el carrito.
7. **Proceso de compra optimizado** - registro multi-paso con indicador de progreso.
8. **Confirmacion y notificaciones** - modal de exito + toasts globales.
9. **Seguridad y proteccion de datos** - notas de HTTPS/SSL y RGPD/LFPDPPP.
10. **Atencion al cliente** - seccion de contacto en el footer.
11. **Politicas claras** - enlaces de envios, devoluciones, garantia y terminos en el footer.
12. **Analisis y metricas** - punto de integracion documentado en `main.jsx` para GA/Pixel.

## Conectar con un backend real

El "backend" esta simulado en `src/lib/mockApi.js` con `localStorage`. Para conectarlo a
tu API real (Node/Express + JWT), sustituye las funciones de ese archivo por llamadas
`fetch`/`axios`, sin tocar los componentes.

## Nota sobre la referencia de diseño

Este proyecto toma como referencia de estilo la estructura y el tono visual de
gentlemonster.com (tipografia editorial, navegacion minimal, grids de producto),
adaptados a una paleta propia y con contenido/marca ficticios (GM STYLE) para fines
academicos. No reutiliza imagenes, logotipos ni texto de la marca original.
