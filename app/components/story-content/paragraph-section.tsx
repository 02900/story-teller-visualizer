import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { useStoryStore } from "../../stores/useStoryStore";
import { useTranslation } from "../../hooks/useTranslation";

export function ParagraphSection({
  content,
  id,
  index,
  total,
}: {
  content: string;
  id: string;
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const { activeParagraphId, setActiveParagraph, paragraphs } = useStoryStore();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);
  const [isInit, setIsInit] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(
    null
  );
  const { translate, isTranslating } = useTranslation();

  // Update scroll direction
  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [lastScrollY]);

  const isInView = useInView(ref, {
    margin: "-25% 0px -25% 0px",
  });

  useEffect(() => {
    if (isInit && !isInView) {
      // When paragraph exits view, set the next or previous paragraph as active
      const nextIndex = scrollingDown ? index + 1 : index - 1;
      if (nextIndex >= 0 && nextIndex < total) {
        setActiveParagraph(paragraphs[nextIndex].id);
      }
    }

    setIsInit(true);
  }, [isInView, scrollingDown, index, total, paragraphs]);

  const isActive = activeParagraphId === id;

  // Find mentioned characters in the paragraph in order of appearance
  const { characters } = useStoryStore();
  const mentionedCharacters = characters
    .map((char) => ({
      character: char,
      position: content.toLowerCase().indexOf(char.name.toLowerCase()),
    }))
    .filter(({ position }) => position !== -1)
    .sort((a, b) => a.position - b.position)
    .map(({ character }) => character);

  const handleTranslateClick = async () => {
    if (translatedContent) {
      setTranslatedContent(null);
      return;
    }

    try {
      const translated = await translate(content);
      setTranslatedContent(translated);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`relative p-8 my-4 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-surface shadow-lg border-l-4 border-accent"
          : "bg-background"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow space-y-4">
          <div className="relative">
            <p
              className={`text-lg leading-relaxed ${
                isActive ? "text-accent" : "text-primary"
              } ${isTranslating ? "opacity-50" : ""}`}
            >
              {translatedContent || content}
            </p>
            {isTranslating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            )}
          </div>
          {translatedContent && (
            <p className="text-sm text-primary italic">Original: {content}</p>
          )}
        </div>
        <button
          onClick={handleTranslateClick}
          className={`flex-shrink-0 p-2 rounded-full transition-colors ${
            translatedContent
              ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          title={translatedContent ? "Show original" : "Translate"}
          disabled={isTranslating}
        >
          <BsTranslate
            className={`w-5 h-5 ${
              translatedContent ? "text-text-muted" : "text-accent"
            } ${isTranslating ? "animate-pulse" : ""}`}
          />
        </button>
      </div>

      {mentionedCharacters.length > 0 && (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {mentionedCharacters.map((character) => (
            <div key={character.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <p className="mt-1 text-sm text-center text-muted">
                {character.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
