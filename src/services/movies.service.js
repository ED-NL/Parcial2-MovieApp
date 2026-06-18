const BASE_URL = 'https://devsapihub.com/api-movies'

export const getMovies = async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Error al obtener las películas')
  const data = await res.json()

  // Fisher-Yates shuffle para orden aleatorio en cada carga (20 películas)
  const movies = [...data]
  for (let i = movies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [movies[i], movies[j]] = [movies[j], movies[i]]
  }

  return movies
}

export const getMovieById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Película no encontrada')
  return res.json()
}

export const createMovie = async (movie) => {
  return { ...movie, id: Date.now() }
}

export const updateMovie = async (id, data) => {
  return { ...data, id: Number(id) }
}

export const deleteMovie = async (id) => {
  return { success: true, id }
}
