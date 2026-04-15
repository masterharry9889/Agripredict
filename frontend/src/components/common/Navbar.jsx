import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, LayoutDashboard, Home, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <Sprout size={24} color="#fff" />
          </div>
          AgriPredict
        </Link>

        <div className="navbar-links desktop-only">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            Predictions
          </Link>
          <a href="/#features" className="nav-link">Features</a>
        </div>

        <Link to="/dashboard" className="btn-primary desktop-only" style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '10px' }}>
          Launch App
        </Link>

        <button className="mobile-toggle">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
