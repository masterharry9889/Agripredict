import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  CloudRain,
  Zap,
  Microscope,
  TrendingUp,
  FlaskConical,
  Beaker
} from 'lucide-react';

const CROP_TYPES = ['Cotton', 'Maize', 'Potato', 'Rice', 'Sugarcane', 'Wheat'];

const defaults = {
  Soil_pH: 6.5, 
  Soil_Moisture: 45.0, 
  Temperature_C: 28.0, 
  Rainfall_mm: 550.0,
  Crop_Type: 'Rice', 
  Fertilizer_Usage_kg: 150.0, 
  Pesticide_Usage_kg: 2.5, 
  Crop_Yield_ton: 3.2
};

export default function SustainabilityForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['Soil_pH','Soil_Moisture','Temperature_C','Rainfall_mm',
                  'Fertilizer_Usage_kg','Pesticide_Usage_kg','Crop_Yield_ton'];
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
          <h4 className="section-title-sm">Env. Conditions</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={FlaskConical} label="Soil pH" unit="pH" />
                <input className="input-field" type="number" name="Soil_pH" defaultValue={defaults.Soil_pH} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Droplets} label="Moisture" unit="%" />
                <input className="input-field" type="number" name="Soil_Moisture" defaultValue={defaults.Soil_Moisture} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Thermometer} label="Temp" unit="°C" />
                <input className="input-field" type="number" name="Temperature_C" defaultValue={defaults.Temperature_C} />
             </div>
             <div className="input-group">
                <FieldLabel icon={CloudRain} label="Rainfall" unit="mm" />
                <input className="input-field" type="number" name="Rainfall_mm" defaultValue={defaults.Rainfall_mm} />
             </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title-sm">Input & Output Audit</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Leaf} label="Crop Type" />
                <select className="input-field" name="Crop_Type" defaultValue={defaults.Crop_Type}>
                  {CROP_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Microscope} label="Fertilizer" unit="kg" />
                <input className="input-field" type="number" name="Fertilizer_Usage_kg" defaultValue={defaults.Fertilizer_Usage_kg} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Beaker} label="Pesticide" unit="kg" />
                <input className="input-field" type="number" name="Pesticide_Usage_kg" defaultValue={defaults.Pesticide_Usage_kg} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={TrendingUp} label="Total Yield" unit="ton" />
                <input className="input-field" type="number" name="Crop_Yield_ton" defaultValue={defaults.Crop_Yield_ton} step={0.1} />
             </div>
          </div>
        </div>
      </div>

      <button className="submit-btn-glow" type="submit" disabled={loading}>
        {loading ? (
          <div className="loader-container">
            <div className="loader-ring" />
            <span>Auditing Sustainability...</span>
          </div>
        ) : (
          <>
            <Zap size={18} />
            <span>Generate Eco-Score</span>
          </>
        )}
      </button>
    </form>
  );
}
