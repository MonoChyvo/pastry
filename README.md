# Betsubara (別腹) - Pastelería Japonesa

## Descripción

Betsubara es una aplicación web para una pastelería artesanal inspirada en la tradición y filosofía japonesa. El nombre "Betsubara" proviene del concepto japonés 別腹 (betsubara), que se refiere al "estómago separado" que todos tenemos reservado para los postres, sin importar cuán satisfechos estemos de la comida principal.

La aplicación ofrece una experiencia de usuario moderna y elegante, con animaciones suaves y un diseño que refleja la estética japonesa, combinando la delicadeza de la repostería francesa con la filosofía nipona.

## Características

- **Catálogo de Productos**: Visualización de productos de pastelería japonesa con detalles, ingredientes y precios.
- **Carrito de Compras**: Funcionalidad completa para añadir productos, actualizar cantidades y gestionar el carrito.
- **Persistencia de Datos**: Estado persistente para el carrito y preferencias del usuario mediante Redux Persist.
- **Diseño Responsivo**: Experiencia optimizada para dispositivos móviles y de escritorio.
- **Animaciones**: Transiciones y animaciones suaves para mejorar la experiencia del usuario.
- **Navegación Intuitiva**: Estructura de navegación clara con React Router.

## Tecnologías Utilizadas

- **React 19**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción que proporciona un entorno de desarrollo más rápido.
- **Redux Toolkit**: Gestión de estado de la aplicación.
- **Redux Persist**: Persistencia del estado en almacenamiento local.
- **React Router**: Navegación entre páginas.
- **CSS Moderno**: Variables CSS, flexbox y grid para layouts responsivos.
- **Animaciones CSS**: Transiciones y animaciones para mejorar la experiencia de usuario.

## Estructura del Proyecto

```
betsubara/
├── public/              # Archivos públicos
├── src/                 # Código fuente
│   ├── assets/          # Imágenes y recursos estáticos
│   ├── components/      # Componentes reutilizables
│   │   ├── animations/  # Componentes de animación
│   │   └── layout/      # Componentes de estructura
│   ├── data/            # Datos de productos
│   ├── pages/           # Páginas de la aplicación
│   ├── redux/           # Configuración y slices de Redux
│   │   └── slices/      # Slices para diferentes funcionalidades
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos globales
│   ├── index.css        # Estilos de reset
│   └── main.jsx         # Punto de entrada
├── index.html           # Plantilla HTML
├── package.json         # Dependencias y scripts
└── vite.config.js       # Configuración de Vite
```

## Filosofía del Diseño

El diseño de Betsubara se basa en conceptos japoneses fundamentales:

- **Ma (間)**: El espacio vacío que da significado a la experiencia, traducido en el equilibrio entre sabores y texturas.
- **Wabi-Sabi (侘寂)**: La belleza de lo imperfecto y efímero, reflejada en la presentación artesanal de nuestros productos.
- **Shun (旬)**: El respeto por la temporalidad de los ingredientes, utilizando productos de temporada para maximizar su sabor.

## Productos Destacados

- **Pastel de Matcha (抹茶)**: Delicado pastel elaborado con auténtico té matcha japonés de la más alta calidad.
- **Mochi Cake (餅)**: Inspirado en el tradicional mochi japonés, con textura elástica del arroz glutinoso.
- **Dorayaki Especial (どら焼き)**: Versión especial del clásico dorayaki con anko casero.

## Instalación y Uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/betsubara.git
   cd betsubara
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta el linter para verificar el código.
- `npm run preview`: Previsualiza la versión de producción localmente.

## Contribución

Si deseas contribuir a este proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

---

&copy; 2025 Betsubara. Todos los derechos reservados.
