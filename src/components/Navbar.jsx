import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// Consume useTheme (context) — segundo componente que lo usa
const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <nav className="navbar">
      <span className="nav-brand">🎬 MovieApp</span>
      <div className="nav-links">
        <Link to="/" className={isActive('/')}>Catálogo</Link>
        <Link to="/favorites" className={isActive('/favorites')}>Favoritos</Link>
      </div>
      <button className="btn-theme" onClick={toggleTheme}>
        {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
      </button>
    </nav>
  )
}

export default Navbar
