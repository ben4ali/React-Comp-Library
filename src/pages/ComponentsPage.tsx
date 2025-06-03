import React, { useState } from 'react';
import ComponentDetails from '../components/componentsPage/ComponentDetails';
import ComponentsSidebar from '../components/componentsPage/ComponentsSidebar';
import { componentsData } from '../data/componentsData';

const ComponentsPage: React.FC = () => {
  const [selected, setSelected] = useState<string>(
    componentsData[0]?.components[0]?.name || ''
  );
  const allComponents = componentsData.flatMap(s => s.components);
  const selectedComponent = allComponents.find(c => c.name === selected);

  return (
    <div className="flex">
      <ComponentsSidebar
        sections={componentsData.map(({ section, components }) => ({
          section,
          components: components.map(({ name, type }) => ({ name, type })),
        }))}
        selected={selected}
        onSelect={setSelected}
      />
      {selectedComponent && <ComponentDetails component={selectedComponent} />}
    </div>
  );
};

export default ComponentsPage;
