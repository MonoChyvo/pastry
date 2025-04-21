import React from 'react';
import { addNotification } from '../redux/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../redux/slices/productsSlice';
import './ResetStateButton.css';

/**
 * Componente ResetStateButton
 * ---------------------------
 * Botón para reiniciar filtros de productos (ya no afecta carrito).
 * Muestra confirmación antes de ejecutar la acción y notifica el resultado.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @responsabilidad
 * - Confirmar con el usuario antes de reiniciar filtros.
 * - Restablecer filtros.
 * - Mostrar notificación de éxito tras la acción.
 */
const ResetStateButton = () => {
  const dispatch = useDispatch();

  const handleResetState = () => {
    // Confirmar antes de resetear
    if (window.confirm('¿Estás seguro de que quieres restablecer los filtros de productos?')) {
      // Resetear filtros
      dispatch(resetFilters());
      // Mostrar notificación
      dispatch(addNotification({
        type: 'info',
        message: 'Filtros restablecidos correctamente',
        duration: 3000
      }));
    }
  };

  return (
    <button 
      className="reset-state-button"
      onClick={handleResetState}
      title="Restablecer filtros"
      aria-label="Restablecer filtros de productos"
    >
      <span className="reset-icon" aria-hidden="true">↺</span>
      <span className="reset-text">Restablecer Filtros</span>
    </button>
  );
};

export default ResetStateButton;
