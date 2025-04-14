import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { productsData, productsArray } from '../../data/products'

const initialState = {
  products: productsData,
  productsList: productsArray,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: { min: 0, max: 1000 },
    featured: false,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    updateProductStock: (state, action) => {
      const { productId, quantity } = action.payload
      if (state.products[productId]) {
        state.products[productId].stock -= quantity

        // Actualizar también en la lista de productos
        const productIndex = state.productsList.findIndex((p) => p.id === productId)
        if (productIndex !== -1) {
          state.productsList[productIndex].stock -= quantity
        }
      }
    },
  },
})

// Exportar acciones
export const { setLoading, setError, setFilters, resetFilters, updateProductStock } = productsSlice.actions

// Selectores básicos (no memorizados)
const getProductsList = (state) => state.products.productsList
const getProducts = (state) => state.products.products
const getFilters = (state) => state.products.filters

// Exportar selectores memorizados
// Usamos un selector simple para productos sin transformación
export const selectAllProducts = (state) => state.products.productsList

export const selectProductById = createSelector(
  [getProducts, (state, productId) => productId],
  (products, productId) => products[productId]
)

export const selectFeaturedProducts = createSelector([getProductsList], (productsList) =>
  productsList.filter((product) => product.featured)
)

export const selectProductsByCategory = createSelector(
  [getProductsList, (state, category) => category],
  (productsList, category) => productsList.filter((product) => product.category === category)
)

export const selectFilters = createSelector([getFilters], (filters) => filters)

export const selectFilteredProducts = createSelector([getProductsList, getFilters], (productsList, filters) => {
  return productsList.filter((product) => {
    // Filtrar por categoría
    if (filters.category && product.category !== filters.category) {
      return false
    }

    // Filtrar por rango de precio
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false
    }

    // Filtrar por destacados
    if (filters.featured && !product.featured) {
      return false
    }

    return true
  })
})

export default productsSlice.reducer
