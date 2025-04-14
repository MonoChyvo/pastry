import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { resetFilters } from '../redux/slices/productsSlice';
import { addNotification } from '../redux/slices/uiSlice';
import './ResetStateButton.css';

const ResetStateButton = () => {
  const dispatch = useDispatch();

  const handleResetState = () => {
    // Confirmar antes de resetear
    if (window.confirm('¿Estás seguro de que quieres reiniciar la aplicación? Se perderán los datos del carrito y las preferencias.')) {
      // Limpiar el carrito
      dispatch(clearCart());
      
      // Resetear filtros
      dispatch(resetFilters());
      
      // Mostrar notificación
      dispatch(addNotification({
        type: 'info',
        message: 'La aplicación ha sido reiniciada correctamente',
        duration: 3000
      }));
    }
  };

  return (
    <button 
      className="reset-state-button"
      onClick={handleResetState}
      title="Reiniciar aplicación"
    >
      <span className="reset-icon">↺</span>
      <span className="reset-text">Reiniciar</span>
    </button>
  );
};

export default ResetStateButton;
