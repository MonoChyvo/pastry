import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          jpName: product.jpName,
          price: product.price,
          image: product.image,
          quantity
        });
      }
      
      // Actualizar totales
      state.totalItems += quantity;
      state.totalAmount += product.price * quantity;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem) {
        // Actualizar totales antes de eliminar
        state.totalItems -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        
        // Eliminar el item
        state.items = state.items.filter(item => item.id !== productId);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem) {
        // Calcular la diferencia para actualizar los totales
        const quantityDiff = quantity - existingItem.quantity;
        
        // Actualizar la cantidad
        existingItem.quantity = quantity;
        
        // Actualizar totales
        state.totalItems += quantityDiff;
        state.totalAmount += existingItem.price * quantityDiff;
        
        // Si la cantidad es 0, eliminar el item
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    openCart: (state) => {
      state.isOpen = true;
    }
  }
});

// Exportar acciones
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  toggleCart,
  closeCart,
  openCart
} = cartSlice.actions;

// Exportar selectores
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectIsCartOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
