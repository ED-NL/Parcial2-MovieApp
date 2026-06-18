import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [favorites, setFavorites] = useState([])

  const toggleTheme = () => setDarkMode(prev => !prev)

  const toggleFavorite = (movie) => {
    setFavorites(prev =>
      prev.some(f => f.id === movie.id)
        ? prev.filter(f => f.id !== movie.id)
        : [...prev, movie]
    )
  }

  const isFavorite = (id) => favorites.some(f => f.id === id)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, favorites, toggleFavorite, isFavorite }}>
      <div className={darkMode ? 'theme-dark' : 'theme-light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
