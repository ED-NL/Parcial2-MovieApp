import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import useFetch from '../hooks/useFetch'
import { getMovieById } from '../services/movies.service'
import Spinner from '../components/Spinner'

const MovieDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // useRef: foco automático en el botón volver cuando carga el detalle
  const backBtnRef = useRef(null)

  const { data: movie, loading, error } = useFetch(() => getMovieById(id))

  useEffect(() => {
    if (!loading && backBtnRef.current) {
      backBtnRef.current.focus()
    }
  }, [loading])

  if (loading) return <Spinner />
  if (error) return <p className="error-msg">Error: {error}</p>
  if (!movie) return null

  const stars = Math.round(movie.stars)

  return (
    <div className="detail-container">
      <button
        ref={backBtnRef}
        className="btn-back"
        onClick={() => navigate('/')}
      >
        ← Volver al listado
      </button>

      <div className="detail-card">
        <img
          src={movie.image_url}
          alt={movie.title}
          className="detail-img"
          onError={e => { e.target.src = 'https://via.placeholder.com/300x400?text=Sin+imagen' }}
        />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span className="badge">{movie.genre}</span>
            <span className="badge">{movie.year}</span>
          </div>
          <div className="stars">
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
            <span> ({movie.stars}/5)</span>
          </div>
          <p className="detail-description">{movie.description}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage
