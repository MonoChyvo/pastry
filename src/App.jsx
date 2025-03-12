import React, { useEffect, useState } from 'react'
import './App.css'
import Logo from './components/Logo'

// Componentes decorativos eliminados temporalmente

// Componente para el título principal
const HeroTitle = () => (
  <h1>
    Una experiencia
    <br />
    de sabor japonés
  </h1>
)

// Componente para el subtítulo heroico
const HeroSubtitle = () => (
  <p className='hero-subtitle'>
    Pastelería artesanal inspirada en la tradición y filosofía nipona que brinda equilibrio en cada bocado.
  </p>
)

// Componente para el botón Hanko
const HankoButton = () => (
  <a
    href='#products-column'
    className='hanko-button'>
    <span className='jp-accent'>発見</span> Descubrir Sabores
  </a>
)

// Componente para cada tarjeta de producto
const ProductCard = ({ imageSrc, title, jpTitle }) => (
  <div className='product-card simplified-card'>
    <div className='product-image'>
      <img
        src={imageSrc}
        alt={title}
      />
    </div>
    {jpTitle && <span className='jp-elegant product-jp-title'>{jpTitle}</span>}
    <h3 className='product-title'>{title}</h3>
  </div>
)

// Componente para la sección de productos
const ProductsGrid = () => (
  <div className='products-grid'>
    <ProductCard
      imageSrc='/assets/products/matcha.jpg'
      jpTitle='抹茶'
      title='Pastel de Matcha'
    />
    <ProductCard
      imageSrc='/assets/products/mochi.jpg'
      jpTitle='餅'
      title='Mochi Cake'
    />
    <ProductCard
      imageSrc='/assets/products/dorayaki.jpg'
      jpTitle='どら焼き'
      title='Dorayaki Especial'
    />
  </div>
)

// Componente para la sección "Nosotros"
const AboutSection = () => (
  <div className='column-content'>
    <h2 className='jp-title'>
      哲学 <span className='latin-font'>Filosofía</span>
    </h2>
    <div className='about-content'>
      <p>
        En Betsubara, creamos pasteles que respetan los principios del{' '}
        <span className='highlight jp-term'>間 (Ma)</span> - el espacio vacío que da significado a la experiencia.
      </p>
      <p>
        Cada uno de nuestros productos es resultado del concepto{' '}
        <span className='highlight jp-term'>渋い (Shibui)</span> - donde la belleza reside en la elegancia sutil y
        discreta.
      </p>
      <p>
        Nos inspira el <span className='highlight jp-term'>幽玄 (Yūgen)</span> - esa profundidad misteriosa que invita a
        descubrir capas de sabor y textura en cada creación.
      </p>
      <div className='contact-info jp-modern'>
        <div className='contact-item'>Calle Cerezos 123</div>
        <div className='contact-item'>contacto@sakurapastry.com</div>
        <div className='contact-item'>+52 555 123 4567</div>
      </div>
    </div>
  </div>
)

