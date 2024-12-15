'use client';

import { useStoryStore } from '../stores/useStoryStore';

export function EnvironmentDisplay() {
  const { isGenerating } = useStoryStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Generated Environment</h2>
      <div className="h-[400px] border rounded-lg bg-white p-4 flex items-center justify-center">
        {isGenerating ? (
          <p className="text-gray-500">Generating environment...</p>
        ) : (
          <p className="text-gray-500">Your generated environment will appear here</p>
        )}
      </div>
    </div>
  );
}
