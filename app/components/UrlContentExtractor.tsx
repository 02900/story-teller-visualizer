'use client';

import { useState } from 'react';
import { useUrlExtractorStore } from '../stores/useUrlExtractorStore';

interface UrlContentExtractorProps {
  onContentExtracted: (content: string) => void;
}

export function UrlContentExtractor({ onContentExtracted }: UrlContentExtractorProps) {
  const { url, elementId, setUrl, setElementId } = useUrlExtractorStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExtract = async () => {
    if (!url || !elementId) {
      setError('Please provide both URL and element ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/extract-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, elementId }),
      });

      if (!response.ok) {
        throw new Error('Failed to extract content');
      }

      const data = await response.json();
      onContentExtracted(data.content);
    } catch (err) {
      setError('Failed to extract content. Please check the URL and element ID.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mb-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Extract Content from URL</h3>
        {(url || elementId) && (
          <button
            onClick={() => useUrlExtractorStore.getState().reset()}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-2">
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter element ID"
          value={elementId}
          onChange={(e) => setElementId(e.target.value)}
        />
        <button
          onClick={handleExtract}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Extracting...' : 'Extract Content'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
