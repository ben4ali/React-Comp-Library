import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface ParticleCursorProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
}

const ParticleCursor: React.FC<ParticleCursorProps> = ({
  color = 'rgb(179, 214, 255)',
  particleCount = 1,
  particleSize = 5,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          left: e.clientX - 10,
          top: e.clientY - 10,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
      if (particleContainerRef.current) {
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle-cursor-particle';
          particle.style.left = `${e.clientX + gsap.utils.random(-10, 10)}px`;
          particle.style.top = `${e.clientY + gsap.utils.random(-10, 10)}px`;
          particle.style.width = `${particleSize}px`;
          particle.style.height = `${particleSize}px`;
          particle.style.background = color;
          particleContainerRef.current.appendChild(particle);
          gsap.to(particle, {
            opacity: 0,
            scale: 0.5,
            y: -60,
            duration: 0.8,
            onComplete: () => particle.remove(),
          });
        }
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [color, particleCount, particleSize]);

  return (
    <>
      <div
        ref={particleContainerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 15px 10px ${color}`,
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'lighten',
        }}
      />
      <style>{`
        html, body { cursor: none !important; }
        .particle-cursor-particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          opacity: 1;
          z-index: 9999;
          will-change: transform, opacity;
          box-shadow: 0 0 10px 2px ${color};
        }
      `}</style>
    </>
  );
};

export default ParticleCursor;
