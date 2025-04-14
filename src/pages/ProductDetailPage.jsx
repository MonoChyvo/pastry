import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navigation from '../components/Navigation'
import LazyImage from '../components/ui/LazyImage'
import './Pages.css'

// Importar selectores y acciones de Redux
import { selectProductById } from '../redux/slices/productsSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { addNotification } from '../redux/slices/uiSlice'
import { formatPrice } from '../data/products'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()

  // Obtener el producto del estado de Redux
  const product = useSelector((state) => selectProductById(state, productId))
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  // Manejar la adición al carrito
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }))
      dispatch(
        addNotification({
          type: 'success',
          message: `${product.name} añadido al carrito`,
          duration: 3000,
        })
      )
    }
  }

  if (loading) {
    return (
      <div className='page-container'>
        <Navigation />
        <main className='page-content'>
          <div className='loading-spinner'>Cargando...</div>
        </main>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className='page-container'>
        <Navigation />
        <main className='page-content'>
          <div className='error-message'>
            <h2>Error</h2>
            <p>{error || 'Producto no encontrado'}</p>
            <Link
              to='/productos'
              className='back-button'>
              Volver a Productos
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className='page-container'>
      <Navigation />

      <main className='page-content'>
        <div className='product-detail-container'>
          <div className='product-detail-image'>
            <img
              src={product.image}
              alt={product.name}
              className='product-detail-image-direct'
            />
          </div>

          <div className='product-detail-info'>
            <div className='product-detail-header'>
              {product.jpName && <span className='jp-elegant product-jp-title'>{product.jpName}</span>}
              <h1 className='product-detail-title'>{product.name}</h1>
              <div className='product-detail-price'>{formatPrice(product.price, product.currency)}</div>
            </div>

            <div className='product-detail-description'>
              <p>{product.description}</p>
            </div>

            <div className='product-detail-ingredients'>
              <h3>Ingredientes</h3>
              <ul>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className='product-detail-actions'>
              <button
                className='add-to-cart-button'
                onClick={handleAddToCart}
                disabled={product.stock <= 0}>
                {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
              </button>
              <Link
                to='/productos'
                className='back-to-products'>
                Volver a Productos
              </Link>
            </div>

            <div className='product-stock-info'>
              {product.stock > 0 ? (
                <span className='in-stock'>En stock: {product.stock} unidades</span>
              ) : (
                <span className='out-of-stock'>Agotado</span>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className='page-footer'>
        <p>&copy; 2025 Betsubara. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default ProductDetailPage
