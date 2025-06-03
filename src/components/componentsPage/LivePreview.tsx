import type { FC } from 'react';
import type { Component } from '../../types/Component';
interface LivePreviewProps {
  component: Component;
}

export const LivePreview: FC<LivePreviewProps> = ({ component }) => (
  <div className="mt-8 border border-neutral-800 rounded-lg min-h-[400px] p-6 mb-4 flex items-center justify-center">
    <span className="text-neutral-300">
      Live preview for <b>{component.name}</b>
    </span>
  </div>
);
