# Guía de Despliegue en GitHub Pages - Proyecto Betsubara

Esta guía proporciona instrucciones detalladas para el despliegue y mantenimiento del sitio web de Betsubara en GitHub Pages.

## Configuración Inicial

### Preparación del Repositorio

1. **Estructura del Proyecto**:
   - El proyecto debe tener la estructura adecuada para Vite y React
   - El archivo `vite.config.js` debe estar configurado correctamente para GitHub Pages

2. **Configuración de Base URL**:
   ```javascript
   // vite.config.js
   export default defineConfig({
     plugins: [react()],
     base: '/betsubara/', // Nombre del repositorio
     // Resto de la configuración...
   })
   ```

3. **Configuración del package.json**:
   - Asegurarse de que el script de despliegue esté configurado:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
   - Verificar que la dependencia `gh-pages` esté instalada:
   ```json
   "devDependencies": {
     "gh-pages": "^6.3.0"
   }
   ```

### Configuración de GitHub

1. **Repositorio**:
   - El repositorio debe ser público
   - Nombre actual: `betsubara`
   - URL: https://github.com/MonoChyvo/betsubara

2. **Configuración de GitHub Pages**:
   - Ir a Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
   - Guardar la configuración

## Proceso de Despliegue

### Pasos para Desplegar

1. **Preparar el Código**:
   ```bash
   # Asegurarse de que todos los cambios estén guardados
   git add .
   git commit -m "Preparación para despliegue"
   git push origin main
   ```

2. **Construir el Proyecto**:
   ```bash
   npm run build
   ```
   - Esto generará la carpeta `dist` con los archivos optimizados

3. **Desplegar a GitHub Pages**:
   ```bash
   npm run deploy
   ```
   - Este comando utilizará gh-pages para publicar la carpeta `dist` en la rama gh-pages

4. **Verificar el Despliegue**:
   - Ir a https://monochyvo.github.io/betsubara/
   - Puede tomar unos minutos para que los cambios se reflejen

### Solución de Problemas Comunes

1. **Rutas Incorrectas**:
   - Si las imágenes o recursos no cargan, verificar que las rutas sean relativas a la base URL
   - Usar `import` para recursos en lugar de rutas absolutas cuando sea posible

2. **Página en Blanco**:
   - Verificar la consola del navegador para errores
   - Asegurarse de que `base` en vite.config.js coincida con el nombre del repositorio

3. **404 en Rutas de React Router**:
   - Crear un archivo `404.html` que redirija a `index.html`
   - Configurar React Router para usar `HashRouter` en lugar de `BrowserRouter`

## Mantenimiento

### Actualización del Sitio

1. **Proceso Regular**:
   - Hacer cambios en la rama principal (main)
   - Probar localmente con `npm run dev`
   - Construir y desplegar como se describió anteriormente

2. **Cambios en la Configuración**:
   - Si se cambia el nombre del repositorio, actualizar `base` en vite.config.js
   - Actualizar todas las referencias al nombre del repositorio en el código

### Monitoreo

1. **Verificación Post-Despliegue**:
   - Comprobar que todas las páginas carguen correctamente
   - Verificar la funcionalidad en diferentes dispositivos y navegadores
   - Revisar la consola del navegador para errores

2. **Análisis de Rendimiento**:
   - Usar Lighthouse o PageSpeed Insights para evaluar el rendimiento
   - Implementar mejoras basadas en los resultados

## Referencias Útiles

- [Documentación oficial de GitHub Pages](https://docs.github.com/es/pages)
- [Guía de Vite para despliegue](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Documentación de gh-pages](https://github.com/tschaub/gh-pages)

---

**Nota**: Mantener esta guía actualizada con cualquier cambio en el proceso de despliegue o configuración.
