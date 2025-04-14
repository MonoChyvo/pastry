// Importar imágenes de productos desde el archivo centralizado
import { productImages } from '../assets/products'

// Datos de productos
export const productsData = {
  matcha: {
    id: 'matcha',
    name: 'Pastel de Matcha',
    jpName: '抹茶',
    description:
      'Delicado pastel elaborado con auténtico té matcha japonés de la más alta calidad. Su sabor intenso y ligeramente amargo se equilibra con una suave crema de vainilla.',
    shortDescription: 'Pastel elaborado con auténtico té matcha japonés.',
    ingredients: ['Té matcha ceremonial', 'Harina de trigo', 'Azúcar', 'Huevos', 'Mantequilla', 'Crema de vainilla'],
    price: 380,
    currency: 'MXN',
    image: productImages.matcha,
    featured: true,
    stock: 10,
    category: 'pasteles',
  },
  mochi: {
    id: 'mochi',
    name: 'Mochi Cake',
    jpName: '餅',
    description:
      'Inspirado en el tradicional mochi japonés, este pastel combina la textura elástica del arroz glutinoso con rellenos suaves y delicados. Una experiencia textural única.',
    shortDescription: 'Pastel inspirado en el tradicional mochi japonés.',
    ingredients: [
      'Harina de arroz glutinoso',
      'Azúcar',
      'Agua',
      'Anko (pasta de judías dulces)',
      'Fresas',
      'Polvo de kinako',
    ],
    price: 350,
    currency: 'MXN',
    image: productImages.mochi,
    featured: true,
    stock: 8,
    category: 'pasteles',
  },
  dorayaki: {
    id: 'dorayaki',
    name: 'Dorayaki Especial',
    jpName: 'どら焼き',
    description:
      'Nuestra versión del clásico dorayaki, con dos capas de bizcocho esponjoso relleno de anko casero. Hemos añadido un toque de crema batida para una experiencia más indulgente.',
    shortDescription: 'Dorayaki con dos capas de bizcocho y relleno de anko casero.',
    ingredients: ['Harina', 'Huevos', 'Miel', 'Anko (pasta de judías dulces)', 'Crema batida', 'Azúcar'],
    price: 320,
    currency: 'MXN',
    image: productImages.dorayaki,
    featured: false,
    stock: 15,
    category: 'dulces',
  },
}

// Convertir el objeto a un array para facilitar su uso
export const productsArray = Object.values(productsData)

// Función para formatear el precio
export const formatPrice = (price, currency = 'MXN') => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
  }).format(price)
}
