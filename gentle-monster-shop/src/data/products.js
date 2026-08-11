// Catálogo mock. En producción vendría de /api/productos (Express + SQL Server, ver VisionHaus backend).
// Las fotos de producto están en /public/products (subidas directamente, no de bancos externos).

const img = {
  ovalRosa: '/products/01-oval-rosa.png',
  rectangularNegro: '/products/02-rectangular-negro.png',
  wrapNegro: '/products/03-wrap-negro.png',
  ovalDurazno: '/products/04-oval-plata-durazno.png',
  ovalClara: '/products/05-oval-plata-clara.png',
  ovalHavana: '/products/06-oval-plata-havana.png',
  ovalCarey: '/products/07-oval-carey.png',
  shieldTransparente: '/products/08-shield-transparente.png',
  shieldLila: '/products/09-shield-plata-lila.png',
}

export const productos = [
  {
    id: 'gm-001', nombre: 'ECLIPSE', coleccion: 'Nightwalk', precio: 4890,
    color: 'Negro / Lente gris', stock: 12, etiqueta: 'Nuevo',
    descripcion: 'Silueta wraparound negra de acabado mate, con lente oscuro envolvente de una sola pieza.',
    imagen: img.wrapNegro,
  },
  {
    id: 'gm-002', nombre: 'AURELIA', coleccion: 'Gold Line', precio: 5390,
    color: 'Plata / Durazno', stock: 8, etiqueta: 'Bestseller',
    descripcion: 'Montura metálica ovalada de perfil bajo, con lente degradé tono durazno.',
    imagen: img.ovalDurazno,
  },
  {
    id: 'gm-003', nombre: 'VERTEX', coleccion: 'Angular', precio: 4590,
    color: 'Negro / Azul grisáceo', stock: 15, etiqueta: null,
    descripcion: 'Marco rectangular en acetato negro con detalles metálicos en las bisagras y lente azul grisáceo.',
    imagen: img.rectangularNegro,
  },
  {
    id: 'gm-004', nombre: 'MONARCH', coleccion: 'Heritage', precio: 6290,
    color: 'Carey', stock: 5, etiqueta: 'Edición limitada',
    descripcion: 'Silueta ovalada en acetato carey con vetas cálidas y lente ahumado clásico.',
    imagen: img.ovalCarey,
  },
  {
    id: 'gm-005', nombre: 'HALO', coleccion: 'Minimal', precio: 3990,
    color: 'Plata satinado', stock: 20, etiqueta: null,
    descripcion: 'Armazón ovalado ultraligero en metal plata satinado, con lente transparente para uso óptico diario.',
    imagen: img.ovalClara,
  },
  {
    id: 'gm-006', nombre: 'ONYX', coleccion: 'Gold Line', precio: 5890,
    color: 'Plata / Havana', stock: 7, etiqueta: 'Bestseller',
    descripcion: 'Contraste de bisel plateado con puntas de varilla en acetato havana y lente beige suave.',
    imagen: img.ovalHavana,
  },
  {
    id: 'gm-007', nombre: 'DUNE', coleccion: 'Desert', precio: 4290,
    color: 'Plata / Rosa', stock: 14, etiqueta: 'Nuevo',
    descripcion: 'Silueta oval sin marco (rimless) en metal plata, con lente degradé rosado muy fino.',
    imagen: img.ovalRosa,
  },
  {
    id: 'gm-008', nombre: 'PRISM', coleccion: 'Studio', precio: 5890,
    color: 'Transparente', stock: 6, etiqueta: 'Edición limitada',
    descripcion: 'Diseño shield futurista de una sola pieza en acetato transparente, lente degradé durazno.',
    imagen: img.shieldTransparente,
  },
  {
    id: 'gm-009', nombre: 'NOVA', coleccion: 'Studio', precio: 6190,
    color: 'Plata / Lila', stock: 6, etiqueta: 'Nuevo',
    descripcion: 'Silueta shield envolvente en metal cromado con lente lila translúcido. Pieza statement.',
    imagen: img.shieldLila,
  },
  {
    id: 'gm-010', nombre: 'ZENITH', coleccion: 'Gold Line', precio: 6490,
    color: 'Plata / Durazno', stock: 6, etiqueta: null,
    descripcion: 'Reedición de ONYX en tono más claro, con lente degradé durazno intenso.',
    imagen: img.ovalDurazno,
  },
  {
    id: 'gm-011', nombre: 'DRIFT', coleccion: 'Ocean', precio: 4390,
    color: 'Negro / Gris', stock: 16, etiqueta: null,
    descripcion: 'Silueta wraparound deportiva en negro mate con lente gris oscuro antirreflejante.',
    imagen: img.wrapNegro,
  },
  {
    id: 'gm-012', nombre: 'TIDE', coleccion: 'Ocean', precio: 4690,
    color: 'Plata satinado', stock: 10, etiqueta: 'Nuevo',
    descripcion: 'Versión óptica de HALO en plata satinado, lente transparente de alta claridad.',
    imagen: img.ovalClara,
  },
  {
    id: 'gm-013', nombre: 'REGENT', coleccion: 'Heritage', precio: 5590,
    color: 'Carey clásico', stock: 8, etiqueta: 'Bestseller',
    descripcion: 'Reinterpretación de MONARCH con vetas de carey más marcadas y lente ahumado profundo.',
    imagen: img.ovalCarey,
  },
  {
    id: 'gm-014', nombre: 'ASCOT', coleccion: 'Heritage', precio: 5190,
    color: 'Plata / Havana', stock: 12, etiqueta: null,
    descripcion: 'Armazón ovalado en plata con puntas havana, lente beige claro de uso diario.',
    imagen: img.ovalHavana,
  },
  {
    id: 'gm-015', nombre: 'ATLAS', coleccion: 'Angular', precio: 5290,
    color: 'Negro / Azul grisáceo', stock: 10, etiqueta: null,
    descripcion: 'Estructura rectangular robusta en acetato negro, bisagras metálicas visibles y lente azul grisáceo.',
    imagen: img.rectangularNegro,
  },
  {
    id: 'gm-016', nombre: 'ORBIT', coleccion: 'Studio', precio: 5990,
    color: 'Transparente', stock: 9, etiqueta: null,
    descripcion: 'Silueta shield en acetato transparente con lente espejo degradé, sin marco visible.',
    imagen: img.shieldTransparente,
  },
  {
    id: 'gm-017', nombre: 'FLARE', coleccion: 'Studio', precio: 6190,
    color: 'Plata / Lila', stock: 9, etiqueta: 'Bestseller',
    descripcion: 'Versión statement de NOVA, metal cromado pulido y lente lila translúcido de perfil envolvente.',
    imagen: img.shieldLila,
  },
  {
    id: 'gm-018', nombre: 'CIRRUS', coleccion: 'Minimal', precio: 3790,
    color: 'Plata satinado', stock: 18, etiqueta: null,
    descripcion: 'Versión minimalista de HALO, marco plata satinado ultrafino, lente transparente plano.',
    imagen: img.ovalClara,
  },
  {
    id: 'gm-019', nombre: 'SOLIS', coleccion: 'Desert', precio: 4590,
    color: 'Plata / Rosa', stock: 15, etiqueta: 'Nuevo',
    descripcion: 'Silueta oval rimless en plata con lente rosado suave, ideal para uso diario bajo el sol.',
    imagen: img.ovalRosa,
  },
  {
    id: 'gm-020', nombre: 'ELARA', coleccion: 'Gold Line', precio: 6790,
    color: 'Plata / Durazno', stock: 5, etiqueta: 'Edición limitada',
    descripcion: 'Edición limitada de ZENITH, lente degradé durazno intenso y acabado pulido espejo.',
    imagen: img.ovalDurazno,
  },
  {
    id: 'gm-021', nombre: 'VESPER', coleccion: 'Ocean', precio: 4790,
    color: 'Negro / Gris', stock: 11, etiqueta: null,
    descripcion: 'Silueta wraparound clásica en negro con lente gris de protección UV.',
    imagen: img.wrapNegro,
  },
  {
    id: 'gm-022', nombre: 'ASTRID', coleccion: 'Angular', precio: 5090,
    color: 'Negro / Azul grisáceo', stock: 13, etiqueta: null,
    descripcion: 'Marco rectangular compacto en negro, detalles plateados en el puente y lente azul grisáceo.',
    imagen: img.rectangularNegro,
  },
]

export const formatoMoneda = (valor) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(valor)
