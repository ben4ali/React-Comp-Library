import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComponentDetails from '../components/componentsPage/ComponentDetails';
import ComponentsSidebar from '../components/componentsPage/ComponentsSidebar';
import { componentsData } from '../data/componentsData';

const ComponentsPage: React.FC = () => {
  const { componentName } = useParams<{ componentName?: string }>();
  const navigate = useNavigate();
  const allComponents = componentsData.flatMap(s => s.components);
  const defaultComponent = allComponents[0]?.name || '';
  const selected = componentName || defaultComponent;
  const selectedComponent =
    allComponents.find(
      c =>
        c.name.replace(/\s+/g, '').toLowerCase() ===
        (componentName || '').replace(/\s+/g, '').toLowerCase()
    ) ||
    allComponents.find(c => c.name === selected) ||
    allComponents[0];

  const handleSelect = (name: string) => {
    navigate(`/components/${name.replace(/\s+/g, '')}`);
  };

  return (
    <div className="flex">
      <ComponentsSidebar
        sections={componentsData.map(({ section, components }) => ({
          section,
          components: components.map(({ name, type }) => ({ name, type })),
        }))}
        selected={selectedComponent?.name || ''}
        onSelect={handleSelect}
      />
      {selectedComponent && <ComponentDetails component={selectedComponent} />}
    </div>
  );
};

export default ComponentsPage;
