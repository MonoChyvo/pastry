# Imágenes de Productos

Este directorio contiene las imágenes de los productos para la aplicación Betsubara.

## Formato de imágenes

Para cada imagen, se recomienda tener dos versiones:
- Versión JPG/PNG: Para navegadores que no soportan WebP
- Versión WebP: Para navegadores modernos (mejor rendimiento y calidad)

El componente `LazyImage` detectará automáticamente si hay una versión WebP disponible y la utilizará si el navegador la soporta.

## Convención de nombres

Para que el componente `LazyImage` pueda encontrar correctamente las versiones WebP, asegúrate de que los nombres de archivo sigan esta convención:

- `nombre_producto.jpg` - Versión JPG
- `nombre_producto.webp` - Versión WebP (mismo nombre base, extensión diferente)

## Optimización de imágenes

Para un mejor rendimiento, se recomienda:

1. Redimensionar las imágenes al tamaño máximo en que se mostrarán
2. Comprimir las imágenes sin pérdida visible de calidad
3. Crear versiones WebP para todas las imágenes

## Herramientas recomendadas

- [Squoosh](https://squoosh.app/) - Herramienta online para optimizar y convertir imágenes
- [ImageOptim](https://imageoptim.com/) - Aplicación para Mac para optimizar imágenes
- [TinyPNG](https://tinypng.com/) - Servicio online para comprimir imágenes PNG y JPG
