import React from 'react';

interface Props {
  sections: Array<{
    section: string;
    components: Array<{ name: string; type: string }>;
  }>;
  selected: string;
  onSelect: (name: string) => void;
}

const ComponentsSidebar: React.FC<Props> = ({
  sections,
  selected,
  onSelect,
}) => (
  <aside className="w-50 ml-10 text-white h-full p-4 overflow-y-auto">
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
                }`}
                onClick={() => onSelect(comp.name)}
              >
                {comp.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </aside>
);

export default ComponentsSidebar;
