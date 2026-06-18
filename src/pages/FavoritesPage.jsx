import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import MovieCard from '../components/MovieCard'

const FavoritesPage = () => {
  const { favorites, toggleFavorite, isFavorite } = useTheme()

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>❤️ Mis Favoritos</h1>
        <span className="movies-count">{favorites.length} guardadas</span>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">🎬</p>
          <p>Todavía no tenés películas favoritas.</p>
          <p>Andá al catálogo y tocá el corazón en las que te gusten.</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            ← Ver catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {favorites.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onDelete={() => toggleFavorite(movie)}
                onEdit={() => {}}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(movie.id)}
                hiddenActions
              />
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/" className="btn-secondary">← Seguir explorando</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default FavoritesPage
