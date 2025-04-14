import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ModernNavigation from '../components/layout/ModernNavigation'
import Footer from '../components/layout/Footer'
import AnimateOnScroll from '../components/animations/AnimateOnScroll'
import LazyImage from '../components/ui/LazyImage'
import { selectAllProducts } from '../redux/slices/productsSlice'
import { formatPrice } from '../data/products'
import './ModernPages.css'

const ModernProductsPage = () => {
  // Obtener productos del estado de Redux
  const products = useSelector(selectAllProducts) || []

  return (
    <div className='modern-page-container'>
      {/* Navegación Moderna */}
      <ModernNavigation />

      <main className='modern-page-content'>
        <AnimateOnScroll animation='fade-up'>
          <div className='modern-page-header'>
            <h1 className='modern-page-title'>
              <span className='jp-title'>創作</span>
              <span className='latin-title'>Nuestras Creaciones</span>
            </h1>
            <p className='modern-page-description'>
              Descubre nuestra selección de pasteles inspirados en la tradición japonesa, elaborados con ingredientes de
              la más alta calidad y técnicas artesanales.
            </p>
          </div>
        </AnimateOnScroll>

        <div className='modern-products-grid'>
          {products.length > 0 ? (
            products.map((product, index) => (
              <AnimateOnScroll
                animation='zoom-in'
                delay={0.1 * index}
                key={product.id}>
                <Link
                  to={`/productos/${product.id}`}
                  className='modern-product-card'>
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
              <p>No hay productos disponibles en este momento.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        showLogo={false}
        year={2025}
      />
    </div>
  )
}

export default ModernProductsPage
