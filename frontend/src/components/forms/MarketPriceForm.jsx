import { 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Zap,
  Activity,
  BarChart3,
  Waves,
  ShoppingBag,
  CloudSun
} from 'lucide-react';

const PRODUCTS = ['Cotton', 'Maize', 'Potato', 'Rice', 'Sugarcane', 'Wheat'];

const defaults = {
  Product: 'Rice', 
  Demand_Index: 75.5, 
  Supply_Index: 60.0,
  Competitor_Price_per_ton: 450.0, 
  Economic_Indicator: 4.5,
  Weather_Impact_Score: 2.0, 
  Seasonal_Factor: 1.2, 
  Consumer_Trend_Index: 80.0
};

export default function MarketPriceForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const nums = ['Demand_Index','Supply_Index','Competitor_Price_per_ton',
                  'Economic_Indicator','Weather_Impact_Score','Seasonal_Factor','Consumer_Trend_Index'];
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
          <h4 className="section-title-sm">Asset Configuration</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={ShoppingBag} label="Product" />
                <select className="input-field" name="Product" defaultValue={defaults.Product}>
                  {PRODUCTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
             </div>
             <div className="input-group">
                <FieldLabel icon={BarChart3} label="Demand Index" unit="0-100" />
                <input className="input-field" type="number" name="Demand_Index" defaultValue={defaults.Demand_Index} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Waves} label="Supply Index" unit="0-100" />
                <input className="input-field" type="number" name="Supply_Index" defaultValue={defaults.Supply_Index} />
             </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title-sm">Macro & Competitor Metrics</h4>
          <div className="inputs-grid">
             <div className="input-group">
                <FieldLabel icon={DollarSign} label="Comp. Price" unit="$/ton" />
                <input className="input-field" type="number" name="Competitor_Price_per_ton" defaultValue={defaults.Competitor_Price_per_ton} />
             </div>
             <div className="input-group">
                <FieldLabel icon={TrendingUp} label="Eco Indicator" unit="%" />
                <input className="input-field" type="number" name="Economic_Indicator" defaultValue={defaults.Economic_Indicator} step={0.1} />
             </div>
             <div className="input-group">
                <FieldLabel icon={CloudSun} label="Weather Score" unit="1-10" />
                <input className="input-field" type="number" name="Weather_Impact_Score" defaultValue={defaults.Weather_Impact_Score} />
             </div>
             <div className="input-group">
                <FieldLabel icon={Activity} label="Consumer Trend" unit="0-100" />
                <input className="input-field" type="number" name="Consumer_Trend_Index" defaultValue={defaults.Consumer_Trend_Index} />
             </div>
             <div className="input-group">
                <FieldLabel icon={TrendingUp} label="Seasonal Factor" unit="0-2" />
                <input className="input-field" type="number" name="Seasonal_Factor" defaultValue={defaults.Seasonal_Factor} step={0.1} />
             </div>
          </div>
        </div>
      </div>

      <button className="submit-btn-glow" type="submit" disabled={loading}>
        {loading ? (
          <div className="loader-container">
            <div className="loader-ring" />
            <span>Crunching Numbers...</span>
          </div>
        ) : (
          <>
            <Zap size={18} />
            <span>Execute Market Analysis</span>
          </>
        )}
      </button>
    </form>
  );
}
