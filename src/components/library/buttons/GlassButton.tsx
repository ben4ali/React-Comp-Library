import React from 'react';
import './GlassButton.css';

export interface GlassButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  label = 'Glassy',
  onClick,
}) => {
  return (
    <div className="glass-button-wrap">
      <button className="glass-button" onClick={onClick}>
        <span>{label}</span>
      </button>
      <div className="glass-button-shadow"></div>
    </div>
  );
};

export default GlassButton;
