import React from 'react'
import logoImage from '../../assets/sello.png' // Importa la imagen para asegurarnos que está correctamente referenciada

const Logo = () => (
  <div className='logo'>
    <img
      src={logoImage} // Usar la imagen importada en lugar de una ruta relativa
      alt='Logo Betsubara'
      className='logo-image'
    />
    <div className='logo-text'>
      <span className='japanese-font'> 別腹 </span>
      <span className='latin-font'>Betsubara</span>
    </div>
  </div>
)

export default Logo
