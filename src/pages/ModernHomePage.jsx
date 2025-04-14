import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ModernNavigation from '../components/layout/ModernNavigation'
import Footer from '../components/layout/Footer'
import AnimateOnScroll from '../components/animations/AnimateOnScroll'
import LazyImage from '../components/ui/LazyImage'
import { selectFeaturedProducts } from '../redux/slices/productsSlice'
import { formatPrice } from '../data/products'
import './ModernHomePage.css'

const ModernHomePage = () => {
  // Obtener productos destacados del estado de Redux
  const featuredProducts = useSelector(selectFeaturedProducts) || []

  // Referencias para las secciones
  const featuredSectionRef = useRef(null)

  // Generar valores aleatorios para las animaciones
  useEffect(() => {
    const root = document.documentElement

    // Asignar tiempos aleatorios para animaciones
    root.style.setProperty('--bamboo-sway-time-1', `${Math.random() * 3 + 6}s`)
    root.style.setProperty('--bamboo-sway-time-2', `${Math.random() * 2 + 8}s`)
    root.style.setProperty('--bamboo-sway-distance-1', `${Math.random() * 2 + 2}px`)
    root.style.setProperty('--bamboo-sway-distance-2', `${Math.random() * 1.5 + 1.5}px`)
  }, [])

  // Función para scroll suave a la sección de productos destacados
  const scrollToFeatured = () => {
    featuredSectionRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='modern-home-container'>
      {/* Navegación Moderna */}
      <ModernNavigation />

      {/* Hero Section */}
      <section className='modern-hero-section'>
        <div className='hero-content-container'>
          <AnimateOnScroll
            animation='fade-right'
            delay={0.2}>
            <div className='hero-text'>
              <h1 className='modern-hero-title'>
                Una experiencia
                <br />
                de sabor japonés
              </h1>
              <p className='modern-hero-subtitle'>
                Pastelería artesanal inspirada en la tradición y filosofía nipona que brinda equilibrio en cada bocado.
              </p>
              <div className='hero-buttons'>
                <Link
                  to='/productos'
                  className='primary-button'>
                  <span className='jp-accent'>発見</span> Descubrir Sabores
                </Link>
                <Link
                  to='/nosotros'
                  className='secondary-button'>
                  Nuestra Filosofía
                </Link>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll
            animation='fade-left'
            delay={0.4}>
            <div className='hero-image'>
              <div className='hero-image-container'>
                {/* Imagen destacada */}
                {featuredProducts.length > 0 ? (
                  <>
                    <img
                      src={featuredProducts[0].image}
                      alt={featuredProducts[0].name}
                      className='featured-image-direct'
                    />
                    <div className='image-overlay'>
                      <span className='jp-title'>{featuredProducts[0].jpName}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='placeholder-image'></div>
                    <div className='image-overlay'>
                      <span className='jp-title'>別腹</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <button
          className='scroll-indicator'
          onClick={scrollToFeatured}
          aria-label='Desplazarse a la sección de productos'>
          <span>Descubre más</span>
          <div className='scroll-arrow'>↓</div>
        </button>
      </section>

      {/* Featured Products Section */}
      <section
        className='featured-products-section'
        ref={featuredSectionRef}>
        <div className='section-header'>
          <h2 className='section-title'>
            <span className='jp-title'>創作</span>
            <span className='latin-title'>Creaciones</span>
          </h2>
          <p className='section-subtitle'>Descubre nuestras especialidades inspiradas en la tradición japonesa</p>
        </div>

        <div className='featured-products-grid'>
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <AnimateOnScroll
                animation='zoom-in'
                delay={0.1 * index}
                key={product.id}>
                <Link
                  to={`/productos/${product.id}`}
                  className='featured-product-card'>
                  <div className='product-image-container'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='product-image-direct'
                    />
                    <div className='product-overlay'>
                      <span className='jp-name'>{product.jpName}</span>
                    </div>
                  </div>
                  <div className='product-info'>
                    <h3 className='product-name'>{product.name}</h3>
                    <p className='product-short-desc'>{product.shortDescription}</p>
                    <span className='product-price'>{formatPrice(product.price)}</span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))
          ) : (
            <div className='no-products-message'>
              <p>No hay productos destacados disponibles en este momento.</p>
            </div>
          )}
        </div>

        <AnimateOnScroll
          animation='fade-up'
          delay={0.3}>
          <div className='view-all-container'>
            <Link
              to='/productos'
              className='view-all-button'>
              Ver todas las creaciones
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Philosophy Section */}
      <section className='philosophy-section'>
        <div className='philosophy-content'>
          <AnimateOnScroll animation='fade-up'>
            <div className='philosophy-header'>
              <h2 className='section-title'>
                <span className='jp-title'>哲学</span>
                <span className='latin-title'>Filosofía</span>
              </h2>
            </div>
          </AnimateOnScroll>

          <div className='philosophy-cards'>
            <AnimateOnScroll
              animation='fade-up'
              delay={0.1}>
              <div className='philosophy-card'>
                <div className='philosophy-symbol'>間</div>
                <h3>Ma</h3>
                <p>El espacio vacío que da significado a la experiencia.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll
              animation='fade-up'
              delay={0.2}>
              <div className='philosophy-card'>
                <div className='philosophy-symbol'>渋い</div>
                <h3>Shibui</h3>
                <p>La belleza que reside en la elegancia sutil y discreta.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll
              animation='fade-up'
              delay={0.3}>
              <div className='philosophy-card'>
                <div className='philosophy-symbol'>幽玄</div>
                <h3>Yūgen</h3>
                <p>La profundidad misteriosa que invita a descubrir capas de sabor.</p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll
            animation='fade-up'
            delay={0.4}>
            <div className='philosophy-link'>
              <Link
                to='/nosotros'
                className='secondary-button'>
                Conoce más sobre nuestra filosofía
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section className='contact-section'>
        <div className='contact-content'>
          <AnimateOnScroll animation='fade-up'>
            <div className='contact-info'>
              <h2>Visítanos</h2>
              <address>
                <p>Calle Cerezos 123</p>
                <p>contacto@betsubara.com</p>
                <p>+52 555 123 4567</p>
              </address>
              <Link
                to='/contacto'
                className='contact-button'>
                Contáctanos
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <Footer
        showLogo={true}
        year={2025}
      />
    </div>
  )
}

export default ModernHomePage
