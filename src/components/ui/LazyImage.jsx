import React, { useState, useEffect, useRef, memo } from 'react'
import './LazyImage.css'

/**
 * Componente LazyImage
 * ---------------------
 * Imagen optimizada para carga perezosa (lazy loading) usando IntersectionObserver.
 * Permite placeholders, manejo de errores y personalización de estilos.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {string} props.src - URL de la imagen a mostrar (requerido)
 * @param {string} props.alt - Texto alternativo para accesibilidad (requerido)
 * @param {string} [props.className] - Clases CSS adicionales (opcional)
 * @param {string} [props.placeholderColor] - Color de fondo del placeholder (opcional)
 * @param {string|number} [props.width] - Ancho de la imagen o contenedor (opcional)
 * @param {string|number} [props.height] - Alto de la imagen o contenedor (opcional)
 * @param {number} [props.threshold] - Umbral para IntersectionObserver (opcional, por defecto 0.1)
 * @param {string} [props.rootMargin] - Margen raíz para IntersectionObserver (opcional)
 * @returns {JSX.Element}
 *
 * @responsabilidad
 * - Renderizar una imagen que solo se carga cuando entra al viewport.
 * - Mostrar un placeholder mientras carga y un mensaje si hay error.
 * - Permitir personalización de estilos y comportamiento.
 */
const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = '',
  placeholderColor = '#2a2a2a',
  width,
  height,
  threshold = 0.1,
  rootMargin = '50px 0px',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  // Efecto para detectar cuando la imagen está en el viewport
  useEffect(() => {
    // Usar opciones mejoradas para IntersectionObserver
    const options = {
      rootMargin, // Precarga imágenes un poco antes de que entren en el viewport
      threshold,
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Usar requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
          setIsInView(true)
          observer.disconnect()
        })
      }
    }, options)

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [threshold, rootMargin])

  // Manejar la carga de la imagen
  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  // Manejar errores de carga
  const handleImageError = (e) => {
    console.error('Error al cargar la imagen:', src, e)
    setHasError(true)
    setIsLoaded(true) // Consideramos que ha terminado de cargar aunque sea con error
  }

  // Estilo para el placeholder
  const placeholderStyle = {
    backgroundColor: placeholderColor,
    width: width || '100%',
    height: height || '100%',
  }

  // Determinar la clase CSS basada en el estado
  const imageClasses = ['lazy-image', isLoaded ? 'loaded' : '', hasError ? 'error' : ''].filter(Boolean).join(' ')

  return (
    <div
      className={`lazy-image-container ${className}`}
      ref={imgRef}
      style={{ width, height }}
      {...props}>
      {/* Placeholder */}
      <div
        className={`lazy-image-placeholder ${isLoaded ? 'loaded' : ''}`}
        style={placeholderStyle}
      />

      {/* Imagen real (solo se carga cuando está en viewport) */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={imageClasses}
          onLoad={handleImageLoad}
          onError={handleImageError}
          width={width}
          height={height}
          loading='lazy' // Respaldo nativo de lazy loading
        />
      )}

      {/* Mensaje de error (solo visible si hay error) */}
      {hasError && (
        <div className='lazy-image-error'>
          <span>Error al cargar la imagen: {src.split('/').pop()}</span>
        </div>
      )}
    </div>
  )
})

// Agregar displayName para facilitar la depuración
LazyImage.displayName = 'LazyImage'

export default LazyImage
