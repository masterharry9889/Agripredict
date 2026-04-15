import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CanvasBackground from './components/effects/CanvasBackground';

function App() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <CanvasBackground />
      <div className="grid-overlay" />
      
      <Navbar />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
