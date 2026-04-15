import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MODELS = [
  { id: 'irrigation', label: 'Irrigation', path: '/dashboard?tab=irrigation', icon: '🌊' },
  { id: 'yield', label: 'Crop Yield', path: '/dashboard?tab=yield', icon: '🌽' },
  { id: 'market', label: 'Market Price', path: '/dashboard?tab=market', icon: '💰' },
  { id: 'sustainability', label: 'Eco-Score', path: '/dashboard?tab=sustainability', icon: '🌱' },
  { id: 'crop', label: 'Crop Guide', path: '/dashboard?tab=crop', icon: '🚜' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab');

  const isActive = (path, tab = null) => {
    if (tab) return activeTab === tab;
    return location.pathname === path && !activeTab;
  };

  useEffect(() => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-emoji">🌾</span> AgriPredict
        </Link>
        
        {/* Desktop Links */}
        <div className="navbar-links desktop-only">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          
          <div 
            className="nav-dropdown-trigger"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <span className={`nav-link ${(location.pathname === '/dashboard' || activeTab) ? 'active' : ''}`}>
              AI Tools <span className="dropdown-arrow">▾</span>
            </span>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="navbar-dropdown"
                >
                  <div className="dropdown-content">
                    {MODELS.map((model) => (
                      <Link 
                        key={model.id}
                        to={model.path}
                        className={`dropdown-item ${activeTab === model.id ? 'active' : ''}`}
                      >
                        <span className="item-icon">{model.icon}</span>
                        <div className="item-text">
                          <span className="item-label">{model.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="navbar-actions">
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <Link to="/" className="mobile-link">Home</Link>
            <div className="mobile-section-label">AI Models</div>
            {MODELS.map(model => (
              <Link key={model.id} to={model.path} className="mobile-link sub">
                <span>{model.icon}</span> {model.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
