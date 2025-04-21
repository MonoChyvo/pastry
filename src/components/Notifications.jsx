import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectNotifications, 
  removeNotification 
} from '../redux/slices/uiSlice';
import './Notifications.css';

/**
 * Componente Notifications
 * ------------------------
 * Sistema global de notificaciones para mostrar mensajes informativos, de éxito o error.
 * Elimina automáticamente las notificaciones después de un tiempo definido o permite cierre manual.
 *
 * @component
 * @returns {JSX.Element|null}
 *
 * @responsabilidad
 * - Mostrar una lista de notificaciones activas.
 * - Permitir la auto-remoción y cierre manual de notificaciones.
 */
const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  // Eliminar notificaciones automáticamente después de su duración
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div 
      className="notifications-container"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification notification-${notification.type || 'info'}`}
        >
          <div className="notification-content">
            {notification.message}
          </div>
          <button 
            className="notification-close"
            onClick={() => dispatch(removeNotification(notification.id))}
            aria-label="Cerrar notificación"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
