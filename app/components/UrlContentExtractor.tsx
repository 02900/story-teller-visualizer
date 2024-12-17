"use client";

import { useState } from "react";
import { useUrlExtractorStore } from "../stores/useUrlExtractorStore";

interface UrlContentExtractorProps {
  onContentExtracted: (content: string, title?: string) => void;
}

export function UrlContentExtractor({
  onContentExtracted,
}: UrlContentExtractorProps) {
  const { url, elementId, titleId, setUrl, setElementId, setTitleId } =
    useUrlExtractorStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    if (!url || !elementId) {
      setError("Please provide both URL and content element ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/extract-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, elementId, titleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract content");
      }

      const data = await response.json();
      onContentExtracted(data.content, data.title);
    } catch (err) {
      setError(
        "Failed to extract content. Please check the URL and element IDs."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mb-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-primary">
          Extract Content from URL
        </h3>
        {(url || elementId || titleId) && (
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
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-4">
          <input
            type="text"
            value={elementId}
            onChange={(e) => setElementId(e.target.value)}
            placeholder="Content Element ID"
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={titleId}
            onChange={(e) => setTitleId(e.target.value)}
            placeholder="Title Element ID (optional)"
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={handleExtract}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Extracting..." : "Extract Content"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
