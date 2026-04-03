const PRODUCTS   = ['Barley', 'Coffee', 'Maize', 'Rice', 'Sorghum', 'Soybean', 'Sugarcane', 'Tea', 'Wheat'];
const SEASONALS  = ['High', 'Low', 'Medium'];

const defaults = {
  Product: 'Rice', Demand_Index: 150, Supply_Index: 140,
  Competitor_Price_per_ton: 280, Economic_Indicator: 1.05,
  Weather_Impact_Score: 30, Seasonal_Factor: 'Medium', Consumer_Trend_Index: 145,
};

export default function MarketPriceForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['Demand_Index','Supply_Index','Competitor_Price_per_ton',
                  'Economic_Indicator','Weather_Impact_Score','Consumer_Trend_Index'];
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
          <div className="form-group"><label className="form-label">Product</label><Sel name="Product" options={PRODUCTS}/></div>
          <div className="form-group"><label className="form-label">Seasonal Factor</label><Sel name="Seasonal_Factor" options={SEASONALS}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Demand Index</label><Num name="Demand_Index" min={0} max={500} step={0.1}/></div>
          <div className="form-group"><label className="form-label">Supply Index</label><Num name="Supply_Index" min={0} max={500} step={0.1}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Competitor Price ($/ton)</label><Num name="Competitor_Price_per_ton" min={0} max={2000} step={0.1}/></div>
          <div className="form-group"><label className="form-label">Economic Indicator</label><Num name="Economic_Indicator" min={0} max={5} step={0.001}/></div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group"><label className="form-label">Weather Impact Score</label><Num name="Weather_Impact_Score" min={0} max={100} step={0.1}/></div>
          <div className="form-group"><label className="form-label">Consumer Trend Index</label><Num name="Consumer_Trend_Index" min={0} max={400} step={0.1}/></div>
        </div>
      </div>

      <div className="model-chips" style={{marginTop:16}}>
        <span className="model-chip">XGBoost</span>
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? '⏳ Predicting...' : '💰 Predict Market Price'}
      </button>
    </form>
  );
}
