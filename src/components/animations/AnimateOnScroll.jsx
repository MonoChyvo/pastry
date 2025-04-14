import React, { useEffect, useRef, useState, memo, useCallback } from 'react'
import './AnimateOnScroll.css'

/**
 * AnimateOnScroll - Componente optimizado para animaciones al hacer scroll
 *
 * Características:
 * - Rendimiento optimizado con memo, useCallback y requestAnimationFrame
 * - Detección inteligente de visibilidad con IntersectionObserver
 * - Soporte para preferencias de reducción de movimiento
 * - Animaciones personalizables con propiedades CSS
 * - Opciones de rendimiento para dispositivos de gama baja
 */

// Detector de preferencias de reducción de movimiento
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Optimización: Usar memo para evitar renderizados innecesarios
const AnimateOnScroll = memo(
  ({
    children,
    animation = 'fade-up',
    delay = 0,
    threshold = 0.1,
    duration = 0.4, // Reducido para animaciones más rápidas
    once = true,
    rootMargin = '50px 0px', // Aumentado para precargar antes
    disabled = false, // Nueva opción para desactivar animaciones
    disableOnMobile = false, // Desactivar en dispositivos móviles para mejor rendimiento
  }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef(null)

    // Detectar si estamos en un dispositivo móvil
    const isMobile =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches

    // Determinar si las animaciones deben estar desactivadas
    const shouldDisableAnimations = disabled || prefersReducedMotion || (disableOnMobile && isMobile)

    // Si las animaciones están desactivadas, mostrar el contenido inmediatamente
    useEffect(() => {
      if (shouldDisableAnimations && !isVisible) {
        setIsVisible(true)
        if (once) {
          setHasAnimated(true)
        }
      }
    }, [shouldDisableAnimations, isVisible, once])

    // Optimización: Usar useCallback para el manejador de intersección
    const handleIntersection = useCallback(
      (entries) => {
        const [entry] = entries

        if (entry.isIntersecting && (!hasAnimated || !once)) {
          // Usar requestAnimationFrame para mejor rendimiento
          requestAnimationFrame(() => {
            setIsVisible(true)
            if (once) {
              setHasAnimated(true)
            }
          })
        } else if (!entry.isIntersecting && !once) {
          // Solo cambiar el estado si realmente cambia para evitar renderizados
          if (isVisible) {
            setIsVisible(false)
          }
        }
      },
      [hasAnimated, once, isVisible]
    )

    useEffect(() => {
      // No configurar el observer si las animaciones están desactivadas
      if (shouldDisableAnimations) return

      // Optimización: Usar IntersectionObserver con opciones mejoradas
      const options = {
        root: null,
        rootMargin,
        threshold,
      }

      const observer = new IntersectionObserver(handleIntersection, options)
      const currentRef = ref.current

      if (currentRef) {
        observer.observe(currentRef)
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef)
        }
      }
    }, [handleIntersection, threshold, rootMargin, shouldDisableAnimations])

    // Optimización: Usar propiedades CSS personalizadas para animaciones
    const animationStyle = {
      '--animation-delay': `${delay}s`,
      '--animation-duration': `${duration}s`,
    }

    // Si las animaciones están desactivadas, aplicar un estilo sin animación
    const className = shouldDisableAnimations
      ? 'animate-on-scroll visible'
      : `animate-on-scroll ${animation} ${isVisible ? 'visible' : ''}`

    return (
      <div
        ref={ref}
        className={className}
        style={animationStyle}>
        {children}
      </div>
    )
  }
)

// Agregar displayName para facilitar la depuración
AnimateOnScroll.displayName = 'AnimateOnScroll'

export default AnimateOnScroll
