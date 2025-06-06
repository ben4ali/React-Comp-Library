import React, { useEffect, useRef } from 'react';
import './InfiniteLoopText.css';

interface InfiniteLoopTextProps {
  text?: string;
  duration?: number;
}

const DEFAULT_TEXT = 'Looping text around a path!';
const LOOP_PATH = `M 400,400
  C 40,760 40,40 400,400
  C 760,760 760,40 400,400`;

const InfiniteLoopText: React.FC<InfiniteLoopTextProps> = ({
  text = DEFAULT_TEXT,
  duration = 10,
}) => {
  const textPathRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      if (textPathRef.current) {
        const now = Date.now();
        const percent = ((now / 1000) % duration) / duration;
        textPathRef.current.setAttribute('startOffset', `${-percent * 100}%`);
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
    };
  }, [duration]);

  return (
    <div className="infinite-loop-text-container">
      <svg viewBox="0 0 800 800" width="600" height="500">
        <path id="loopPath" d={LOOP_PATH} fill="none" stroke="none" />
        <text fontSize="56" fill="#222" fontFamily="sans-serif">
          <textPath
            ref={textPathRef}
            href="#loopPath"
            startOffset="0%"
            dominantBaseline="middle"
          >
            {Array(32)
              .fill(text + ' • ')
              .join('')}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default InfiniteLoopText;
