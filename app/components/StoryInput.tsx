"use client";

import { useRouter } from "next/navigation";
import { useStoryStore } from "../stores/useStoryStore";
import { useStoryInputStore } from "../stores/useStoryInputStore";
import { splitIntoParagraphs } from "../stores/useStoryStore";
import { UrlContentExtractor } from "./UrlContentExtractor";

export function StoryInput() {
  const router = useRouter();
  const { setStory, setParagraphs, setTitle } = useStoryStore();
  const { inputText, setInputText, titlePreview, setTitlePreview } =
    useStoryInputStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitlePreview(e.target.value);
  };

  const handleContentExtracted = (content: string, title?: string) => {
    setInputText(content);
    if (title) {
      setTitlePreview(title);
    }
  };

  const handleStartReading = () => {
    if (!inputText.trim()) return;
    const paragraphs = splitIntoParagraphs(inputText);
    setStory(inputText);
    setParagraphs(paragraphs);
    setTitle(titlePreview);
    router.push("/read");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-primary">Your Story</h2>

      <UrlContentExtractor onContentExtracted={handleContentExtracted} />

      <input
        type="text"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Story title (optional)..."
        value={titlePreview}
        onChange={handleTitleChange}
      />

      <textarea
        className="w-full h-[160px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
