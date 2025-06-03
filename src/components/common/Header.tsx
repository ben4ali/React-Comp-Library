import { Github, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full  text-white shadow-md">
      <nav className="relative container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo & App Name */}
        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold tracking-wide">App name</span>
        </div>
        {/* Search & GitHub Star */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-neutral-800 text-white  text-[12px] rounded-lg pl-10 pr-4 py-1.25 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
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
        {/* Horizontal Line */}
        <div
          className="absolute h-[0.5px] w-[90%] left-1/2 -translate-x-1/2 bottom-0"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0), rgb(255,255,255,0.25), rgba(255,255,255,0))',
          }}
        ></div>
      </nav>
    </header>
  );
};

export default Header;
