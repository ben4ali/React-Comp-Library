import React from 'react';

export interface ComicButtonProps {
  label?: string;
  variant?: 'blue' | 'yellow' | 'green' | 'red';
}

const ComicButton: React.FC<ComicButtonProps> = ({
  label = 'Button',
  variant = 'blue',
}) => {
  const colorStyles = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-800',
    yellow:
      'bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-yellow-600',
    green: 'bg-green-500 text-white hover:bg-green-600 shadow-green-800',
    red: 'bg-red-500 text-white hover:bg-red-600 shadow-red-800',
  };
  return (
    <button
      className={`text-[30px] px-10 py-4 rounded font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[4px_4px_0_3px] transition-[0.2s] ${colorStyles[variant]} hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0.25px_0.25px_0_2px]`}
      style={{
        transition: 'all 0.1s ease-in-out',
      }}
    >
      {label}
    </button>
  );
};

export default ComicButton;
