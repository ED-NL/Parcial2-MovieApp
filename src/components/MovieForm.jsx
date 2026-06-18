import { useState, useRef, useEffect } from 'react'
import { createMovie, updateMovie } from '../services/movies.service'

// useRef: foco automático en el primer input al abrir el formulario
const MovieForm = ({ movie, onSubmit, onCancel }) => {
  const isEditing = Boolean(movie)
  const titleRef = useRef(null)

  const [form, setForm] = useState({
    title: movie?.title || '',
    description: movie?.description || '',
    year: movie?.year || new Date().getFullYear(),
    genre: movie?.genre || '',
    stars: movie?.stars || 1,
    image_url: movie?.image_url || '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // useRef aplicado: foco automático al primer input al montar el formulario
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      let result
      if (isEditing) {
        result = await updateMovie(movie.id, form)
      } else {
        result = await createMovie(form)
      }
      onSubmit(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar película' : 'Nueva película'}</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label>Título *</label>
          <input
            ref={titleRef}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Nombre de la película"
          />
        </div>
        <div className="form-group">
          <label>Descripción *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Descripción breve"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Año</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              min="1900"
              max="2100"
            />
          </div>
          <div className="form-group">
            <label>Género</label>
            <select name="genre" value={form.genre} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Action">Acción</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedia</option>
              <option value="Sci-Fi">Ciencia Ficción</option>
              <option value="Crime">Crimen</option>
              <option value="Fantasy">Fantasía</option>
              <option value="Adventure">Aventura</option>
              <option value="Biography">Biografía</option>
              <option value="Western">Western</option>
            </select>
          </div>
          <div className="form-group">
            <label>Estrellas (1-5)</label>
            <input
              type="number"
              name="stars"
              value={form.stars}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
            />
          </div>
        </div>
        <div className="form-group">
          <label>URL de imagen</label>
          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear película'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default MovieForm
