import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useTheme } from '../context/ThemeContext'
import { getMovies, deleteMovie } from '../services/movies.service'
import MovieCard from '../components/MovieCard'
import MovieForm from '../components/MovieForm'
import Spinner from '../components/Spinner'

const MoviesPage = () => {
  const { data, loading, error } = useFetch(getMovies)
  const [movies, setMovies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const { toggleFavorite, isFavorite } = useTheme()

  useEffect(() => {
    if (data) setMovies(data)
  }, [data])

  const handleDelete = async (id) => {
    await deleteMovie(id)
    setMovies(prev => prev.filter(m => m.id !== id))
  }

  const handleCreate = (newMovie) => {
    setMovies(prev => [newMovie, ...prev])
    setShowForm(false)
  }

  const handleEdit = (updatedMovie) => {
    setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m))
    setEditingMovie(null)
  }

  if (loading) return <Spinner />
  if (error) return <p className="error-msg">Error: {error}</p>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🎬 Catálogo de Películas</h1>
        <span className="movies-count">{movies.length} películas</span>
        <button className="btn-primary" onClick={() => setShowForm(prev => !prev)}>
          {showForm ? 'Cancelar' : '+ Nueva película'}
        </button>
      </div>

      {showForm && (
        <MovieForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {editingMovie && (
        <MovieForm
          movie={editingMovie}
          onSubmit={handleEdit}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={handleDelete}
            onEdit={setEditingMovie}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default MoviesPage
