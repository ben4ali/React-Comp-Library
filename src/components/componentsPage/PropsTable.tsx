import type { ComponentProp } from '../../types/ComponentProp';

interface PropsTableProps {
  props: ComponentProp[];
}

const PropsTable: React.FC<PropsTableProps> = ({ props }) => (
  <div className="mb-6 ">
    <div className="font-semibold text-[26px] mb-2">Props</div>
    <table className="w-full text-xs  rounded-lg ">
      <thead className="bg-neutral-900">
        <tr className="text-left font-semibold text-white">
          <th className="py-4 px-2">Property</th>
          <th className="py-4 border-l border-neutral-800 px-2">Type</th>
          <th className="py-4 border-l border-neutral-800 px-2">Default</th>
          <th className="py-4 border-l border-neutral-800 px-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {props?.map(prop => (
          <tr key={prop.property} className="border-t border-neutral-800">
            <td className="py-4 px-2 ">
              <span className="bg-neutral-900 py-1 px-2 rounded-md">
                {prop.property}
              </span>
            </td>
            <td className="py-4 px-2 border-l border-neutral-900">
              {prop.type}
            </td>
            <td className="py-4 px-2 border-l border-neutral-900">
              {prop.default}
            </td>
            <td className="py-4 px-2 border-l border-neutral-900">
              {prop.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PropsTable;
