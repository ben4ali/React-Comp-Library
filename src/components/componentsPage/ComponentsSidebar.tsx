import React, { useState } from 'react';

interface Props {
  sections: Array<{
    section: string;
    components: Array<{ name: string; type: string }>;
  }>;
  selected: string;
  onSelect: (name: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const ComponentsSidebar: React.FC<Props> = ({
  sections,
  selected,
  onSelect,
  open: openProp,
  setOpen: setOpenProp,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = setOpenProp || setInternalOpen;

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`bg-neutral-950 md:bg-transparent w-64 md:w-50 ml-0 md:ml-10 text-white h-full p-4 overflow-y-auto z-50 fixed md:static top-0 left-0 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
        style={{ maxWidth: 320 }}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button
            className="text-white text-2xl p-2"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>
        {sections.map(sec => (
          <div key={sec.section} className="mb-6">
            <div className="text-lg text-white mb-2 font-semibold">
              {sec.section}
            </div>
            <ul className="">
              {sec.components.map(comp => (
                <li key={comp.name}>
                  <button
                    className={`w-full cursor-pointer border-l border-neutral-700 text-neutral-400 text-left pl-4 py-0.25 transition-colors ${
                      selected === comp.name ? 'text-white border-white' : ''
                    } hover:text-white hover:border-white`}
                    onClick={() => {
                      onSelect(comp.name);
                      setOpen(false);
                    }}
                  >
                    {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </>
  );
};

export default ComponentsSidebar;
