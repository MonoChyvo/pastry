import React, { useState, useEffect, useRef, memo } from 'react'
import './LazyImage.css'

/**
 * LazyImage - Componente optimizado para carga perezosa de imágenes
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
