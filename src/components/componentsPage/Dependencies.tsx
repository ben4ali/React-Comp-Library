interface DependenciesProps {
  dependencies: string[];
}

const Dependencies: React.FC<DependenciesProps> = ({ dependencies }) => (
  <div>
    <div className="font-semibold text-[26px] mb-2">Dependencies</div>
    <div className="flex gap-2 flex-wrap">
      {dependencies?.map(dep => (
        <span
          key={dep}
          className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full text-xs font-semibold"
        >
          {dep}
        </span>
      ))}
    </div>
  </div>
);

export default Dependencies;
