import { 
  Sprout, 
  MapPin, 
  Map,
  Users,
  Compass,
  Tractor,
  PhoneCall,
  Microscope,
  Droplets,
  CloudRain,
  Zap,
  Waves,
  Activity
} from 'lucide-react';

const AE_ZONES = ['Arid', 'Semi-Arid', 'Sub-Humid', 'Humid'];
const REGION_TYPES = ['Rural', 'Peri-Urban', 'Urban'];

const defaults = {
  agro_ecological_zone: 'Semi-Arid', 
  region_type: 'Rural', 
  farm_size_ha: 2.5,
  soil_quality_index: 75.0, 
  rainfall_mm_annual: 1200, 
  household_size: 5,
  market_distance_km: 12.0, 
  livestock_tlu: 3.5, 
  extension_access: 1,
  fertilizer_use_kg_ha: 150.0, 
  rainfall_mm_season: 450.0
};

export default function YieldForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['farm_size_ha','soil_quality_index','rainfall_mm_annual','household_size',
                  'market_distance_km','livestock_tlu','extension_access',
                  'fertilizer_use_kg_ha','rainfall_mm_season'];
    nums.forEach(k => { data[k] = parseFloat(data[k]); });
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
          <h4 className="section-title-sm">Geographic & Demographic</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={Map} label="Eco Zone" />
                <select className="input-field" name="agro_ecological_zone" defaultValue={defaults.agro_ecological_zone}>
                  {AE_ZONES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={MapPin} label="Region Type" />
                <select className="input-field" name="region_type" defaultValue={defaults.region_type}>
                  {REGION_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={Users} label="Family Size" />
                <input className="input-field" type="number" name="household_size" defaultValue={defaults.household_size} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Compass} label="Market Dist." unit="km" />
                <input className="input-field" type="number" name="market_distance_km" defaultValue={defaults.market_distance_km} step={0.1} />
             </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title-sm">Farm & Soil Profile</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={MapPin} label="Farm Size" unit="ha" />
                <input className="input-field" type="number" name="farm_size_ha" defaultValue={defaults.farm_size_ha} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Activity} label="Soil Quality" unit="0-100" />
                <input className="input-field" type="number" name="soil_quality_index" defaultValue={defaults.soil_quality_index} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Tractor} label="Livestock" unit="TLU" />
                <input className="input-field" type="number" name="livestock_tlu" defaultValue={defaults.livestock_tlu} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={PhoneCall} label="Ext. Access" unit="0/1" />
                <select className="input-field" name="extension_access" defaultValue={defaults.extension_access}>
                  <option value={0}>No Access</option>
                  <option value={1}>Full Access</option>
                </select>
             </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title-sm">Hydro & Inputs</h4>
          <div className="inputs-grid-3">
             <div className="input-group">
                <FieldLabel icon={CloudRain} label="Annual Rain" unit="mm" />
                <input className="input-field" type="number" name="rainfall_mm_annual" defaultValue={defaults.rainfall_mm_annual} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Waves} label="Season Rain" unit="mm" />
                <input className="input-field" type="number" name="rainfall_mm_season" defaultValue={defaults.rainfall_mm_season} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Microscope} label="Fertilizer" unit="kg/ha" />
                <input className="input-field" type="number" name="fertilizer_use_kg_ha" defaultValue={defaults.fertilizer_use_kg_ha} />
             </div>
          </div>
        </div>
      </div>

      <button className="submit-btn-glow" type="submit" disabled={loading}>
        {loading ? (
          <div className="loader-container">
            <div className="loader-ring" />
            <span>Calculating Yield...</span>
          </div>
        ) : (
          <>
            <Zap size={18} />
            <span>Generate Forecast</span>
          </>
        )}
      </button>
    </form>
  );
}
