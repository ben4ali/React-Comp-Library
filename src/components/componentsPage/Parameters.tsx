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
          {prop.inputType === 'checkbox' || prop.type === 'boolean' ? (
            <input
              type="checkbox"
              checked={
                params[prop.property] === 'false'
                  ? false
                  : Boolean(params[prop.property] ?? prop.default === 'true')
              }
              onChange={e =>
                setParams({
                  ...params,
                  [prop.property]: e.target.checked ? 'true' : 'false',
                })
              }
              className="w-5 h-5"
            />
          ) : prop.inputType === 'number' || prop.type === 'number' ? (
            <input
              type="number"
              className="max-w-[15rem] bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white text-sm"
              value={params[prop.property] ?? prop.default}
              min={prop.min}
              max={prop.max}
              step={prop.step}
              onChange={e =>
                setParams({ ...params, [prop.property]: e.target.value })
              }
              placeholder={prop.default}
            />
          ) : prop.inputType === 'select' && prop.options ? (
            <select
              className="max-w-[15rem] bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white text-sm"
              value={params[prop.property] ?? prop.default}
              onChange={e =>
                setParams({ ...params, [prop.property]: e.target.value })
              }
            >
              {prop.options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="max-w-[15rem] bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white text-sm"
              value={params[prop.property] ?? ''}
              onChange={e =>
                setParams({ ...params, [prop.property]: e.target.value })
              }
              placeholder={prop.default}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Parameters;
