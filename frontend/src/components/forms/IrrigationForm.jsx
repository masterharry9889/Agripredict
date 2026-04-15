import { 
  Droplets, 
  MapPin, 
  Thermometer, 
  Wind, 
  Sun, 
  CloudRain, 
  Layers, 
  Trees, 
  Calendar, 
  Waves,
  Zap,
  TrendingUp,
  FlaskConical,
  Activity,
  ShieldCheck,
  Expand
} from 'lucide-react';

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
    const nums = ['Soil_pH','Soil_Moisture','Organic_Carbon','Electrical_Conductivity',
                  'Temperature_C','Humidity','Rainfall_mm','Sunlight_Hours',
                  'Wind_Speed_kmh','Field_Area_hectare','Previous_Irrigation_mm'];
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
        
        {/* Section 1: Soil Chemistry & Env */}
        <div className="form-section">
          <h4 className="section-title-sm">Sub-surface Analytics</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Layers} label="Soil Type" />
                <select className="input-field" name="Soil_Type" defaultValue={defaults.Soil_Type}>
                  {SOIL_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Thermometer} label="pH Value" unit="pH" />
                <input className="input-field" type="number" name="Soil_pH" defaultValue={defaults.Soil_pH} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Droplets} label="Moisture" unit="%" />
                <input className="input-field" type="number" name="Soil_Moisture" defaultValue={defaults.Soil_Moisture} />
             </div>
             <div className="input-group">
                <FieldLabel icon={FlaskConical} label="Organic C" unit="%" />
                <input className="input-field" type="number" name="Organic_Carbon" defaultValue={defaults.Organic_Carbon} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Zap} label="Conductivity" unit="dS/m" />
                <input className="input-field" type="number" name="Electrical_Conductivity" defaultValue={defaults.Electrical_Conductivity} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={MapPin} label="Region" />
                <select className="input-field" name="Region" defaultValue={defaults.Region}>
                  {REGIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
          </div>
        </div>

        {/* Section 2: Climate Metrics */}
        <div className="form-section">
          <h4 className="section-title-sm">Current Weather HUD</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Thermometer} label="Temp" unit="°C" />
                <input className="input-field" type="number" name="Temperature_C" defaultValue={defaults.Temperature_C} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Droplets} label="Humidity" unit="%" />
                <input className="input-field" type="number" name="Humidity" defaultValue={defaults.Humidity} />
             </div>
             <div className="input-group">
                <FieldLabel icon={CloudRain} label="Rainfall" unit="mm" />
                <input className="input-field" type="number" name="Rainfall_mm" defaultValue={defaults.Rainfall_mm} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Sun} label="Sunlight" unit="hrs" />
                <input className="input-field" type="number" name="Sunlight_Hours" defaultValue={defaults.Sunlight_Hours} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Wind} label="Wind Speed" unit="km/h" />
                <input className="input-field" type="number" name="Wind_Speed_kmh" defaultValue={defaults.Wind_Speed_kmh} />
             </div>
          </div>
        </div>

        {/* Section 3: Field & Crop */}
        <div className="form-section">
          <h4 className="section-title-sm">Crop System Config</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Trees} label="Crop" />
                <select className="input-field" name="Crop_Type" defaultValue={defaults.Crop_Type}>
                  {CROP_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={TrendingUp} label="Stage" />
                <select className="input-field" name="Crop_Growth_Stage" defaultValue={defaults.Crop_Growth_Stage}>
                  {STAGES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Calendar} label="Season" />
                <select className="input-field" name="Season" defaultValue={defaults.Season}>
                  {SEASONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Expand} label="Area" unit="ha" />
                <input className="input-field" type="number" name="Field_Area_hectare" defaultValue={defaults.Field_Area_hectare} />
             </div>
          </div>
        </div>

        {/* Section 4: Maintenance */}
        <div className="form-section">
          <h4 className="section-title-sm">Irrigation Management</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Zap} label="Mode" />
                <select className="input-field" name="Irrigation_Type" defaultValue={defaults.Irrigation_Type}>
                  {IRRI_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Waves} label="Source" />
                <select className="input-field" name="Water_Source" defaultValue={defaults.Water_Source}>
                  {WATER_SRC.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={ShieldCheck} label="Mulching" />
                <select className="input-field" name="Mulching_Used" defaultValue={defaults.Mulching_Used}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Droplets} label="Prev Irrig" unit="mm" />
                <input className="input-field" type="number" name="Previous_Irrigation_mm" defaultValue={defaults.Previous_Irrigation_mm} />
             </div>
          </div>
        </div>
      </div>

      <button className="submit-btn-glow" type="submit" disabled={loading}>
        {loading ? (
          <div className="loader-container">
            <div className="loader-ring" />
            <span>Processing Kernel...</span>
          </div>
        ) : (
          <>
            <Zap size={18} />
            <span>Execute Analysis</span>
          </>
        )}
      </button>
    </form>
  );
}
