import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import './Footer.css'

/**
 * Footer - Componente reutilizable para el pie de página
 * 
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.showLogo - Indica si se debe mostrar el logo (por defecto: true)
 * @param {Array} props.socialLinks - Enlaces a redes sociales personalizados
 * @param {string} props.copyrightText - Texto personalizado para el copyright
 * @param {number} props.year - Año para el copyright (por defecto: año actual)
 */
const Footer = ({
  showLogo = true,
  socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Twitter', url: '#' }
  ],
  copyrightText = 'Betsubara. Todos los derechos reservados.',
  year = new Date().getFullYear()
}) => {
  return (
    <footer className='modern-footer'>
      <div className='footer-content'>
        {showLogo && (
          <div className='footer-logo'>
            <Logo />
          </div>
        )}
        
        <div className='footer-links'>
          <Link to='/'>Inicio</Link>
          <Link to='/productos'>Productos</Link>
          <Link to='/nosotros'>Nosotros</Link>
          <Link to='/contacto'>Contacto</Link>
        </div>
        
        <div className='footer-social'>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className='social-icon'
              target='_blank'
              rel='noopener noreferrer'>
              {link.name}
            </a>
          ))}
        </div>
        
        <div className='footer-copyright'>
          <p>&copy; {year} {copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
