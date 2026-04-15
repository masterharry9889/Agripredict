import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { 
  Droplets, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Search, 
  Settings,
  HelpCircle,
  Activity,
  Cpu,
  CloudSun,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

import IrrigationForm from '../components/forms/IrrigationForm';
import YieldForm from '../components/forms/YieldForm';
import MarketPriceForm from '../components/forms/MarketPriceForm';
import SustainabilityForm from '../components/forms/SustainabilityForm';
import CropRecommendationForm from '../components/forms/CropRecommendationForm';
import ResultDisplay from '../components/ResultDisplay';

const API = 'http://127.0.0.1:5000';

const TOOLS = [
  { id: 'irrigation', label: 'Irrigation', icon: <Droplets size={20} />, endpoint: '/predict/irrigation', desc: 'Forecast water requirements', tech: 'StackEnsemble-v2' },
  { id: 'yield', label: 'Crop Yield', icon: <TrendingUp size={20} />, endpoint: '/predict/yield', desc: 'Estimate harvest potential', tech: 'Regressor-X1' },
  { id: 'market', label: 'Market Price', icon: <DollarSign size={20} />, endpoint: '/predict/market', desc: 'Forecast commodity prices', tech: 'LSTM-Time-Series' },
  { id: 'sustainability', label: 'Sustainability', icon: <Leaf size={20} />, endpoint: '/predict/sustainability', desc: 'Impact & resource scoring', tech: 'EcoLogic-Net' },
  { id: 'crop', label: 'Crop Guide', icon: <Search size={20} />, endpoint: '/predict/crop', desc: 'AI-based crop selection', tech: 'RandomForest-RF2' },
];

const FORMS = {
  irrigation: IrrigationForm,
  yield: YieldForm,
  market: MarketPriceForm,
  sustainability: SustainabilityForm,
  crop: CropRecommendationForm,
};

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'irrigation');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && TOOLS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handlePredict = async (data) => {
    const tool = TOOLS.find(t => t.id === activeTab);
    setLoading(true);
    const id = toast.loading(`Kernel: Processing ${tool.label} analytics...`);
    
    try {
      const response = await axios.post(`${API}${tool.endpoint}`, data);
      setResults(prev => ({ ...prev, [activeTab]: response.data }));
      toast.success("Prediction complete!", { id });
    } catch (error) {
      console.error(error);
      toast.error("Analysis failed. Please check inputs.", { id });
    } finally {
      setLoading(false);
    }
  };

  const activeTool = TOOLS.find(t => t.id === activeTab) || TOOLS[0];
  const ActiveForm = FORMS[activeTool.id];

  return (
    <div className="dashboard-container">
      <Toaster position="bottom-right" />
      
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ marginBottom: '32px', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--emerald-500)' }}>
            <Cpu size={20} />
            <span style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '12px' }}>CORE ENGINE v4.2</span>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section">
            <span className="sidebar-label">Analytics Modules</span>
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                className={`sidebar-item ${activeTab === tool.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tool.id);
                  setSearchParams({ tab: tool.id });
                }}
              >
                {tool.icon}
                <span>{tool.label}</span>
                {activeTab === tool.id && <motion.div layoutId="active-pill" className="active-indicator" />}
              </button>
            ))}
          </div>

          <div className="sidebar-section" style={{ marginTop: 'auto' }}>
             <div className="system-stats">
                <div className="stat-row">
                  <Activity size={14} color="var(--emerald-500)" />
                  <span>Uptime: 99.9%</span>
                </div>
                <div className="stat-row">
                  <Globe size={14} color="var(--emerald-500)" />
                  <span>Region: Global</span>
                </div>
             </div>
             <button className="sidebar-item"><Settings size={18} /> <span>System Control</span></button>
             <button className="sidebar-item"><HelpCircle size={18} /> <span>Help Desk</span></button>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="main-view">
        {/* Top Status Bar */}
        <header className="dashboard-header">
           <div className="header-status">
              <div className="status-item">
                <CloudSun size={18} />
                <span>28°C Clear</span>
              </div>
              <div className="status-item">
                <div className="pulse-dot" />
                <span>Live Feed</span>
              </div>
           </div>
           <div className="header-time">{currentTime}</div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <div className="view-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span className="tech-badge">{activeTool.tech}</span>
                <span className="security-badge"><ShieldCheck size={12} /> Secure</span>
              </div>
              <h1>{activeTool.label} Analysis</h1>
              <p>{activeTool.desc}</p>
            </div>

            <div className="dashboard-content-grid">
              <div className="form-card-wrapper">
                <div className="corner corners-tl" />
                <div className="corner corners-tr" />
                <div className="corner corners-bl" />
                <div className="corner corners-br" />
                
                <div className="form-container-inner">
                  <ActiveForm onSubmit={handlePredict} loading={loading} />
                </div>
              </div>

              <div className="results-pane">
                 {results[activeTab] ? (
                   <ResultDisplay 
                    result={results[activeTab]} 
                    type={activeTab} 
                    formData={Object.fromEntries(new FormData(document.querySelector('.premium-form')).entries())}
                   />
                 ) : (
                   <div className="empty-results">
                     <Zap size={48} className="zap-icon" />
                     <h3>Awaiting Input Data</h3>
                     <p>Populate the parameters and click 'Predict' to initialize the {activeTool.label} module.</p>
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
