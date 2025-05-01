/**
 * Índice de imágenes de productos
 * 
 * Este archivo centraliza todas las importaciones de imágenes de productos
 * para facilitar su uso en toda la aplicación.
 */

// Importar imágenes de productos
import matchaCakeImage from './matcha_cake.webp'
import mochiCakeImage from './mochi_cake.webp'
import dorayakiCakeImage from './dorayaki_cake.webp'

// Exportar imágenes individualmente
export {
  matchaCakeImage,
  mochiCakeImage,
  dorayakiCakeImage
}

// Exportar como objeto para acceso por nombre
export const productImages = {
  matcha: matchaCakeImage,
  mochi: mochiCakeImage,
  dorayaki: dorayakiCakeImage
}

// Exportar función para obtener imagen por ID
export const getProductImageById = (id) => {
  return productImages[id] || null
}
