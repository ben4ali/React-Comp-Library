import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[rgb(6,6,6	)] text-white py-4 mt-[9rem]  ">
      {/* Horizontal Line */}
      <div
        className="absolute h-[0.5px] w-[90%] left-1/2 -translate-x-1/2 top-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0), rgb(255,255,255,0.25), rgba(255,255,255,0))',
        }}
      ></div>
      <div className="container mt-auto mx-[auto] w-[75%] flex flex-col md:flex-row items-center justify-between px-6 pt-5 gap-2 md:gap-0">
        {/* Made with love by names */}
        <div className="flex flex-col  gap-2 text-sm">
          <div className="flex gap-2 items-center justify-start">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-neutral-500" />
            <span>by</span>
          </div>

          <div className="flex flex-col">
            <a
              href="https://github.com/ben4ali"
              target="_blank"
              className="text-neutral-300 hover:underline"
            >
              Ali Benkarrouch
            </a>
            <a
              href="https://github.com/JamilFayad-1"
              target="_blank"
              className="text-neutral-300 hover:underline"
            >
              Jamil Fayad
            </a>
            <a
              href="https://github.com/Jxddiss"
              target="_blank"
              className="text-neutral-300 hover:underline"
            >
              Nicholson Rainvilles Jacques
            </a>
          </div>
        </div>
        {/* Navigation links */}
        <nav className="flex flex-col gap-2 text-sm mr-15">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/components" className="hover:underline">
            Components
          </a>
          <a href="/docs" className="hover:underline">
            Documentation
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
