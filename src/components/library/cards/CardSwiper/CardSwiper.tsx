import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSSProperties, useEffect, useRef, useState } from 'react';
// Import all images statically
import card1 from '../../../../assets/images/MasonryCard/card_1.jpg';
import card10 from '../../../../assets/images/MasonryCard/card_10.jpg';
import card11 from '../../../../assets/images/MasonryCard/card_11.jpg';
import card12 from '../../../../assets/images/MasonryCard/card_12.jpg';
import card13 from '../../../../assets/images/MasonryCard/card_13.jpg';
import card14 from '../../../../assets/images/MasonryCard/card_14.jpg';
import card15 from '../../../../assets/images/MasonryCard/card_15.jpg';
import card2 from '../../../../assets/images/MasonryCard/card_2.jpg';
import card3 from '../../../../assets/images/MasonryCard/card_3.jpg';
import card4 from '../../../../assets/images/MasonryCard/card_4.jpg';
import card5 from '../../../../assets/images/MasonryCard/card_5.jpg';
import card6 from '../../../../assets/images/MasonryCard/card_6.jpg';
import card7 from '../../../../assets/images/MasonryCard/card_7.jpg';
import card8 from '../../../../assets/images/MasonryCard/card_8.jpg';
import card9 from '../../../../assets/images/MasonryCard/card_9.jpg';

const images = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
  card13,
  card14,
  card15,
];

const CARD_OFFSET = 18;
const CARD_SCALE = 0.95;
const CARD_ROTATE = 6;

type DraggableCardProps = {
  src: string;
  index: number;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  style?: CSSProperties;
};

function DraggableCard({
  src,
  index,
  onSwipe,
  isTop,
  style: customStyle,
}: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: index });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [swipeAnim, setSwipeAnim] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (!isTop || !isDragging) {
      setTilt({ x: 0, y: 0 });
      return;
    }
    const handleMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setTilt({
        x: Math.max(-18, Math.min(18, dx / 8)),
        y: Math.max(-18, Math.min(18, -dy / 8)),
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isDragging, isTop]);

  useEffect(() => {
    if (swipeAnim) {
      const timeout = setTimeout(() => {
        onSwipe(swipeAnim);
        setSwipeAnim(null);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [swipeAnim, onSwipe]);

  const lastX = useRef(0);
  useEffect(() => {
    if (!isDragging && lastX.current !== 0 && isTop) {
      if (Math.abs(lastX.current) > 120) {
        setSwipeAnim(lastX.current > 0 ? 'right' : 'left');
      }
      lastX.current = 0;
    }
  }, [isDragging, isTop]);

  useEffect(() => {
    if (transform && isTop) lastX.current = transform.x;
  }, [transform, isTop]);

  let swipeTransform = '';
  let swipeOpacity = 1;
  let swipeScale = 1;
  let swipeTilt = '';
  if (swipeAnim === 'left') {
    swipeTransform = 'translateX(-480px)';
    swipeOpacity = 0;
    swipeScale = 0.85;
    swipeTilt = ' perspective(800px) rotateY(-32deg)';
  } else if (swipeAnim === 'right') {
    swipeTransform = 'translateX(480px)';
    swipeOpacity = 0;
    swipeScale = 0.85;
    swipeTilt = ' perspective(800px) rotateY(32deg)';
  }

  const tiltTransform =
    isTop && isDragging
      ? ` perspective(800px) rotateY(${
          transform ? transform.x / 32 : 0
        }deg) rotateX(${transform ? -transform.y / 48 : 0}deg) scale(${
          1 - Math.min(Math.abs(transform ? transform.x : 0), 320) / 900
        })`
      : isTop && (tilt.x !== 0 || tilt.y !== 0)
      ? ` perspective(800px) rotateY(${tilt.x / 4}deg) rotateX(${
          tilt.y / 4
        }deg)`
      : '';

  const style = {
    ...customStyle,
    zIndex: isTop ? 10 : 1,
    transform: swipeAnim
      ? `${swipeTransform} scale(${swipeScale})${swipeTilt}`
      : transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${
          transform.x / 10
        }deg)${tiltTransform}`
      : (customStyle?.transform || '') + tiltTransform,
    opacity: swipeAnim ? swipeOpacity : customStyle?.opacity ?? 1,
    transition: swipeAnim
      ? 'transform 0.35s cubic-bezier(.7,1.7,.7,1), opacity 0.35s cubic-bezier(.7,1.7,.7,1)'
      : isDragging
      ? 'none'
      : undefined,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: isTop ? 'grab' : 'default',
    boxShadow: isTop
      ? '0 8px 32px rgba(0,0,0,0.2)'
      : '0 2px 8px rgba(0,0,0,0.1)',
    background: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    userSelect: 'none' as const,
    pointerEvents: swipeAnim ? ('none' as const) : undefined,
  };

  return (
    <div
      ref={el => {
        setNodeRef(el);
        cardRef.current = el;
      }}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={src}
        alt="Swiper card"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

const CardSwiper = () => {
  const [deck, setDeck] = useState(images);
  const [swiping, setSwiping] = useState(false);
  const [promoteIdx, setPromoteIdx] = useState<number | null>(null);

  const handleDragStart = () => {};
  const handleDragEnd = () => {};
  const handleSwipe = () => {
    setSwiping(true);
    setPromoteIdx(deck.length - 2);
    setTimeout(() => {
      setDeck(prev => {
        const [top, ...rest] = prev;
        setPromoteIdx(rest.length);
        setTimeout(() => {
          setSwiping(false);
          setPromoteIdx(null);
        }, 250);
        return [...rest, top];
      });
    }, 0);
  };

  return (
    <div
      style={{
        width: 270,
        height: 420,
        position: 'relative',
        margin: '0 auto',
        perspective: 1200,
        marginBlock: 50,
      }}
    >
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {deck
          .slice(0, 3)
          .reverse()
          .map((src, i) => {
            const idx = deck.length - i - 1;
            const isTop = i === 2;
            const isPromoting = promoteIdx === idx && swiping;
            const offset = CARD_OFFSET * (2 - i);
            const scale = Math.pow(CARD_SCALE, 2 - i);
            const rotate = CARD_ROTATE * (2 - i);
            let style: CSSProperties = {};
            if (!isTop) {
              style = {
                transform: `translateY(${offset}px) scale(${scale}) rotate(${rotate}deg)`,
                filter: 'brightness(0.92)',
                opacity: 0.85,
                transition: isPromoting
                  ? 'transform 0.35s cubic-bezier(.7,1.7,.7,1), opacity 0.35s cubic-bezier(.7,1.7,.7,1)'
                  : swiping && i === 1
                  ? 'none'
                  : 'transform 0.3s, opacity 0.3s',
              };
              if (isPromoting) {
                style.transform = 'translateY(0px) scale(1.04) rotate(0deg)';
                style.filter = 'brightness(1)';
                style.opacity = 1;
              }
            } else {
              style.transform =
                (style.transform ? style.transform + ' ' : '') + 'scale(1.04)';
            }
            return (
              <DraggableCard
                key={idx}
                src={src}
                index={idx}
                onSwipe={handleSwipe}
                isTop={isTop}
                style={style}
              />
            );
          })}
      </DndContext>
    </div>
  );
};

export default CardSwiper;
