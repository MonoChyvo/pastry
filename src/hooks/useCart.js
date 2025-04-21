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

/**
 * Hook personalizado para gestión del carrito de compras.
 * Centraliza el acceso al estado y acciones del carrito usando Redux.
 *
 * @returns {Object} Estado y acciones del carrito
 */
export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const isOpen = useSelector(selectIsCartOpen);

  return {
    cartItems,
    totalItems,
    totalAmount,
    isOpen,
    toggleCart: () => dispatch(toggleCart()),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (id, qty) => dispatch(updateQuantity({ productId: id, quantity: qty })),
    clearCart: () => dispatch(clearCart()),
  };
}
