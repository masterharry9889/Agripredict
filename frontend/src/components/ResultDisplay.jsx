import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Activity, 
  ShieldCheck,
  Zap,
  Sprout,
  Waves,
  Droplets,
  ArrowRight
} from 'lucide-react';

export default function ResultDisplay({ result, type, formData }) {
  if (!result) return null;

  const renderIrrigation = (res) => {
    const isNeed = String(res.prediction) === '1' || res.prediction === 1;
    return (
      <div className="res-layout">
        <div className={`status-banner ${isNeed ? 'warning' : 'success'}`}>
           {isNeed ? <AlertCircle /> : <CheckCircle2 />}
           <span>{isNeed ? 'ACTION REQUIRED' : 'STABLE STATUS'}</span>
        </div>
        
        <div className="main-metric">
           <div className="metric-label">Irrigation Status</div>
           <div className="metric-value" style={{ color: isNeed ? '#fbbf24' : 'var(--emerald-400)' }}>
             {isNeed ? 'Resource Depleted' : 'Adequate Supply'}
           </div>
           <p className="res-desc">
             {isNeed 
               ? 'Sub-soil moisture levels are below critical threshold. Immediate replenishment is recommended.' 
               : 'Current moisture and climate data indicate optimal hydration levels.'}
           </p>
        </div>

        {res.probabilities && (
          <div className="prob-box">
             <div className="suggestion-title">Kernel Confidence Level</div>
             <div className="prob-grid">
                {Object.entries(res.probabilities).map(([cls, prob]) => (
                  <div key={cls} className="prob-item">
                     <div className="prob-header">
                       <span>{String(cls) === '1' ? 'Irrigation Need' : 'No Action'}</span>
                       <span>{prob}%</span>
                     </div>
                     <div className="prob-bar-bg">
                       <motion.div 
                         className="prob-bar-fill" 
                         initial={{ width: 0 }} 
                         animate={{ width: `${prob}%` }} 
                         style={{ background: String(cls) === '1' ? 'var(--emerald-500)' : 'rgba(255,255,255,0.1)' }}
                       />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    );
  };

  const renderYield = (res) => {
    // Attempt to calculate total yield if area is available
    const area = formData?.farm_size_ha || 1;
    const total = (parseFloat(res.prediction) * area).toFixed(2);
    
    return (
      <div className="res-layout">
        <div className="status-banner info">
          <Activity size={16} /> <span>YIELD PROJECTION ENGINE</span>
        </div>
        
        <div className="yield-grid">
           <div className="yield-main">
              <div className="metric-label">Projected Rate</div>
              <div className="metric-value">{res.prediction} <span className="unit-small">kg/ha</span></div>
           </div>
           {formData?.farm_size_ha && (
             <div className="yield-total-box">
                <div className="metric-label">Total Production</div>
                <div className="total-val">{total} <span className="unit-tiny">kg</span></div>
                <div className="area-tag">{area} ha field</div>
             </div>
           )}
        </div>

        <div className="yield-analysis-card">
           <ShieldCheck size={18} color="var(--emerald-400)" />
           <div>
              <strong>Analysis Metadata</strong>
              <p>Prediction based on seasonal rainfall ({formData?.rainfall_mm_season}mm) and fertilizer inputs ({formData?.fertilizer_use_kg_ha}kg/ha).</p>
           </div>
        </div>
      </div>
    );
  };

  const renderMarket = (res) => (
    <div className="res-layout">
      <div className="status-banner warning">
        <TrendingUp size={16} /> <span>MARKET TREND HUD</span>
      </div>
      <div className="main-metric">
        <div className="metric-label">Forecasted Price</div>
        <div className="metric-value">{res.prediction} <span className="unit-small">USD/ton</span></div>
      </div>
      <div className="market-alert-box">
         <Zap size={14} />
         <span>Price forecast accounts for seasonal factor ({formData?.Seasonal_Factor}) and competitor benchmarks.</span>
      </div>
    </div>
  );

  const renderSustain = (res) => (
    <div className="res-layout">
      <div className="status-banner success">
        <ShieldCheck size={16} /> <span>ECO-AUDIT VERIFIED</span>
      </div>
      <div className="gauge-container">
        <div className="metric-label">Sustainability Index</div>
        <div className="metric-value">{res.prediction}<span className="unit-small">%</span></div>
        <div className="gauge-track">
           <motion.div 
            className="gauge-fill" 
            initial={{ width: 0 }} 
            animate={{ width: `${res.prediction}%` }} 
           />
        </div>
      </div>
    </div>
  );

  const renderCrop = (res) => (
    <div className="res-layout">
       <div className="status-banner info">
        <Sprout size={16} /> <span>GENETIC MATCH ACQUIRED</span>
      </div>
      <div className="main-metric">
        <div className="metric-label">Optimal Cultivar</div>
        <div className="metric-value" style={{ textTransform: 'capitalize' }}>{res.prediction}</div>
      </div>
      
      {res.top_suggestions?.length > 0 && (
        <div className="suggestion-list">
          <div className="suggestion-title">Tier-2 Compatibility</div>
          {res.top_suggestions.map((s, i) => (
            <div key={i} className="suggestion-item">
              <span className="crop-name">{s.crop}</span>
              <div className="conf-group">
                <div className="conf-dot" />
                <span>{s.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const RENDERS = {
    irrigation: renderIrrigation,
    yield: renderYield,
    market: renderMarket,
    sustainability: renderSustain,
    crop: renderCrop
  };

  return (
    <motion.div 
      className="result-display-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="tech-corner tl" />
      <div className="tech-corner br" />
      {RENDERS[type] ? RENDERS[type](result) : <pre>{JSON.stringify(result, null, 2)}</pre>}
    </motion.div>
  );
}
