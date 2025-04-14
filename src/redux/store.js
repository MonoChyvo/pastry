import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage por defecto
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import uiReducer from './slices/uiSlice'

// Configuración de persistencia para cada reducer
const productsPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['filters'], // Solo persistir los filtros, no los productos completos
}

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'totalItems', 'totalAmount'], // Persistir todo el carrito
}

const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['theme', 'notifications'], // Persistir tema y notificaciones
}

// Crear reducers persistentes
const persistedProductsReducer = persistReducer(productsPersistConfig, productsReducer)
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer)

// Combinar reducers
const rootReducer = combineReducers({
  products: persistedProductsReducer,
  cart: persistedCartReducer,
  ui: persistedUiReducer,
})

// Configuración global de persistencia
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['products', 'cart', 'ui'], // Evitar duplicación ya que cada reducer tiene su propia configuración
}

// Crear reducer raíz persistente
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configurar store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar acciones de redux-persist para evitar advertencias de serialización
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
})

// Crear persistor
export const persistor = persistStore(store)

export default store