// Componente para las hojas voladoras
const FlyingLeaves = () => {
  const [leaves, setLeaves] = useState([])
  const maxLeaves = 7 // Máximo número de hojas en pantalla

  useEffect(() => {
    // Función para generar una nueva hoja
    const generateLeaf = () => {
      const id = Date.now() + Math.random()
      const size = Math.random() * 20 + 10 // Tamaño entre 10px y 30px
      const left = Math.random() * 100 // Posición horizontal (%)
      const rotation = Math.random() * 60 // Rotación inicial aleatoria
      const duration = 8 + Math.random() * 7 // Duración entre 8-15s
      const delay = Math.random() * 2 // Delay inicial
      const type = Math.floor(Math.random() * 3) + 1 // 3 tipos de hojas diferentes

      // Factores aleatorios para hacer cada animación única - rangos ampliados
      const windFactor = 0.3 + Math.random() * 2.4 // Entre 0.3 y 2.7 (más variación)
      const rotateFactor = 0.5 + Math.random() * 2.0 // Entre 0.5 y 2.5 (más variación)
      const pathComplexity = 0.4 + Math.random() * 1.8 // Entre 0.4 y 2.2 (más variación)
      const zigzagDirection = Math.random() > 0.5 ? 1 : -1 // Dirección zigzag aleatoria

      return {
        id,
        size,
        left,
        rotation,
        duration,
        delay,
        type,
        windFactor,
        rotateFactor,
        pathComplexity,
        zigzagDirection,
      }
    }

    // Iniciar con algunas hojas
    const initialLeaves = Array(5).fill().map(generateLeaf)
    setLeaves(initialLeaves)

    // Agregar nuevas hojas periódicamente
    const addLeaf = () => {
      setLeaves((prev) => {
        // Si ya tenemos el máximo, removemos una hoja antigua
        if (prev.length >= maxLeaves) {
          return [...prev.slice(1), generateLeaf()]
        }
        return [...prev, generateLeaf()]
      })
    }

    // Programar la adición de hojas en intervalos aleatorios
    let timeoutId
    const scheduleNextLeaf = () => {
      const nextTime = 800 + Math.random() * 2000 // Entre 0.8 y 2.8 segundos
      timeoutId = setTimeout(() => {
        addLeaf()
        scheduleNextLeaf()
      }, nextTime)
    }

    scheduleNextLeaf()

    return () => {
      // Limpiar timeout pendiente al desmontar
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      className='flying-leaves'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
      }}>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`leaf leaf-type-${leaf.type}`}
          style={{
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            left: `${leaf.left}%`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            transform: `rotate(${leaf.rotation}deg)`,
            '--wind-factor': leaf.windFactor,
            '--rotate-factor': leaf.rotateFactor,
            '--path-complexity': leaf.pathComplexity,
            '--zigzag-x': leaf.zigzagDirection,
          }}
        />
      ))}
    </div>
  )
}

// Componente principal
const App = () => {
  // Generar valores aleatorios para las animaciones de bambú
  useEffect(() => {
    const root = document.documentElement

    // Asignar tiempos aleatorios para un balanceo de bambú más suave y fluido
    root.style.setProperty('--bamboo-sway-time-1', `${Math.random() * 3 + 6}s`)
    root.style.setProperty('--bamboo-sway-time-2', `${Math.random() * 2 + 8}s`)

    // Asignar distancias sutiles para el balanceo, para transiciones más naturales
    root.style.setProperty('--bamboo-sway-distance-1', `${Math.random() * 2 + 2}px`)
    root.style.setProperty('--bamboo-sway-distance-2', `${Math.random() * 1.5 + 1.5}px`)

    // Nota: Las configuraciones para prevenir scrolling se movieron a CSS
  }, [])

  return (
    <div className='main-container'>
      {/* Hojas voladoras */}
      <FlyingLeaves />

      {/* Elementos decorativos eliminados temporalmente */}

      {/* Primera columna: Hero */}
      <div
        className='column'
        id='hero-column'>
        <div className='hero-background-pattern'></div>
        <div className='column-content hero-content'>
          <Logo />
          <div className='hero-text-container'>
            <HeroTitle />
            <HeroSubtitle />
            <HankoButton />
          </div>
          <div className='footer'>
            <p>&copy; 2025 Sakura Pastry. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

      {/* Separador de bambú */}
      <div className='bamboo-divider'></div>

      {/* Segunda columna: Productos */}
      <div
        className='column'
        id='products-column'>
        <div className='column-content'>
          <h2> Creaciones</h2>
          <ProductsGrid />
        </div>
      </div>

      {/* Separador de bambú */}
      <div className='bamboo-divider'></div>

      {/* Tercera columna: Nosotros */}
      <div
        className='column'
        id='about-column'>
        <AboutSection />
      </div>
    </div>
  )
}

export default App
