import { 
  Sprout, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Zap,
  FlaskConical,
  Beaker
} from 'lucide-react';

const defaults = {
  Nitrogen: 50.0, 
  Phosphorus: 40.0, 
  Potassium: 35.0, 
  Temperature: 25.5, 
  Humidity: 70.0, 
  pH_Value: 6.5, 
  Rainfall: 650.0
};

export default function CropRecommendationForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['Nitrogen', 'Phosphorus', 'Potassium', 'Temperature', 'Humidity', 'pH_Value', 'Rainfall'];
    nums.forEach(k => { if(data[k]) data[k] = parseFloat(data[k]); });
    onSubmit(data);
  };

  const FieldLabel = ({ icon: Icon, label, unit }) => (
    <div className="field-label-wrapper">
      <div className="label-main">
        <Icon size={14} className="label-icon" />
        <span className="label-text">{label}</span>
      </div>
      {unit && <span className="label-unit">({unit})</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="premium-form">
      <div className="form-sections-grid">
        
        <div className="form-section">
          <h4 className="section-title-sm">Sub-soil Chemistry (NPK)</h4>
          <div className="inputs-grid-3">
             <div className="input-group">
                <FieldLabel icon={FlaskConical} label="Nitrogen" unit="N" />
                <input className="input-field" type="number" name="Nitrogen" defaultValue={defaults.Nitrogen} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Beaker} label="Phosphorus" unit="P" />
                <input className="input-field" type="number" name="Phosphorus" defaultValue={defaults.Phosphorus} />
             </div>
             <div className="input-group">
                <FieldLabel icon={FlaskConical} label="Potassium" unit="K" />
                <input className="input-field" type="number" name="Potassium" defaultValue={defaults.Potassium} />
             </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title-sm">Env. Adaptation Specs</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Thermometer} label="Ambient Temp" unit="°C" />
                <input className="input-field" type="number" name="Temperature" defaultValue={defaults.Temperature} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Droplets} label="Humidity" unit="%" />
                <input className="input-field" type="number" name="Humidity" defaultValue={defaults.Humidity} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={FlaskConical} label="Soil pH" unit="pH" />
                <input className="input-field" type="number" name="pH_Value" defaultValue={defaults.pH_Value} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={CloudRain} label="Precipitation" unit="mm" />
                <input className="input-field" type="number" name="Rainfall" defaultValue={defaults.Rainfall} />
             </div>
          </div>
        </div>
      </div>

      <button className="submit-btn-glow" type="submit" disabled={loading}>
        {loading ? (
          <div className="loader-container">
            <div className="loader-ring" />
            <span>Scanning Database...</span>
          </div>
        ) : (
          <>
            <Sprout size={18} />
            <span>Find Optimal Crop</span>
          </>
        )}
      </button>
    </form>
  );
}
