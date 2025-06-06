import { RotateCcwIcon } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import type { Component } from '../../types/Component';
import ComicButton from '../library/buttons/ComicButton/ComicButton';
import GlassButton from '../library/buttons/GlassButton/GlassButton';
import ContactCard from '../library/cards/ContactCard/ContactCard';
import TicketHolographicCard from '../library/cards/HolographicTicket/TicketHolographicCard';
import MasonryCards from '../library/cards/MasonryCards/MasonryCards';
import BlackHoleCursor from '../library/cursors/BlackHoleCursor/BlackHoleCursor';
import MagicCursor from '../library/cursors/MagicCursor/MagicCursor';
import WaterMaskReveal from '../library/effects/WaterMaskReveal/WaterMaskReveal';
import GradientText from '../library/textAnimations/GradientText/GradientText';
import InfiniteLoopText from '../library/textAnimations/InfiniteLoopText/InfiniteLoopText';

interface LivePreviewProps {
  component: Component;
  params?: Record<string, string>;
}

const componentMap: Record<
  string,
  FC<any /* eslint-disable-line @typescript-eslint/no-explicit-any */>
> = {
  TicketHolographicCard,
  'Holographic Ticket': TicketHolographicCard,
  'Contact Card': ContactCard,
  'Black Hole Cursor': BlackHoleCursor,
  'Comic Button': ComicButton,
  'Magic Cursor': MagicCursor,
  WaterMaskReveal,
  'Water Mask Reveal': WaterMaskReveal,
  'Infinite Loop Text': InfiniteLoopText,
  InfiniteLoopText,
  'Glass Button': GlassButton,
  GlassButton,
  'Gradient Text': GradientText,
  GradientText,
  'Masonry Cards': MasonryCards,
  MasonryCards,
};

export const LivePreview: FC<LivePreviewProps> = ({ component, params }) => {
  const Comp =
    componentMap[component.name.replace(/\s+/g, '')] ||
    componentMap[component.name];

  const isEffect = component.type === 'effect';
  const [key, setKey] = useState(0);

  return (
    <div className="relative mt-8 border border-neutral-800 rounded-lg min-h-[400px] p-6 mb-4 flex flex-col items-center justify-center">
      {isEffect && (
        <button
          className="absolute cursor-pointer z-1000 bottom-5 right-5 flex items-center justify-center px-2 py-2 rounded bg-white text-black hover:bg-gray-300 transition-colors"
          onClick={() => setKey(k => k + 1)}
        >
          <RotateCcwIcon className="shrink-0" />
        </button>
      )}
      {Comp ? (
        <div className="w-full flex items-center justify-center">
          <Comp key={isEffect ? key : undefined} {...(params || {})} />
        </div>
      ) : (
        <span className="text-neutral-300">
          Live preview for <b>{component.name}</b>
        </span>
      )}
    </div>
  );
};
