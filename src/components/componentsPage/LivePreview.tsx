import type { FC } from 'react';
import type { Component } from '../../types/Component';
import TicketHolographicCard from '../library/cards/TicketHolographicCard';

interface LivePreviewProps {
  component: Component;
  params?: Record<string, string>;
}

const componentMap: Record<string, FC<Record<string, unknown>>> = {
  TicketHolographicCard,
  'Holographic Ticket': TicketHolographicCard,
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
