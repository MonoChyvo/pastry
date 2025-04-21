import React, { createContext, useContext, useEffect, useState } from 'react';

// Contexto para preferencias de animación
const AnimationPreferencesContext = createContext();

export function AnimationPreferencesProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [decorativeAnimations, setDecorativeAnimations] = useState(true);

  // Detectar preferencia de usuario (sistema operativo)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  // Desactivar animaciones decorativas en móvil o si el usuario lo prefiere
  useEffect(() => {
    if (reducedMotion || isMobile) {
      setDecorativeAnimations(false);
    }
  }, [reducedMotion, isMobile]);

  return (
    <AnimationPreferencesContext.Provider value={{ reducedMotion, decorativeAnimations, setDecorativeAnimations }}>
      {children}
    </AnimationPreferencesContext.Provider>
  );
}

export function useAnimationPreferences() {
  return useContext(AnimationPreferencesContext);
}
