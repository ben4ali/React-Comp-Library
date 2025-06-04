import React, { useState } from 'react';
import type { Component } from '../../types/Component';
import Dependencies from './Dependencies';
import { LivePreview } from './LivePreview';
import Parameters from './Parameters';
import PropsTable from './PropsTable';

interface Props {
  component: Component;
}

const ComponentDetails: React.FC<Props> = ({ component }) => {
  const [params, setParams] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<'source' | 'example'>('source');

  if (!component)
    return (
      <div className="p-8 text-neutral-400">
        Select a component to see details.
      </div>
    );

  return (
    <div className="flex-1 w-full max-w-full box-border p-4 md:p-8 md:pr-24 overflow-x-auto min-w-0">
      <h2 className="text-[2rem] md:text-[45px] font-semibold break-words">
        {component.name}
      </h2>

      {/* Live Preview */}
      <LivePreview component={component} params={params} />

      {/* Parameters */}
      <Parameters
        props={component.props}
        params={params}
        setParams={setParams}
      />

      {/* Tabs for source/example */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2 flex-wrap">
          <button
            className={`px-3 py-1 rounded-t bg-neutral-900 border-b-2 ${
              tab === 'source'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400'
            }`}
            onClick={() => setTab('source')}
          >
            Source
          </button>
          <button
            className={`px-3 py-1 rounded-t bg-neutral-900 border-b-2 ${
              tab === 'example'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400'
            }`}
            onClick={() => setTab('example')}
          >
            Example
          </button>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded p-4 text-xs font-mono whitespace-pre overflow-x-auto max-w-full">
          {tab === 'source' ? component.source : component.example}
        </div>
      </div>

      {/* Props Table */}
      <PropsTable props={component.props} />

      {/* Dependencies */}
      <Dependencies dependencies={component.dependencies} />
    </div>
  );
};

export default ComponentDetails;
