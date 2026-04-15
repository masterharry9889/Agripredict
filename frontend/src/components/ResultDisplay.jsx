import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

// ── Irrigation (classification) ───────────────────────────────────────────────
function IrrigationResult({ result }) {
  const level = (result.prediction || '').toLowerCase();
  const colorMap = { low: '#4ade80', medium: '#fbbf24', high: '#f87171' };
  const color = colorMap[level] || '#4ade80';
  const probas = result.probabilities || {};
  const probaColors = { Low: '#4ade80', Medium: '#fbbf24', High: '#f87171' };

  return (
    <div className="result-content">
      <p className="result-label">🌊 Irrigation Need Prediction</p>
      <div className="classification-result">
        <span className={`classification-value ${level}`} style={{ color }}>
          {result.prediction}
        </span>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8 }}>
          Irrigation Level Required
        </p>
      </div>

      {Object.keys(probas).length > 0 && (
        <div className="proba-bars">
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Confidence
          </p>
          {Object.entries(probas).map(([cls, pct]) => (
            <div key={cls} className="proba-bar-row">
              <span className="proba-bar-label" style={{ color: probaColors[cls] }}>{cls}</span>
              <div className="proba-bar-track">
                <div
                  className="proba-bar-fill"
                  style={{ width: `${pct}%`, background: probaColors[cls] }}
                />
              </div>
              <span className="proba-bar-pct">{pct}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="result-meta" style={{ marginTop: 24 }}>
        <strong>Stacked Model</strong> — Combines Decision Tree + Random Forest with a meta-learner for higher accuracy.
      </div>
    </div>
  );
}

// ── Crop Yield ────────────────────────────────────────────────────────────────
function YieldResult({ result }) {
  return (
    <div className="result-content">
      <p className="result-label">🌽 Crop Yield Prediction</p>
      <div className="numeric-result">
        <div className="numeric-value">
          <CountUp end={result.prediction} decimals={1} duration={1.5} separator="," />
        </div>
        <p className="numeric-unit">kg / hectare</p>
      </div>
      <div className="result-meta">
        <strong>Stacked Ensemble</strong> — Aggregates Linear, MLP, SVR, Decision Tree, Random Forest, and XGBoost regressors.
      </div>
    </div>
  );
}

// ── Market Price ──────────────────────────────────────────────────────────────
function MarketPriceResult({ result }) {
  return (
    <div className="result-content">
      <p className="result-label">💰 Market Price Prediction</p>
      <div className="numeric-result">
        <div className="numeric-value" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          $<CountUp end={result.prediction} decimals={2} duration={1.5} separator="," />
        </div>
        <p className="numeric-unit">USD per ton</p>
      </div>
      <div className="result-meta">
        <strong>XGBoost Regressor</strong> — Trained on demand, supply, competitor pricing, economic indicators, and seasonal factors.
      </div>
    </div>
  );
}

// ── Sustainability Score ──────────────────────────────────────────────────────
function SustainabilityResult({ result }) {
  const score = Math.round(result.prediction);
  const circumference = 2 * Math.PI * 70;
  const strokeDash = (score / 100) * circumference;
  const ringColor = score >= 70 ? '#4ade80' : score >= 40 ? '#fbbf24' : '#f87171';
  const label = score >= 70 ? 'Excellent' : score >= 40 ? 'Moderate' : 'Poor';

  return (
    <div className="result-content">
      <p className="result-label">🌱 Sustainability Score</p>
      <div className="sustain-ring-wrapper">
        <div className="sustain-ring">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            <circle cx="90" cy="90" r="70" fill="none"
              stroke={ringColor} strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              style={{ transition: 'stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)' }}
            />
          </svg>
          <div className="sustain-ring-text">
            <span className="sustain-score-num" style={{ color: ringColor }}>
              <CountUp end={score} duration={1.5} />
            </span>
            <span className="sustain-score-label">/ 100</span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: ringColor, fontFamily: 'Outfit, sans-serif' }}>
            {label}
          </span>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Sustainability Rating</p>
        </div>
      </div>
      <div className="result-meta">
        <strong>XGBoost Regressor</strong> — Evaluates soil health, chemical usage, water inputs, and crop yield to score farm sustainability.
      </div>
    </div>
  );
}

// ── Crop Recommendation ───────────────────────────────────────────────────────
function CropResult({ result }) {
  const crop = result.prediction || 'Unknown';
  const suggestions = result.top_suggestions || [];

  return (
    <div className="result-content">
      <p className="result-label">🌱 Recommended Crop</p>
      <div className="classification-result">
        <span className="classification-value" style={{ color: '#4ade80', textTransform: 'capitalize' }}>
          {crop}
        </span>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8 }}>
          Best suited for your land conditions
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="proba-bars">
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Alternative Suggestions
          </p>
          {suggestions.map((item, idx) => (
            <div key={idx} className="proba-bar-row">
              <span className="proba-bar-label" style={{ textTransform: 'capitalize' }}>{item.crop}</span>
              <div className="proba-bar-track">
                <div
                  className="proba-bar-fill"
                  style={{ width: `${item.confidence}%`, background: 'var(--green-400)' }}
                />
              </div>
              <span className="proba-bar-pct">{item.confidence}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="result-meta" style={{ marginTop: 24 }}>
        <strong>XGBoost Classifier</strong> — Analyzes NPK values, temperature, humidity, pH, and rainfall to select from 22 possible crops.
      </div>
    </div>
  );
}

// ── Loading ───────────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div className="loading-wrapper">
      <div className="spinner" />
      <p className="loading-text">Running model inference…</p>
    </div>
  );
}

// ── Empty ─────────────────────────────────────────────────────────────────────
function EmptyState({ icon, label }) {
  return (
    <div className="result-empty">
      <div className="result-empty-icon">{icon}</div>
      <p className="result-empty-text">Fill in the form and click predict<br />to see the AI result here</p>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ResultDisplay({ type, result, loading }) {
  const icons = { irrigation: '🌊', yield: '🌽', market: '💰', sustainability: '🌱', crop: '🚜' };

  if (loading) return <LoadingState />;
  if (!result)  return <EmptyState icon={icons[type]} />;

  const components = {
    irrigation:     <IrrigationResult    result={result} />,
    yield:          <YieldResult         result={result} />,
    market:         <MarketPriceResult   result={result} />,
    sustainability: <SustainabilityResult result={result} />,
    crop:           <CropResult           result={result} />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={JSON.stringify(result)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {components[type]}
      </motion.div>
    </AnimatePresence>
  );
}
