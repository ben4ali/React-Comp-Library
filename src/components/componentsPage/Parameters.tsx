import type { ComponentParameter } from '../../types/ComponentParameter';

interface ParametersProps {
  props: ComponentParameter[];
  params: Record<string, string>;
  setParams: (params: Record<string, string>) => void;
}

const Parameters: React.FC<ParametersProps> = ({
  props,
  params,
  setParams,
}) => (
  <div className="my-12">
    <div className="font-semibold mb-2 text-[26px]">Parameters</div>
    <div className="flex flex-col gap-4">
      {props?.map(prop => (
        <div key={prop.property} className="flex flex-col">
          <label className="text-xs mb-1">{prop.property}</label>
          <input
            className="max-w-[15rem] bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white text-sm"
            value={params[prop.property] ?? ''}
            onChange={e =>
              setParams({ ...params, [prop.property]: e.target.value })
            }
            placeholder={prop.default}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Parameters;
