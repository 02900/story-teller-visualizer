'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '../stores/useStoryStore';
import { useStoryInputStore } from '../stores/useStoryInputStore';
import { splitIntoParagraphs } from '../stores/useStoryStore';

export function StoryInput() {
  const router = useRouter();
  const { setStory, setParagraphs } = useStoryStore();
  const {
    inputText,
    isPreviewVisible,
    setInputText,
    setIsPreviewVisible,
    reset
  } = useStoryInputStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleStartReading = () => {
    if (!inputText.trim()) return;
    const paragraphs = splitIntoParagraphs(inputText);
    setStory(inputText);
    setParagraphs(paragraphs);
    reset(); // Clear the input after starting to read
    router.push('/read');
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Story</h2>
        {inputText.trim() && (
          <button
            onClick={togglePreview}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          className="w-full h-[400px] p-4 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white placeholder-gray-400"
          placeholder="Write or paste your story here..."
          value={inputText}
          onChange={handleTextChange}
        />

        <AnimatePresence>
          {isPreviewVisible && inputText.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-white p-4 overflow-auto"
            >
              {splitIntoParagraphs(inputText).map((paragraph) => (
                <p key={paragraph.id} className="mb-4">
                  {paragraph.content}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
