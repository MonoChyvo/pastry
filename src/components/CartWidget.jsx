import React from 'react';
import { formatPrice } from '../data/products';
import { useCart } from '../hooks/useCart';

/**
 * Componente CartWidget
 * ----------------------
 * Widget interactivo para mostrar y gestionar el carrito de compras.
 * Conectado a Redux para reflejar el estado global del carrito.
 * Permite abrir/cerrar el carrito, modificar cantidades, eliminar productos y vaciar el carrito.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @responsabilidad
 * - Mostrar el número total de productos en el carrito.
 * - Permitir la visualización y edición rápida del carrito.
 * - Gestionar acciones de producto (eliminar, modificar cantidad, vaciar carrito).
 */
const CartWidget = () => {
  const {
    cartItems,
    totalItems,
    totalAmount,
    isOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  return (
    <div className="cart-widget">
      <button 
        className="cart-toggle-button"
        onClick={toggleCart}
        aria-label="Abrir o cerrar carrito de compras"
      >
        <span className="cart-icon" aria-hidden="true">🛒</span>
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </button>

      {isOpen && (
        <div 
          className="cart-dropdown"
          role="dialog"
          aria-modal="true"
          aria-label="Carrito de compras"
        >
          <div className="cart-header">
            <h3 id="cart-title">Tu Carrito</h3>
            <button 
              className="close-cart-button"
              onClick={toggleCart}
              aria-label="Cerrar carrito"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              Tu carrito está vacío
            </div>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      {item.jpName && (
                        <span className="cart-item-jp-name">{item.jpName}</span>
                      )}
                      <div className="cart-item-price">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-item-button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="cart-actions">
                  <button 
                    className="clear-cart-button"
                    onClick={clearCart}
                    aria-label="Vaciar carrito"
                  >
                    Vaciar Carrito
                  </button>
                  <button className="checkout-button">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartWidget;
