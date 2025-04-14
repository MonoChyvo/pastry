import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import PageTransition from './components/layout/PageTransition'
import Notifications from './components/Notifications'
import ResetStateButton from './components/ResetStateButton'

// Importar páginas con lazy loading
const HomePage = lazy(() => import('./pages/ModernHomePage'))
const ProductsPage = lazy(() => import('./pages/ModernProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const AboutPage = lazy(() => import('./pages/ModernAboutPage'))
const ContactPage = lazy(() => import('./pages/ModernContactPage'))

// Componente de carga mejorado
const LoadingFallback = () => (
  <div className='loading-fallback'>
    <div className='loading-spinner-container'>
      <div className='loading-spinner'></div>
      <p className='loading-text'>Cargando...</p>
    </div>
  </div>
)

// Componente de error para Suspense
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className='error-fallback'>
    <h2>Algo salió mal</h2>
    <p>{error.message || 'Error al cargar el contenido'}</p>
    <button onClick={resetErrorBoundary}>Intentar de nuevo</button>
  </div>
)

// Componente principal
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

// Componente interno para acceder al contexto de ubicación
const AppContent = () => {
  return (
    <>
      <Notifications />
      <ResetStateButton />

      <Suspense fallback={<LoadingFallback />}>
        <PageTransition>
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/productos'
              element={<ProductsPage />}
            />
            <Route
              path='/productos/:productId'
              element={<ProductDetailPage />}
            />
            <Route
              path='/nosotros'
              element={<AboutPage />}
            />
            <Route
              path='/contacto'
              element={<ContactPage />}
            />
          </Routes>
        </PageTransition>
      </Suspense>
    </>
  )
}

export default App
