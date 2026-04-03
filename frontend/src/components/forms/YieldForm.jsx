const ZONES   = ['arid', 'semi_arid', 'sub_humid', 'humid', 'highland'];
const REGIONS = ['rural_remote', 'rural_accessible', 'urban'];

const defaults = {
  agro_ecological_zone: 'semi_arid', region_type: 'rural_accessible',
  farm_size_ha: 1.5, soil_quality_index: 45, rainfall_mm_annual: 700,
  household_size: 4, market_distance_km: 10, livestock_tlu: 5,
  extension_access: 'yes', fertilizer_use_kg_ha: 50, rainfall_mm_season: 350,
};

export default function YieldForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['farm_size_ha','soil_quality_index','rainfall_mm_annual',
                  'household_size','market_distance_km','livestock_tlu',
                  'fertilizer_use_kg_ha','rainfall_mm_season'];
    nums.forEach(k => { data[k] = parseFloat(data[k]); });
    onSubmit(data);
  };

  const Sel = ({ name, options }) => (
    <select className="form-select" name={name} defaultValue={defaults[name]}>
      {options.map(o => <option key={o} value={o}>{o.replace('_', ' ')}</option>)}
    </select>
  );

  const Num = ({ name, min, max, step = 0.01 }) => (
    <input className="form-input" type="number" name={name} defaultValue={defaults[name]} min={min} max={max} step={step} />
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Agro-Ecological Zone</label><Sel name="agro_ecological_zone" options={ZONES}/></div>
          <div className="form-group"><label className="form-label">Region Type</label><Sel name="region_type" options={REGIONS}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Farm Size (ha)</label><Num name="farm_size_ha" min={0.1} max={100} step={0.1}/></div>
          <div className="form-group"><label className="form-label">Soil Quality Index</label><Num name="soil_quality_index" min={0} max={100} step={0.1}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Annual Rainfall (mm)</label><Num name="rainfall_mm_annual" min={0} max={4000}/></div>
          <div className="form-group"><label className="form-label">Seasonal Rainfall (mm)</label><Num name="rainfall_mm_season" min={0} max={2000}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Household Size</label><Num name="household_size" min={1} max={20} step={1}/></div>
          <div className="form-group"><label className="form-label">Market Distance (km)</label><Num name="market_distance_km" min={0} max={200} step={0.1}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Livestock (TLU)</label><Num name="livestock_tlu" min={0} max={100} step={0.1}/></div>
          <div className="form-group"><label className="form-label">Fertilizer (kg/ha)</label><Num name="fertilizer_use_kg_ha" min={0} max={500}/></div>
        </div>
        <div className="form-group">
          <label className="form-label">Extension Access</label>
          <Sel name="extension_access" options={['yes','no']}/>
        </div>
      </div>

      <div className="model-chips" style={{marginTop:16}}>
        <span className="model-chip">Linear</span>
        <span className="model-chip">MLP</span>
        <span className="model-chip">SVR</span>
        <span className="model-chip">Decision Tree</span>
        <span className="model-chip">Random Forest</span>
        <span className="model-chip">XGBoost</span>
        <span className="model-chip">Stacked Ensemble</span>
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? '⏳ Predicting...' : '🌽 Predict Crop Yield'}
      </button>
    </form>
  );
}
