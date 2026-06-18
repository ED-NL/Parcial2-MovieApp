# ParcialReact — MovieApp

Aplicación web SPA desarrollada con React + Vite que consume la API pública [devsapihub.com/api-movies](https://devsapihub.com/api-movies).

## Integrantes


## Tecnologías

- React 18 + Vite
- React Router DOM v6
- Fetch API (sin Axios)
- GitHub Pages para el deploy

## Funcionalidades

- Listado de películas con cards (título, imagen, género, estrellas)
- Detalle de cada película por ID con React Router
- Crear película (POST simulado → estado local)
- Editar película (PUT simulado → estado local)
- Eliminar película (DELETE simulado → estado local)
- Marcar/desmarcar favoritos
- Página de favoritos (ruta adicional)
- Tema oscuro/claro con Context API
- Custom hooks: `useFetch` y `useFavorites`
- `useRef` para foco automático en formulario y detalle

## Estructura del proyecto

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── pages/
│   ├── MoviesPage.jsx
│   ├── MovieDetailPage.jsx
│   └── FavoritesPage.jsx
├── components/
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   ├── MovieForm.jsx
│   └── Spinner.jsx
├── hooks/
│   ├── useFetch.js
│   └── useFavorites.js
├── services/
│   └── movies.service.js
└── context/
    └── ThemeContext.jsx
```

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/ED-NL/Parcial2-MovieApp.git
cd ParcialReact

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abrí [http://localhost:5173/ParcialReact/](http://localhost:5173/ParcialReact/) en el navegador.

## Deploy en GitHub Pages

```bash
npm run deploy
```

## Demo

🔗 https://github.com/ED-NL/Parcial2-MovieApp.git
