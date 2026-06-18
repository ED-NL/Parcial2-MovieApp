import { Link } from 'react-router-dom'

const MovieCard = ({ movie, onDelete, onEdit, onToggleFavorite, isFavorite, hiddenActions }) => {
  return (
    <div className="card">
      <img
        src={movie.image_url}
        alt={movie.title}
        className="card-img"
        onError={e => { e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen' }}
      />
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{movie.title}</h3>
          <button
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(movie)}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        <div className="card-meta">
          <span className="badge">{movie.genre}</span>
          <span className="badge">{movie.year}</span>
          <span>⭐ {movie.stars}</span>
        </div>
        <p className="card-desc">{movie.description.slice(0, 90)}...</p>
        {!hiddenActions && (
          <div className="card-actions">
            <Link to={`/movies/${movie.id}`} className="btn-secondary">Ver detalle</Link>
            <button className="btn-warning" onClick={() => onEdit(movie)}>Editar</button>
            <button className="btn-danger" onClick={() => onDelete(movie.id)}>Eliminar</button>
          </div>
        )}
        {hiddenActions && (
          <div className="card-actions">
            <Link to={`/movies/${movie.id}`} className="btn-secondary">Ver detalle</Link>
            <button className="btn-danger" onClick={() => onToggleFavorite(movie)}>
              Quitar ♥
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard
