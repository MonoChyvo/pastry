import React from 'react'
import { Link } from 'react-router-dom'
import ModernNavigation from '../components/layout/ModernNavigation'
import Footer from '../components/layout/Footer'
import AnimateOnScroll from '../components/animations/AnimateOnScroll'
import './ModernPages.css'

const ModernAboutPage = () => {
  return (
    <div className='modern-page-container'>
      {/* Navegación Moderna */}
      <ModernNavigation />

      <main className='modern-page-content'>
        <AnimateOnScroll animation='fade-up'>
          <div className='modern-page-header'>
            <h1 className='modern-page-title'>
              <span className='jp-title'>哲学</span>
              <span className='latin-title'>Nuestra Filosofía</span>
            </h1>
          </div>
        </AnimateOnScroll>

        <div className='modern-about-content'>
          <AnimateOnScroll
            animation='fade-up'
            delay={0.1}>
            <div className='modern-philosophy-section'>
              <div className='philosophy-cards'>
                <AnimateOnScroll
                  animation='fade-up'
                  delay={0.2}>
                  <div className='philosophy-card'>
                    <div className='philosophy-symbol'>間</div>
                    <h3>Ma</h3>
                    <p>
                      El espacio vacío que da significado a la experiencia. En nuestros pasteles, este concepto se
                      traduce en el equilibrio entre sabores y texturas, donde cada elemento tiene su lugar y propósito.
                    </p>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll
                  animation='fade-up'
                  delay={0.3}>
                  <div className='philosophy-card'>
                    <div className='philosophy-symbol'>渋い</div>
                    <h3>Shibui</h3>
                    <p>
                      La belleza que reside en la elegancia sutil y discreta. Nuestras creaciones no buscan impresionar
                      con excesos, sino con la armonía de sabores auténticos y presentaciones refinadas.
                    </p>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll
                  animation='fade-up'
                  delay={0.4}>
                  <div className='philosophy-card'>
                    <div className='philosophy-symbol'>幽玄</div>
                    <h3>Yūgen</h3>
                    <p>
                      La profundidad misteriosa que invita a descubrir capas de sabor. Cada bocado de nuestros pasteles
                      revela nuevas dimensiones de sabor que se despliegan gradualmente en el paladar.
                    </p>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll
            animation='fade-up'
            delay={0.5}>
            <div className='modern-history-section'>
              <h2 className='section-subtitle'>Nuestra Historia</h2>
              <div className='history-content'>
                <p>
                  Betsubara nació de la pasión por unir la delicadeza de la repostería francesa con la filosofía y
                  estética japonesa. Fundada en 2020, nuestra pastelería ha crecido manteniendo siempre el compromiso
                  con la calidad y la autenticidad.
                </p>
                <p>
                  El nombre "Betsubara" proviene del concepto japonés 別腹 (betsubara), que se refiere al "estómago
                  separado" que todos tenemos reservado para los postres, sin importar cuán satisfechos estemos de la
                  comida principal.
                </p>
                <p>
                  Nuestro equipo está formado por pasteleros con formación en las mejores escuelas de repostería de
                  Japón y Francia, quienes aportan su experiencia y creatividad a cada una de nuestras creaciones,
                  fusionando técnicas occidentales con sabores e ingredientes tradicionales japoneses.
                </p>
              </div>
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

export default ModernAboutPage
