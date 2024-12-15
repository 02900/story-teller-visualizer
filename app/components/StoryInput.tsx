'use client';

import { useRouter } from 'next/navigation';
import { useStoryStore } from '../stores/useStoryStore';
import { useStoryInputStore } from '../stores/useStoryInputStore';
import { splitIntoParagraphs } from '../stores/useStoryStore';
import { UrlContentExtractor } from './UrlContentExtractor';

export function StoryInput() {
  const router = useRouter();
  const { setStory, setParagraphs } = useStoryStore();
  const {
    inputText,
    setInputText,
    reset
  } = useStoryInputStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleContentExtracted = (content: string) => {
    setInputText(content);
  };

  const handleStartReading = () => {
    if (!inputText.trim()) return;
    const paragraphs = splitIntoParagraphs(inputText);
    setStory(inputText);
    setParagraphs(paragraphs);
    reset(); // Clear the input after starting to read
    router.push('/read');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Story</h2>
      </div>

      <UrlContentExtractor onContentExtracted={handleContentExtracted} />

      <textarea
        className="w-full h-[160px] p-4 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white placeholder-gray-400"
        placeholder="Write or paste your story here..."
        value={inputText}
        onChange={handleTextChange}
      />

      <button
        onClick={handleStartReading}
        disabled={!inputText.trim()}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Start Reading
      </button>
    </div>
  );
}
