import React from 'react'
import { Link } from 'react-router-dom'
import ModernNavigation from '../components/layout/ModernNavigation'
import Footer from '../components/layout/Footer'
import AnimateOnScroll from '../components/animations/AnimateOnScroll'
import './ModernPages.css'

const ModernContactPage = () => {
  return (
    <div className='modern-page-container'>
      {/* Navegación Moderna */}
      <ModernNavigation />

      <main className='modern-page-content'>
        <AnimateOnScroll animation='fade-up'>
          <div className='modern-page-header'>
            <h1 className='modern-page-title'>
              <span className='jp-title'>連絡</span>
              <span className='latin-title'>Contacto</span>
            </h1>
          </div>
        </AnimateOnScroll>

        <div className='modern-contact-container'>
          <AnimateOnScroll
            animation='fade-right'
            delay={0.2}>
            <div className='modern-contact-info'>
              <h2>Visítanos</h2>
              <div className='contact-details'>
                <div className='contact-item'>
                  <span className='contact-label'>Dirección:</span>
                  <span className='contact-value'>Calle Cerezos 123, Col. Sakura</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-label'>Email:</span>
                  <span className='contact-value'>contacto@betsubara.com</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-label'>Teléfono:</span>
                  <span className='contact-value'>+52 555 123 4567</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-label'>Horario:</span>
                  <span className='contact-value'>Martes a Domingo: 10:00 - 19:00</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll
            animation='fade-left'
            delay={0.3}>
            <div className='modern-contact-form'>
              <h2>Envíanos un Mensaje</h2>
              <form className='contact-form'>
                <div className='form-group'>
                  <label htmlFor='name'>Nombre</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Tu nombre'
                    autoComplete='name'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='tu@email.com'
                    autoComplete='email'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='subject'>Asunto</label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    placeholder='Asunto del mensaje'
                    autoComplete='off'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='message'>Mensaje</label>
                  <textarea
                    id='message'
                    name='message'
                    rows='5'
                    placeholder='Escribe tu mensaje aquí...'
                    autoComplete='off'
                    required></textarea>
                </div>

                <AnimateOnScroll
                  animation='fade-up'
                  delay={0.4}>
                  <button
                    type='submit'
                    className='modern-submit-button'>
                    Enviar Mensaje
                  </button>
                </AnimateOnScroll>
              </form>
            </div>
          </AnimateOnScroll>
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

export default ModernContactPage
