import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🌾 AgriPredict</Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Predictions</Link>
      </div>
      <div className="navbar-status">
        <div className="status-dot" />
        ML Models Active
      </div>
    </nav>
  );
}
