import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotalItems, 
  selectCartTotalAmount,
  selectIsCartOpen,
  toggleCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from '../redux/slices/cartSlice';
import { formatPrice } from '../data/products';

const CartWidget = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const isOpen = useSelector(selectIsCartOpen);

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-widget">
      <button 
        className="cart-toggle-button"
        onClick={handleToggleCart}
      >
        <span className="cart-icon">🛒</span>
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Tu Carrito</h3>
            <button 
              className="close-cart-button"
              onClick={handleToggleCart}
            >
              ✕
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
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-item-button"
                        onClick={() => handleRemoveItem(item.id)}
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
                    onClick={handleClearCart}
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
