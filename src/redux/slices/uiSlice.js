import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  notifications: [],
  isMenuOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
        read: false
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        notification => notification.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    }
  }
});

// Exportar acciones
export const { 
  toggleTheme, 
  setTheme, 
  addNotification, 
  removeNotification,
  markNotificationAsRead,
  clearAllNotifications,
  toggleMenu,
  closeMenu,
  openMenu
} = uiSlice.actions;

// Exportar selectores
export const selectTheme = (state) => state.ui.theme;
export const selectNotifications = (state) => state.ui.notifications;
export const selectUnreadNotificationsCount = (state) => 
  state.ui.notifications.filter(notification => !notification.read).length;
export const selectIsMenuOpen = (state) => state.ui.isMenuOpen;

export default uiSlice.reducer;
