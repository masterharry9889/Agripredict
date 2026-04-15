import React from 'react';

const defaults = {
  Nitrogen: 80,
  Phosphorus: 40,
  Potassium: 40,
  Temperature: 25,
  Humidity: 70,
  pH_Value: 6.5,
  Rainfall: 100,
};

export default function CropRecommendationForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    
    // Convert all fields to float
    Object.keys(data).forEach(k => {
      data[k] = parseFloat(data[k]);
    });
    
    onSubmit(data);
  };

  const Num = ({ name, label, min, max, step = 0.01 }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input 
        className="form-input" 
        type="number" 
        name={name} 
        defaultValue={defaults[name]} 
        min={min} 
        max={max} 
        step={step} 
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-grid-3">
          <Num name="Nitrogen" label="Nitrogen (N)" min={0} max={200} step={1} />
          <Num name="Phosphorus" label="Phosphorus (P)" min={0} max={200} step={1} />
          <Num name="Potassium" label="Potassium (K)" min={0} max={200} step={1} />
        </div>
        
        <div className="form-grid-2">
          <Num name="Temperature" label="Temperature (°C)" min={0} max={60} step={0.1} />
          <Num name="Humidity" label="Humidity (%)" min={0} max={100} step={0.1} />
        </div>
        
        <div className="form-grid-2">
          <Num name="pH_Value" label="pH Level" min={0} max={14} step={0.1} />
          <Num name="Rainfall" label="Rainfall (mm)" min={0} max={1000} step={0.1} />
        </div>
      </div>

      <div className="model-chips" style={{marginTop: 24}}>
        <span className="model-chip">XGBoost Classifier</span>
        <span className="model-chip">Label Mapping</span>
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? '⏳ Analyzing Soil...' : '🌱 Get Crop Recommendation'}
      </button>
    </form>
  );
}
