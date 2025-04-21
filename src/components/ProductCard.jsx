import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import LazyImage from './ui/LazyImage'

/**
 * Componente ProductCard
 * ----------------------
 * Tarjeta de producto optimizada para mostrar información básica de un producto.
 * Utiliza LazyImage para carga eficiente de imágenes y React.memo para evitar renders innecesarios.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {string} props.imageSrc - URL de la imagen del producto (requerido)
 * @param {string} props.title - Título o nombre del producto (requerido)
 * @param {string} [props.jpTitle] - Título alternativo en japonés (opcional)
 * @param {string} [props.productId] - ID único del producto. Si no se proporciona, se genera a partir del título (opcional)
 *
 * @responsabilidad
 * - Renderizar una tarjeta con imagen, título y enlace al detalle del producto.
 * - Generar un identificador único si no se proporciona.
 * - Mostrar el título alternativo si está disponible.
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
