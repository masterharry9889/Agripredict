import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import IrrigationForm from '../components/forms/IrrigationForm';
import YieldForm from '../components/forms/YieldForm';
import MarketPriceForm from '../components/forms/MarketPriceForm';
import SustainabilityForm from '../components/forms/SustainabilityForm';
import CropRecommendationForm from '../components/forms/CropRecommendationForm';
import ResultDisplay from '../components/ResultDisplay';

const API = 'http://127.0.0.1:5000';

const TABS = [
  { id: 'irrigation',    label: 'Irrigation Need',      icon: '🌊', endpoint: '/predict/irrigation' },
  { id: 'yield',         label: 'Crop Yield',            icon: '🌽', endpoint: '/predict/yield' },
  { id: 'market',        label: 'Market Price',          icon: '💰', endpoint: '/predict/market' },
  { id: 'sustainability',label: 'Sustainability Score',  icon: '🌱', endpoint: '/predict/sustainability' },
  { id: 'crop',          label: 'Crop Recommendation',  icon: '🚜', endpoint: '/predict/crop' },
];

const FORMS = {
  irrigation:     IrrigationForm,
  yield:          YieldForm,
  market:         MarketPriceForm,
  sustainability: SustainabilityForm,
  crop:           CropRecommendationForm,
};

const HEADERS = {
  irrigation:    { title: 'Irrigation Need', desc: 'Predict whether your crop requires Low, Medium, or High irrigation based on soil conditions, weather, and crop factors.', icon: '🌊' },
  yield:         { title: 'Crop Yield',       desc: 'Estimate maize yield (kg/ha) using a 6-model stacked ensemble trained on agro-ecological and farm management data.', icon: '🌽' },
  market:        { title: 'Market Price',     desc: 'Forecast commodity price per ton using supply, demand, competitor pricing, weather impact, and seasonal trends.', icon: '💰' },
  sustainability:{ title: 'Sustainability Score', desc: 'Score farm sustainability from 0–100 based on soil health, chemical usage, water, and crop productivity.', icon: '🌱' },
  crop:          { title: 'Crop Recommendation',  desc: 'Receive AI-backed suggestions for the best crop to plant based on Nitrogen, Phosphorus, Potassium, and climatic factors.', icon: '🚜' },
};

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'irrigation');
  const [results, setResults]     = useState({});
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && TABS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  const handlePredict = async (data) => {
    const tab = TABS.find(t => t.id === activeTab);
    setLoading(true);
    try {
      const res = await axios.post(`${API}${tab.endpoint}`, data);
      setResults(prev => ({ ...prev, [activeTab]: res.data }));
      toast.success('Prediction complete!', { 
        icon: tab.icon, 
        style: { background: '#0e1812', color: '#e8f5e9', border: '1px solid rgba(74,222,128,0.3)' } 
      });
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
    <div className="dashboard-container">
      <Toaster position="top-right" />
      
      {/* Background gradient blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <section className="predict-section">
        <div className="main-section">
          <div className="section-header">
            <span className="section-eyebrow">AI Dashboard</span>
            <h2 className="section-title">Prediction Intelligence</h2>
            <p className="section-desc">
              Select a module and provide field data for real-time model inference.
            </p>
          </div>

          <div className="tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

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
                  <div className="form-panel">
                    <div className="form-panel-header">
                      <span className="form-panel-icon">{header.icon}</span>
                      <h3 className="form-panel-title">{header.title}</h3>
                      <p className="form-panel-desc">{header.desc}</p>
                    </div>
                    <ActiveForm onSubmit={handlePredict} loading={loading} />
                  </div>

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
    </div>
  );
}
