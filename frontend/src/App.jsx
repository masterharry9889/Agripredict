import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import HeroSection from './components/HeroSection';
import IrrigationForm from './components/forms/IrrigationForm';
import YieldForm from './components/forms/YieldForm';
import MarketPriceForm from './components/forms/MarketPriceForm';
import SustainabilityForm from './components/forms/SustainabilityForm';
import ResultDisplay from './components/ResultDisplay';

const API = 'http://127.0.0.1:5000';

const TABS = [
  { id: 'irrigation',    label: 'Irrigation Need',      icon: '🌊', endpoint: '/predict/irrigation' },
  { id: 'yield',         label: 'Crop Yield',            icon: '🌽', endpoint: '/predict/yield' },
  { id: 'market',        label: 'Market Price',          icon: '💰', endpoint: '/predict/market' },
  { id: 'sustainability',label: 'Sustainability Score',  icon: '🌱', endpoint: '/predict/sustainability' },
];

const FORMS = {
  irrigation:    IrrigationForm,
  yield:         YieldForm,
  market:        MarketPriceForm,
  sustainability: SustainabilityForm,
};

const HEADERS = {
  irrigation:    { title: 'Irrigation Need', desc: 'Predict whether your crop requires Low, Medium, or High irrigation based on soil conditions, weather, and crop factors.', icon: '🌊' },
  yield:         { title: 'Crop Yield',       desc: 'Estimate maize yield (kg/ha) using a 6-model stacked ensemble trained on agro-ecological and farm management data.', icon: '🌽' },
  market:        { title: 'Market Price',     desc: 'Forecast commodity price per ton using supply, demand, competitor pricing, weather impact, and seasonal trends.', icon: '💰' },
  sustainability:{ title: 'Sustainability Score', desc: 'Score farm sustainability from 0–100 based on soil health, chemical usage, water, and crop productivity.', icon: '🌱' },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('irrigation');
  const [results, setResults]     = useState({});
  const [loading, setLoading]     = useState(false);
  const predictRef = useRef(null);

  const handlePredict = async (data) => {
    const tab = TABS.find(t => t.id === activeTab);
    setLoading(true);
    try {
      const res = await axios.post(`${API}${tab.endpoint}`, data);
      setResults(prev => ({ ...prev, [activeTab]: res.data }));
      toast.success('Prediction complete!', { icon: tab.icon, style: { background: '#0e1812', color: '#e8f5e9', border: '1px solid rgba(74,222,128,0.3)' } });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to connect to the backend. Is Flask running on port 5000?';
      toast.error(msg, { style: { background: '#1a0a0a', color: '#fca5a5', border: '1px solid rgba(248,113,113,0.3)' } });
    } finally {
      setLoading(false);
    }
  };

  const ActiveForm = FORMS[activeTab];
  const header = HEADERS[activeTab];

  return (
    <div className="app-wrapper">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="navbar-logo">🌾 AgriPredict</a>
        <div className="navbar-status">
          <div className="status-dot" />
          ML Models Active
        </div>
      </nav>

      {/* Hero */}
      <HeroSection onExplore={() => predictRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Background gradient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '30%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Prediction Section */}
      <section id="predict" ref={predictRef} style={{ position: 'relative', zIndex: 1 }}>
        <div className="main-section">
          <div className="section-header">
            <p className="section-eyebrow">AI Predictions</p>
            <h2 className="section-title">Choose Your Prediction Module</h2>
            <p className="section-desc">
              Each module uses a purpose-trained machine learning model. Select a tab, enter your field data, and get instant predictions.
            </p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="glass-card">
                <div className="prediction-layout">
                  {/* Form side */}
                  <div className="form-panel">
                    <div className="form-panel-header">
                      <span className="form-panel-icon">{header.icon}</span>
                      <h3 className="form-panel-title">{header.title}</h3>
                      <p className="form-panel-desc">{header.desc}</p>
                    </div>
                    <ActiveForm onSubmit={handlePredict} loading={loading} />
                  </div>

                  {/* Result side */}
                  <div className="result-panel">
                    <ResultDisplay
                      type={activeTab}
                      result={results[activeTab] || null}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)', fontSize: 13, borderTop: '1px solid var(--border-color)', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--green-400)', marginBottom: 8 }}>
          🌾 AgriPredict
        </p>
        <p>AI-Powered Agricultural Intelligence • Built with Stacked ML Ensembles</p>
        <p style={{ marginTop: 8 }}>
          Models: Stacked Classifier (Irrigation) • Stacked Regressor (Yield) • XGBoost (Market Price & Sustainability)
        </p>
      </footer>
    </div>
  );
}
