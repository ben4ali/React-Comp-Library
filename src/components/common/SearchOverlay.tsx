import React from 'react';

interface SearchOverlayProps {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  results: Array<{ name: string; type: string; description: string }>;
  onResultClick: (name: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  open,
  value,
  onChange,
  onClose,
  results,
  onResultClick,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mt-24 relative"
        onClick={e => e.stopPropagation()}
      >
        <input
          autoFocus
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyUp={e => onChange((e.target as HTMLInputElement).value)}
          placeholder="Search components..."
          className="w-full text-lg md:text-2xl px-6 py-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close search"
        >
          &times;
        </button>
      </div>
      <div
        className="w-full max-w-xl mt-6 bg-neutral-950 rounded-lg shadow-lg overflow-y-auto max-h-[60vh]"
        onClick={e => e.stopPropagation()}
      >
        {results.length === 0 && value.trim() ? (
          <div className="p-6 text-neutral-400 text-center">
            No components found.
          </div>
        ) : (
          results.map(comp => (
            <div
              key={comp.name}
              className="p-4 border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors"
              onClick={() => onResultClick(comp.name)}
            >
              <div className="font-bold text-lg text-white">{comp.name}</div>
              <div className="text-blue-400 text-xs mb-1">{comp.type}</div>
              <div className="text-neutral-300 text-sm line-clamp-2">
                {comp.description}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
