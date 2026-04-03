import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function HeroSection({ onExplore }) {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Particle canvas animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate grid dots
    const dots = [];
    const spacing = 48;
    for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
      for (let y = 0; y < window.innerHeight + spacing; y += spacing) {
        dots.push({ x, y, opacity: Math.random() * 0.4, scale: Math.random() * 0.8 + 0.2, phase: Math.random() * Math.PI * 2 });
      }
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      dots.forEach(d => {
        const osc = (Math.sin(t + d.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5 * d.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${d.opacity * osc * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    // Entrance animation timeline
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({ targets: titleRef.current, opacity: [0, 1], translateY: [40, 0], duration: 900 })
      .add({ targets: subtitleRef.current, opacity: [0, 1], translateY: [20, 0], duration: 700 }, '-=500')
      .add({ targets: '.hero-badge', opacity: [0, 1], scale: [0.8, 1], duration: 600 }, '-=700')
      .add({ targets: statsRef.current?.children ? [...statsRef.current.children] : [], opacity: [0, 1], translateY: [20, 0], duration: 600, delay: anime.stagger(100) }, '-=400')
      .add({ targets: ctaRef.current, opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=300');

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-badge" style={{ opacity: 0 }}>
        <span className="hero-badge-dot" />
        AI-Powered Agricultural Intelligence
      </div>

      <h1 ref={titleRef} className="hero-title" style={{ opacity: 0 }}>
        AgriPredict
      </h1>

      <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
        Harness the power of machine learning to predict irrigation needs, crop yields,
        market prices, and sustainability scores — all in one platform.
      </p>

      <div ref={statsRef} className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-value">4</span>
          <span className="hero-stat-label">ML Models</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Stacked</span>
          <span className="hero-stat-label">Architecture</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Real-time</span>
          <span className="hero-stat-label">Predictions</span>
        </div>
      </div>

      <a ref={ctaRef} href="#predict" className="hero-cta" style={{ opacity: 0 }} onClick={onExplore}>
        ↓ Start Predicting
      </a>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        Scroll
      </div>
    </section>
  );
}
