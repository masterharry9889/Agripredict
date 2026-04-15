import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function TextReveal({ text, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split text into letters
    const letters = text.split('').map((char, i) => (
      `<span class="letter" style="display: inline-block; opacity: 0">${char === ' ' ? '&nbsp;' : char}</span>`
    )).join('');

    containerRef.current.innerHTML = letters;

    anime({
      targets: containerRef.current.querySelectorAll('.letter'),
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(30),
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, [text]);

  return <span ref={containerRef} className={className} />;
}
