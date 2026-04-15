const CROP_TYPES = ['Corn', 'Rice', 'Soybean', 'Wheat'];

const defaults = {
  Soil_pH: 6.8, Soil_Moisture: 45, Temperature_C: 27, Rainfall_mm: 300,
  Crop_Type: 'Wheat', Fertilizer_Usage_kg: 100, Pesticide_Usage_kg: 3, Crop_Yield_ton: 2.5,
};

export default function SustainabilityForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['Soil_pH','Soil_Moisture','Temperature_C','Rainfall_mm',
                  'Fertilizer_Usage_kg','Pesticide_Usage_kg','Crop_Yield_ton'];
    nums.forEach(k => { data[k] = parseFloat(data[k]); });
    onSubmit(data);
  };

  const Num = ({ name, min, max, step = 0.01 }) => (
    <input className="form-input" type="number" name={name} defaultValue={defaults[name]} min={min} max={max} step={step} />
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Crop Type</label>
          <select className="form-select" name="Crop_Type" defaultValue={defaults.Crop_Type}>
            {CROP_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Soil pH</label><Num name="Soil_pH" min={3} max={11} step={0.01}/></div>
          <div className="form-group"><label className="form-label">Soil Moisture (%)</label><Num name="Soil_Moisture" min={0} max={100}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Temperature (°C)</label><Num name="Temperature_C" min={-10} max={55}/></div>
          <div className="form-group"><label className="form-label">Rainfall (mm)</label><Num name="Rainfall_mm" min={0} max={3000}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Fertilizer Usage (kg)</label><Num name="Fertilizer_Usage_kg" min={0} max={500}/></div>
          <div className="form-group"><label className="form-label">Pesticide Usage (kg)</label><Num name="Pesticide_Usage_kg" min={0} max={50} step={0.01}/></div>
        </div>
        <div className="form-group">
          <label className="form-label">Crop Yield (ton)</label>
          <Num name="Crop_Yield_ton" min={0} max={20} step={0.01}/>
        </div>
      </div>

      <div className="model-chips" style={{marginTop:16}}>
        <span className="model-chip">XGBoost</span>
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? '⏳ Predicting...' : '🌱 Predict Sustainability Score'}
      </button>
    </form>
  );
}
