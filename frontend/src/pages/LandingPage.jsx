import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import TextReveal from '../components/effects/TextReveal';

const FEATURES = [
  {
    id: "irrigation",
    title: "Precision Irrigation",
    desc: "Smart water management using ensemble learning to optimize resource usage and crop health.",
    icon: <Droplets size={28} />,
    color: "#34d399",
    size: "large"
  },
  {
    id: "yield",
    title: "Yield Forecast",
    desc: "Predict harvest outcomes with deep analysis of environmental variables and soil data.",
    icon: <TrendingUp size={28} />,
    color: "#84cc16",
    size: "small"
  },
  {
    id: "market",
    title: "Price Lens",
    desc: "Real-time market insights for smarter seasonal selling.",
    icon: <DollarSign size={28} />,
    color: "#fbbf24",
    size: "small"
  },
  {
    id: "sustainability",
    title: "Eco Score",
    desc: "Comprehensive sustainability auditing for modern organic standards.",
    icon: <Leaf size={28} />,
    color: "#4ade80",
    size: "medium"
  },
  {
    id: "crop",
    title: "Crop Guide AI",
    desc: "Intelligent soil-to-seed matching based on NPK and climate profiles.",
    icon: <Search size={28} />,
    color: "#60a5fa",
    size: "medium"
  }
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div 
            className="hero-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <Zap size={14} /> Powered by Next-Gen AI
          </motion.div>
          
          <h1 className="hero-title">
            <TextReveal text="The Intelligent OS for" className="title-top" />
            <br />
            <span className="gradient-text">
               <TextReveal text="Modern Agriculture" className="title-bottom" />
            </span>
          </h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            AgriPredict empowers farmers with enterprise-grade machine learning models 
            to maximize yield, minimize waste, and secure the future of food.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Link to="/dashboard" className="btn-primary">Get Started</Link>
            <a href="#features" className="btn-secondary">View Features</a>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="features-section">
        <span className="section-tag">Core Capabilities</span>
        <h2 className="section-title">5 Advanced ML Engines</h2>
        
        <div className="bento-grid">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              className={`bento-card ${feature.size}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: `0 20px 40px -20px ${feature.color}44`
              }}
            >
              <div className="spotlight" style={{ background: `radial-gradient(circle at center, ${feature.color}11, transparent 70%)` }} />
              
              <div className="card-inner">
                <div className="card-icon" style={{ background: `${feature.color}11`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
              
              <Link 
                to={`/dashboard?tab=${feature.id}`} 
                className="card-arrow" 
                style={{ background: `${feature.color}11`, color: feature.color }}
              >
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          ))}
          
          <motion.div 
            className="bento-card medium dark-highlight"
            whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
          >
            <div className="highlight-content">
              <h3>95.4% Accuracy</h3>
              <p>Benchmarked across 12,000+ data points from tropical soil sensors.</p>
              <ShieldCheck size={120} className="bg-icon" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="cta-banner">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="cta-card"
         >
            <h2>Ready to Scale Your Harvest?</h2>
            <p>Join the data revolution in agriculture today.</p>
            <Link to="/dashboard" className="btn-primary-large">
              Enter Dashboard
            </Link>
         </motion.div>
      </section>
    </div>
  );
}
