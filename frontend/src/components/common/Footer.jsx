export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">🌾 AgriPredict</span>
          <p>AI-Powered Agricultural Intelligence • Built with Stacked ML Ensembles</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Solutions</h4>
            <ul>
              <li>Irrigation Prediction</li>
              <li>Yield Forecast</li>
              <li>Market Analysis</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              <li>API Docs</li>
              <li>Case Studies</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 AgriPredict Intelligence. All rights reserved.</p>
        <p>Models: Stacked Classifier • Stacked Regressor • XGBoost</p>
      </div>
    </footer>
  );
}
