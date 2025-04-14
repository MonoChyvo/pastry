import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import LazyImage from './ui/LazyImage'

/**
 * ProductCard - Componente optimizado para mostrar tarjetas de productos
 *
 * Características:
 * - Utiliza LazyImage para carga perezosa de imágenes
 * - Optimizado con memo para evitar renderizados innecesarios
 * - Genera IDs de producto consistentes a partir del título si no se proporciona
 */
const ProductCard = memo(({ imageSrc, title, jpTitle, productId }) => {
  // Extraer el ID del producto del nombre si no se proporciona explícitamente
  const id =
    productId ||
    title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/pastel\sde\s|\scake/gi, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  return (
    <Link
      to={`/productos/${id}`}
      className='product-card-link'>
      <div className='product-card simplified-card'>
        <div className='product-image'>
          <LazyImage
            src={imageSrc}
            alt={title}
            placeholderColor='#1e1e1e'
            threshold={0.1}
            rootMargin='100px 0px'
          />
        </div>
        {jpTitle && <span className='jp-elegant product-jp-title'>{jpTitle}</span>}
        <h3 className='product-title'>{title}</h3>
      </div>
    </Link>
  )
})

// Agregar displayName para facilitar la depuración
ProductCard.displayName = 'ProductCard'

export default ProductCard
