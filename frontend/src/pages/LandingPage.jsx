import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import HeroSection from '../components/HeroSection';

const FEATURES = [
  {
    id: "irrigation",
    title: "Precision Irrigation",
    icon: "🌊",
    desc: "Optimized water delivery using stacked ensemble classifiers, reducing waste by up to 30%.",
    color: "#22d3ee"
  },
  {
    id: "yield",
    title: "Yield Forecasting",
    icon: "🌽",
    desc: "Predict crop productivity with high-precision regression models trained on global agro-datasets.",
    color: "#4ade80"
  },
  {
    id: "market",
    title: "Market Insight",
    icon: "💰",
    desc: "Real-time price forecasting based on supply, demand, and global economic indicators.",
    color: "#fbbf24"
  },
  {
    id: "sustainability",
    title: "Sustainability",
    icon: "🌱",
    desc: "Advanced scoring of your farm's environmental impact based on chemical and resource usage.",
    color: "#a3e635"
  },
  {
    id: "crop",
    title: "Crop Selection",
    icon: "🚜",
    desc: "Intelligent recommendations for the best crop to plant based on your specific soil NPK and climate.",
    color: "#60a5fa"
  }
];

export default function LandingPage() {
  const scrollRef = useRef(null);

  useEffect(() => {
    anime({
      targets: '.feature-card',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      easing: 'easeOutExpo',
      duration: 1200,
      autoplay: true,
      loop: false
    });
  }, []);

  return (
    <div className="landing-page">
      <HeroSection onExplore={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      
      <section id="features" ref={scrollRef} className="features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">The Future of Farming</span>
            <h2 className="section-headline">Empowering Farmers with <br/><span className="gradient-text">Data-Driven Intelligence</span></h2>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <Link to={`/dashboard?tab=${feature.id}`} key={i} style={{ textDecoration: 'none' }}>
                <motion.div 
                  className="feature-card"
                  whileHover={{ scale: 1.05, translateY: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="feature-glow" style={{ background: feature.color }} />
                  <div className="feature-icon-wrapper" style={{ borderColor: feature.color + '44' }}>
                    <span className="feature-icon">{feature.icon}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <div className="feature-indicator" style={{ background: feature.color }} />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
