import { useState } from 'react'

/**
 * Custom hook para manejar películas favoritas.
 * Encapsula lógica reutilizable de toggle y consulta.
 * Se usa en MovieCard y FavoritesPage.
 */
const useFavorites = () => {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (movie) => {
    setFavorites(prev =>
      prev.some(f => f.id === movie.id)
        ? prev.filter(f => f.id !== movie.id)
        : [...prev, movie]
    )
  }

  const isFavorite = (id) => favorites.some(f => f.id === id)

  return { favorites, toggleFavorite, isFavorite }
}

export default useFavorites
