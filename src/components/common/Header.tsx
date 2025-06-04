import { Github, Search, Sparkle } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentsData } from '../../data/componentsData';

interface HeaderProps {
  onHamburgerClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHamburgerClick }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  // Flatten all components for search
  const allComponents = componentsData.flatMap(section => section.components);
  const filtered = searchValue.trim()
    ? allComponents.filter(
        c =>
          c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          c.type.toLowerCase().includes(searchValue.toLowerCase()) ||
          c.description.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <header className="w-full text-white shadow-md">
      <nav className="relative container mx-auto flex items-center justify-between py-6 px-6">
        {/* Logo & App Name + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden mr-2 p-2 bg-neutral-900 border border-neutral-700 rounded-lg"
            onClick={onHamburgerClick}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Sparkle className="h-8 w-8" />
          <span className="text-xl font-bold tracking-wide">App name</span>
        </div>
        {/* Search & GitHub Star */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-neutral-800 text-white text-[12px] rounded-lg pl-10 pr-4 py-1.25 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onFocus={() => setSearchOpen(true)}
              readOnly
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
          </div>
          <a
            href="https://github.com/ben4ali/React-Comp-Library"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-white hover:bg-neutral-700 text-black font-bold text-[12px] px-10 py-1.5 rounded-lg transition-colors"
          >
            <span>Star on GitHub</span>
            <Github className="h-4 w-4 text-black" />
          </a>
        </div>
        {/* Mobile GitHub icon only */}
        <div className="flex sm:hidden items-center">
          <a
            href="https://github.com/ben4ali/React-Comp-Library"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-lg hover:bg-neutral-700 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6 text-black" />
          </a>
        </div>
        {/* Horizontal Line */}
        <div
          className="absolute h-[0.05rem] w-[90%] left-1/2 -translate-x-1/2 bottom-0"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0), rgb(255,255,255,0.5), rgba(255,255,255,0))',
          }}
        ></div>
      </nav>
      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/70 backdrop-blur-sm"
          onClick={() => {
            setSearchOpen(false);
            setSearchValue('');
          }}
        >
          <div
            className="w-full max-w-xl mt-24 relative"
            onClick={e => e.stopPropagation()}
          >
            <input
              autoFocus
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyUp={e =>
                setSearchValue((e.target as HTMLInputElement).value)
              }
              placeholder="Search components..."
              className="w-full text-lg md:text-2xl px-6 py-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-2xl"
              onClick={() => {
                setSearchOpen(false);
                setSearchValue('');
              }}
              aria-label="Close search"
            >
              &times;
            </button>
          </div>
          <div
            className="w-full max-w-xl mt-6 bg-neutral-950 rounded-lg shadow-lg overflow-y-auto max-h-[60vh]"
            onClick={e => e.stopPropagation()}
          >
            {filtered.length === 0 && searchValue.trim() ? (
              <div className="p-6 text-neutral-400 text-center">
                No components found.
              </div>
            ) : (
              filtered.map(comp => (
                <div
                  key={comp.name}
                  className="p-4 border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchValue('');
                    navigate(`/components/${comp.name.replace(/\s+/g, '')}`);
                  }}
                >
                  <div className="font-bold text-lg text-white">
                    {comp.name}
                  </div>
                  <div className="text-blue-400 text-xs mb-1">{comp.type}</div>
                  <div className="text-neutral-300 text-sm line-clamp-2">
                    {comp.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
