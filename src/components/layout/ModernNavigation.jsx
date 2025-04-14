import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../ui/Logo'
import CartWidget from '../CartWidget'
import './ModernNavigation.css'

const ModernNavigation = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Referencias para rastrear la posición del scroll
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Detectar scroll para cambiar el estilo y visibilidad de la barra de navegación
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Determinar si se ha desplazado lo suficiente para cambiar el estilo
          const isScrolled = currentScrollY > 50
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled)
          }

          // Determinar la dirección del desplazamiento y si debe ocultarse
          // Solo ocultar después de desplazarse 100px y cuando se desplaza hacia abajo
          if (currentScrollY > 100) {
            setHidden(currentScrollY > lastScrollY.current && !menuOpen)
          } else {
            setHidden(false)
          }

          lastScrollY.current = currentScrollY
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled, menuOpen])

  // Cerrar el menú móvil cuando se cambia de ruta
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const toggleMenu = () => {
    // Al abrir el menú, asegurarse de que la barra de navegación sea visible
    if (!menuOpen) {
      setHidden(false)
    }
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      {/* Área sensible para mostrar la barra de navegación al hacer hover */}
      <div className='nav-reveal-area'></div>
      <header className={`modern-header ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
        <div className='modern-header-container'>
          <Link
            to='/'
            className='modern-logo-container'>
            <Logo />
          </Link>

          {/* Botón de menú hamburguesa para móviles */}
          <button
            className='menu-toggle'
            onClick={toggleMenu}
            aria-label='Menú de navegación'>
            <span className={`menu-icon ${menuOpen ? 'open' : ''}`}></span>
          </button>

          {/* Navegación principal */}
          <nav className={`modern-nav ${menuOpen ? 'open' : ''}`}>
            <Link
              to='/'
              className={`modern-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Inicio
            </Link>
            <Link
              to='/productos'
              className={`modern-nav-link ${location.pathname === '/productos' ? 'active' : ''}`}>
              Productos
            </Link>
            <Link
              to='/nosotros'
              className={`modern-nav-link ${location.pathname === '/nosotros' ? 'active' : ''}`}>
              Nosotros
            </Link>
            <Link
              to='/contacto'
              className={`modern-nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}>
              Contacto
            </Link>
            <CartWidget />
          </nav>
        </div>
      </header>
    </>
  )
}

export default ModernNavigation
