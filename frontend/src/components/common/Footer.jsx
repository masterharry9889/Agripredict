import { Sprout, Globe, MessageSquare, Briefcase, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <Link to="/" className="navbar-logo" style={{ marginBottom: '20px' }}>
            <div className="logo-icon">
              <Sprout size={20} color="#fff" />
            </div>
            AgriPredict
          </Link>
          <p>
            Revolutionizing agriculture through enterprise-grade machine learning and real-time data analytics.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <a href="#" className="footer-link"><Globe size={20} /></a>
            <a href="#" className="footer-link"><MessageSquare size={20} /></a>
            <a href="#" className="footer-link"><Briefcase size={20} /></a>
            <a href="#" className="footer-link"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <div className="footer-links">
            <Link to="/dashboard?tab=irrigation" className="footer-link">Irrigation Prediction</Link>
            <Link to="/dashboard?tab=yield" className="footer-link">Yield Forecasting</Link>
            <Link to="/dashboard?tab=market" className="footer-link">Market Insights</Link>
            <Link to="/dashboard?tab=crop" className="footer-link">Crop Recommendations</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact Support</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 AgriPredict AI. Empoweing the future of food.</p>
      </div>
    </footer>
  );
}
