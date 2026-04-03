const SOIL_TYPES = ['Clay', 'Loamy', 'Sandy', 'Silt'];
const CROP_TYPES  = ['Cotton', 'Maize', 'Potato', 'Rice', 'Sugarcane', 'Wheat'];
const STAGES      = ['Flowering', 'Harvest', 'Sowing', 'Vegetative'];
const SEASONS     = ['Kharif', 'Rabi', 'Zaid'];
const IRRI_TYPES  = ['Drip', 'Flood', 'Rainfed', 'Sprinkler'];
const WATER_SRC   = ['Borewell', 'Canal', 'Pond', 'Rainwater', 'River'];
const REGIONS     = ['Central', 'East', 'North', 'South', 'West'];

const defaults = {
  Soil_Type: 'Loamy', Soil_pH: 6.5, Soil_Moisture: 40, Organic_Carbon: 1.0,
  Electrical_Conductivity: 1.5, Temperature_C: 28, Humidity: 60,
  Rainfall_mm: 500, Sunlight_Hours: 7, Wind_Speed_kmh: 15,
  Crop_Type: 'Rice', Crop_Growth_Stage: 'Vegetative', Season: 'Kharif',
  Irrigation_Type: 'Drip', Water_Source: 'Canal', Field_Area_hectare: 2,
  Mulching_Used: 'No', Previous_Irrigation_mm: 50, Region: 'South',
};

export default function IrrigationForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    // coerce numerics
    const nums = ['Soil_pH','Soil_Moisture','Organic_Carbon','Electrical_Conductivity',
                  'Temperature_C','Humidity','Rainfall_mm','Sunlight_Hours',
                  'Wind_Speed_kmh','Field_Area_hectare','Previous_Irrigation_mm'];
    nums.forEach(k => { data[k] = parseFloat(data[k]); });
    onSubmit(data);
  };

  const Sel = ({ name, options }) => (
    <select className="form-select" name={name} defaultValue={defaults[name]}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  const Num = ({ name, min, max, step = 0.01 }) => (
    <input className="form-input" type="number" name={name} defaultValue={defaults[name]} min={min} max={max} step={step} />
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Soil Type</label><Sel name="Soil_Type" options={SOIL_TYPES}/></div>
          <div className="form-group"><label className="form-label">Region</label><Sel name="Region" options={REGIONS}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Soil pH</label><Num name="Soil_pH" min={3} max={11} step={0.01}/></div>
          <div className="form-group"><label className="form-label">Soil Moisture (%)</label><Num name="Soil_Moisture" min={0} max={100}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Organic Carbon</label><Num name="Organic_Carbon" min={0} max={10}/></div>
          <div className="form-group"><label className="form-label">Electrical Conductivity</label><Num name="Electrical_Conductivity" min={0} max={10}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Temperature (°C)</label><Num name="Temperature_C" min={-10} max={55}/></div>
          <div className="form-group"><label className="form-label">Humidity (%)</label><Num name="Humidity" min={0} max={100}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Rainfall (mm)</label><Num name="Rainfall_mm" min={0} max={3000}/></div>
          <div className="form-group"><label className="form-label">Sunlight Hours</label><Num name="Sunlight_Hours" min={0} max={16} step={0.1}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Wind Speed (km/h)</label><Num name="Wind_Speed_kmh" min={0} max={100}/></div>
          <div className="form-group"><label className="form-label">Field Area (ha)</label><Num name="Field_Area_hectare" min={0.1} max={50} step={0.1}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Crop Type</label><Sel name="Crop_Type" options={CROP_TYPES}/></div>
          <div className="form-group"><label className="form-label">Growth Stage</label><Sel name="Crop_Growth_Stage" options={STAGES}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Season</label><Sel name="Season" options={SEASONS}/></div>
          <div className="form-group"><label className="form-label">Irrigation Type</label><Sel name="Irrigation_Type" options={IRRI_TYPES}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Water Source</label><Sel name="Water_Source" options={WATER_SRC}/></div>
          <div className="form-group"><label className="form-label">Mulching Used</label><Sel name="Mulching_Used" options={['No','Yes']}/></div>
        </div>
        <div className="form-group"><label className="form-label">Previous Irrigation (mm)</label><Num name="Previous_Irrigation_mm" min={0} max={500}/></div>
      </div>

      <div className="model-chips" style={{marginTop:16}}>
        <span className="model-chip">Decision Tree</span>
        <span className="model-chip">Random Forest</span>
        <span className="model-chip">Stacked Ensemble</span>
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? '⏳ Predicting...' : '🌊 Predict Irrigation Need'}
      </button>
    </form>
  );
}
