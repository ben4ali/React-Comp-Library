import React, { useEffect, useRef, useState } from 'react';
import metalLayer from '../../../assets/images/metal_layer.png';
import rainbowLayer from '../../../assets/images/rainbow_layer.png';
import ticket from '../../../assets/images/Ticket.png';
import ticketBG from '../../../assets/images/ticket_bg.png';

import './TicketHolographicCard.css';

const CANVAS_RADIUS = 200; // same as glow (400px diameter)
const GLOW_OPACITY_CENTER = 0.2; // opacity at the center of the holographic effect
const GLOW_OPACITY_EDGE = 0.05; // opacity at the edge of the holographic effect
const GLOW_OPACITY_OUTSIDE = 0.0; // opacity outside the glow radius
const GLOW_BG_CENTER = 0.1; // opacity at the center of the CSS glow
const GLOW_BG_EDGE = 0.05; // opacity at the edge of the CSS glow
const BASE_LAYER_OPACITY = 0.02; // faint opacity for always-visible metal/rainbow layer
const METAL_LAYER_HOVER_OPACITY = 0.4; // opacity for metal layer on hover
const TICKET_BG_BASE_OPACITY = 0.05; // base opacity for ticketBG
const TICKET_BG_GLOW_OPACITY = 0.18; // extra opacity for ticketBG under glow

const TicketHolographicCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const metalCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainbowCanvasRef = useRef<HTMLCanvasElement>(null);
  const ticketBGCanvasRef = useRef<HTMLCanvasElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const animationRef = useRef<number | null>(null);
  const targetTransform = useRef<string>(
    'perspective(900px) scale(1) rotateX(0deg) rotateY(0deg)'
  );
  const [canvasDims, setCanvasDims] = useState({ width: 0, height: 0 });
  const metalImgRef = useRef<HTMLImageElement | null>(null);
  const rainbowImgRef = useRef<HTMLImageElement | null>(null);
  const ticketBGImgRef = useRef<HTMLImageElement | null>(null);

  // Load images for canvas
  useEffect(() => {
    const metalImg = new window.Image();
    metalImg.src = metalLayer;
    metalImg.onload = () => {
      metalImgRef.current = metalImg;
    };
    const rainbowImg = new window.Image();
    rainbowImg.src = rainbowLayer;
    rainbowImg.onload = () => {
      rainbowImgRef.current = rainbowImg;
    };
    const ticketBGImg = new window.Image();
    ticketBGImg.src = ticketBG as string;
    ticketBGImg.onload = () => {
      ticketBGImgRef.current = ticketBGImg;
    };
  }, []);

  // Update canvas size on mount/resize
  useEffect(() => {
    const updateDims = () => {
      if (cardRef.current) {
        setCanvasDims({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  // Smoothly animate the transform
  const animate = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = targetTransform.current;
    }
    animationRef.current = window.requestAnimationFrame(animate);
  };

  // Draw holographic effect on canvas
  const drawHoloLayer = (
    canvas: HTMLCanvasElement | null,
    img: HTMLImageElement | null,
    x: number,
    y: number,
    visible: boolean,
    highlight: boolean = true // new param: should draw highlight zone
  ) => {
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Always draw faint base layer
    ctx.save();
    ctx.globalAlpha = BASE_LAYER_OPACITY;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    // Draw strong holographic effect at mouse if visible and highlight is true
    if (visible && x !== null && y !== null && highlight) {
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Create elliptical gradient mask
      const ellipseRadiusX = CANVAS_RADIUS * 0.9; // horizontal radius
      const ellipseRadiusY = CANVAS_RADIUS * 0.9; // vertical radius
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(ellipseRadiusX / ellipseRadiusY, 1);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, ellipseRadiusY);
      gradient.addColorStop(0, `rgba(255,255,255,${GLOW_OPACITY_CENTER})`);
      gradient.addColorStop(0.7, `rgba(255,255,255,${GLOW_OPACITY_EDGE})`);
      gradient.addColorStop(1, `rgba(255,255,255,${BASE_LAYER_OPACITY})`);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.ellipse(0, 0, ellipseRadiusX, ellipseRadiusY, 0, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
      ctx.restore();
    }
    // If visible and highlight is false, draw a uniform opacity overlay (for metal layer on hover)
    if (visible && !highlight) {
      ctx.save();
      ctx.globalAlpha = METAL_LAYER_HOVER_OPACITY;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  };

  // Draw ticketBG effect on canvas
  const drawTicketBG = (
    canvas: HTMLCanvasElement | null,
    img: HTMLImageElement | null,
    x: number,
    y: number,
    visible: boolean
  ) => {
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // --- Draw base layer at lower opacity everywhere ---
    ctx.save();
    ctx.globalAlpha = TICKET_BG_BASE_OPACITY;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    // --- Draw glow effect at mouse if visible, but only add extra opacity inside the circle ---
    if (visible && x !== null && y !== null) {
      // 1. Add luminosity (white radial gradient, as before)
      ctx.save();
      ctx.globalAlpha = 1;
      const radius = CANVAS_RADIUS;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(255,255,255,${TICKET_BG_GLOW_OPACITY})`);
      gradient.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
      // 2. Add extra opacity (alpha) in the same area, using 'source-atop' to only affect the ticketBG
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-atop';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  };

  // Track last mouse position and hover state
  const lastMouse = useRef<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastMouse.current = { x, y };
    setIsHovering(true);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    targetTransform.current = `perspective(900px) scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (!animationRef.current) {
      animate();
    }
    setGlowStyle({
      opacity: 1,
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.3s',
    });
    // Draw ticketBG with glow
    drawTicketBG(ticketBGCanvasRef.current, ticketBGImgRef.current, x, y, true);
    // Draw metal layer with uniform opacity, rainbow with highlight
    drawHoloLayer(
      metalCanvasRef.current,
      metalImgRef.current,
      x,
      y,
      true,
      false
    );
    drawHoloLayer(
      rainbowCanvasRef.current,
      rainbowImgRef.current,
      x,
      y,
      true,
      true
    );
  };

  const handleMouseLeave = () => {
    targetTransform.current =
      'perspective(900px) scale(1) rotateX(0deg) rotateY(0deg)';
    setGlowStyle({
      ...glowStyle,
      opacity: 0,
      transition: 'opacity 0.3s',
    });
    setIsHovering(false);
    lastMouse.current = null;
    // Only draw base layer for ticketBG
    drawTicketBG(
      ticketBGCanvasRef.current,
      ticketBGImgRef.current,
      0,
      0,
      false
    );
    // Only draw faint base layer, no strong effect
    drawHoloLayer(
      metalCanvasRef.current,
      metalImgRef.current,
      0,
      0,
      false,
      false
    );
    drawHoloLayer(
      rainbowCanvasRef.current,
      rainbowImgRef.current,
      0,
      0,
      false,
      true
    );
    if (animationRef.current) {
      setTimeout(() => {
        if (animationRef.current) {
          window.cancelAnimationFrame(animationRef.current!);
          animationRef.current = null;
        }
      }, 300);
    }
  };

  // Ensure effect stays while hovering (redraw on hover state or mouse move)
  useEffect(() => {
    if (isHovering && lastMouse.current) {
      drawTicketBG(
        ticketBGCanvasRef.current,
        ticketBGImgRef.current,
        lastMouse.current.x,
        lastMouse.current.y,
        true
      );
      drawHoloLayer(
        metalCanvasRef.current,
        metalImgRef.current,
        lastMouse.current.x,
        lastMouse.current.y,
        true,
        false // no highlight for metal
      );
      drawHoloLayer(
        rainbowCanvasRef.current,
        rainbowImgRef.current,
        lastMouse.current.x,
        lastMouse.current.y,
        true,
        true // highlight for rainbow
      );
    }
  }, [isHovering, canvasDims.width, canvasDims.height]);

  useEffect(() => {
    // On mount, clear canvases
    drawTicketBG(
      ticketBGCanvasRef.current,
      ticketBGImgRef.current,
      0,
      0,
      false
    );
    drawHoloLayer(metalCanvasRef.current, metalImgRef.current, 0, 0, false);
    drawHoloLayer(rainbowCanvasRef.current, rainbowImgRef.current, 0, 0, false);
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line
  }, [canvasDims.width, canvasDims.height]);

  return (
    <div
      ref={cardRef}
      className="ticket-holo-card relative border border-neutral-600 bg-transparent w-[54rem] h-[17.5rem] rounded-md transition-transform duration-300 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="ticket-holo-card-glow pointer-events-none"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,${GLOW_BG_CENTER}) 0%, rgba(255,255,255,${GLOW_BG_EDGE}) 60%, transparent 100%)`,
          filter: 'blur(32px)',
          zIndex: 2,
          pointerEvents: 'none',
          ...glowStyle,
        }}
      />
      <img
        src={ticket}
        alt="Ticket"
        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        style={{ zIndex: 3 }}
      />
      {/* ticketBG as canvas */}
      <canvas
        ref={ticketBGCanvasRef}
        width={canvasDims.width}
        height={canvasDims.height}
        className="ticket-holo-card-bg absolute top-0 left-0 w-full h-full object-cover rounded-md pointer-events-none"
        style={{ zIndex: 4, opacity: 1, transition: 'opacity 0.3s' }}
      />
      {/* metal layer and rainbow layer as canvas */}
      <canvas
        ref={metalCanvasRef}
        width={canvasDims.width}
        height={canvasDims.height}
        className="ticket-holo-card-metal absolute top-0 left-0 w-full h-full object-cover rounded-md pointer-events-none"
        style={{
          zIndex: 5,
          opacity: isHovering ? METAL_LAYER_HOVER_OPACITY : BASE_LAYER_OPACITY,
          transition: 'opacity 0.3s',
        }}
      />
      <canvas
        ref={rainbowCanvasRef}
        width={canvasDims.width}
        height={canvasDims.height}
        className="ticket-holo-card-rainbow absolute top-0 left-0 w-full h-full object-cover rounded-md pointer-events-none"
        style={{ zIndex: 6, opacity: 1, transition: 'opacity 0.3s' }}
      />
    </div>
  );
};

export default TicketHolographicCard;
