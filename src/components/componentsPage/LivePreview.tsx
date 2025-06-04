import type { FC } from 'react';
import type { Component } from '../../types/Component';
import ComicButton from '../library/buttons/ComicButton';
import ContactCard from '../library/cards/ContactCard/ContactCard';
import TicketHolographicCard from '../library/cards/HolographicTicket/TicketHolographicCard';
import BlackHoleCursor from '../library/cursors/BlackHoleCursor/BlackHoleCursor';
import MagicCursor from '../library/cursors/MagicCursor/MagicCursor';

interface LivePreviewProps {
  component: Component;
  params?: Record<string, string>;
}

const componentMap: Record<string, FC<Record<string, unknown>>> = {
  TicketHolographicCard,
  'Holographic Ticket': TicketHolographicCard,
  'Contact Card': ContactCard,
  'Black Hole Cursor': BlackHoleCursor,
  'Comic Button': ComicButton,
  'Magic Cursor': MagicCursor,
};

export const LivePreview: FC<LivePreviewProps> = ({ component, params }) => {
  const Comp =
    componentMap[component.name.replace(/\s+/g, '')] ||
    componentMap[component.name];

  return (
    <div className="mt-8 border border-neutral-800 rounded-lg min-h-[400px] p-6 mb-4 flex items-center justify-center">
      {Comp ? (
        <Comp {...(params || {})} />
      ) : (
        <span className="text-neutral-300">
          Live preview for <b>{component.name}</b>
        </span>
      )}
    </div>
  );
};
