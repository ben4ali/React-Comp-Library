import React, { useEffect, useRef, useState } from 'react';
import metalLayer from '../../../../assets/images/HolographicTicket/metal_layer.png';
import rainbowLayer from '../../../../assets/images/HolographicTicket/rainbow_layer.png';
import ticket from '../../../../assets/images/HolographicTicket/Ticket.png';
import ticketBG from '../../../../assets/images/HolographicTicket/ticket_bg.png';

import './TicketHolographicCard.css';

const CANVAS_RADIUS = 200;
const METAL_LAYER_HOVER_OPACITY = 0.2;
const TICKET_BG_BASE_OPACITY = 0.025;
const TICKET_BG_GLOW_OPACITY = 0.18;
const GLOW_BG_CENTER = 0.4;
const GLOW_BG_EDGE = 0.05;
const BASE_LAYER_OPACITY = 0.02;

const TicketHolographicCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const metalCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainbowCanvasRef = useRef<HTMLCanvasElement>(null);
  const ticketBGCanvasRef = useRef<HTMLCanvasElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [canvasDims, setCanvasDims] = useState({ width: 0, height: 0 });
  const metalImgRef = useRef<HTMLImageElement | null>(null);
  const rainbowImgRef = useRef<HTMLImageElement | null>(null);
  const ticketBGImgRef = useRef<HTMLImageElement | null>(null);

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

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.perspective = '900px';
    card.style.perspectiveOrigin = '50% 50%';

    function handleMouseMove(e: MouseEvent) {
      if (!card) return;
      const elRect = card.getBoundingClientRect();
      const x = e.clientX - elRect.x;
      const y = e.clientY - elRect.y;
      const midCardWidth = elRect.width / 2;
      const midCardHeight = elRect.height / 2;
      const angleY = -(x - midCardWidth) / 35;
      const angleX = (y - midCardHeight) / 35;
      card.style.transform = `perspective(900px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
      card.style.transition = 'transform 0.15s ease-out';
      card.style.boxShadow = `${-angleY}px ${angleX}px 20px 15px rgba(0,0,0,0.25), 0 0 20px 15px rgba(0,0,0,0.25) inset`;
    }

    function handleMouseEnter() {}

    function handleMouseLeave() {
      if (!card) return;
      card.style.transform = `perspective(900px) rotateX(0) rotateY(0)`;
      card.style.boxShadow =
        '0px 0px 0px 0px rgba(0,0,0,0), 0 0 20px 15px rgba(0,0,0,0) inset';
      card.style.transition =
        'transform 0.5s cubic-bezier(.17,.67,.83,.67), box-shadow 0.25s';
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const drawHoloLayer = (
    canvas: HTMLCanvasElement | null,
    img: HTMLImageElement | null,
    x: number,
    y: number,
    visible: boolean,
    highlight: boolean = true
  ) => {
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = BASE_LAYER_OPACITY;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    if (visible && x !== null && y !== null && highlight) {
      ctx.save();
      ctx.globalAlpha = 1;
      const radius = CANVAS_RADIUS;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(
        0,
        `rgba(255,255,255,${METAL_LAYER_HOVER_OPACITY})`
      );
      gradient.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.globalCompositeOperation = 'source-atop';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    if (visible && !highlight) {
      ctx.save();
      ctx.globalAlpha = METAL_LAYER_HOVER_OPACITY;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  };

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
    ctx.save();
    ctx.globalAlpha = TICKET_BG_BASE_OPACITY;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    if (visible && x !== null && y !== null) {
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
    setGlowStyle({
      opacity: 1,
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.3s',
    });
    drawTicketBG(ticketBGCanvasRef.current, ticketBGImgRef.current, x, y, true);
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
    setGlowStyle({
      ...glowStyle,
      opacity: 0,
      transition: 'opacity 0.3s',
    });
    setIsHovering(false);
    lastMouse.current = null;
    drawTicketBG(
      ticketBGCanvasRef.current,
      ticketBGImgRef.current,
      0,
      0,
      false
    );
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
  };

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
        false
      );
      drawHoloLayer(
        rainbowCanvasRef.current,
        rainbowImgRef.current,
        lastMouse.current.x,
        lastMouse.current.y,
        true,
        true
      );
    }
  }, [isHovering, canvasDims.width, canvasDims.height]);

  useEffect(() => {
    drawTicketBG(
      ticketBGCanvasRef.current,
      ticketBGImgRef.current,
      0,
      0,
      false
    );
    drawHoloLayer(metalCanvasRef.current, metalImgRef.current, 0, 0, false);
    drawHoloLayer(rainbowCanvasRef.current, rainbowImgRef.current, 0, 0, false);
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
      <canvas
        ref={ticketBGCanvasRef}
        width={canvasDims.width}
        height={canvasDims.height}
        className="ticket-holo-card-bg absolute top-0 left-0 w-full h-full object-cover rounded-md pointer-events-none"
        style={{
          zIndex: 4,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
      <canvas
        ref={metalCanvasRef}
        width={canvasDims.width}
        height={canvasDims.height}
        className="ticket-holo-card-metal absolute top-0 left-0 w-full h-full object-cover rounded-md pointer-events-none"
        style={{
          zIndex: 5,
          opacity: isHovering ? METAL_LAYER_HOVER_OPACITY : 0,
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
