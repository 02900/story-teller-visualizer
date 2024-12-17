"use client";

import { useEffect, useState } from "react";
import { splitIntoParagraphs, useStoryStore } from "../../stores/useStoryStore";
import { ParagraphSection } from "./paragraph-section";

export default function StoryContent() {
  const {
    paragraphs,
    story,
    title,
    setParagraphs,
    setStory,
    activeParagraphId,
  } = useStoryStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (story && paragraphs.length === 0) {
      setStory(story);
      setParagraphs(splitIntoParagraphs(story));
    }
  }, [story, paragraphs.length, setParagraphs, setStory]);

  // Scroll to active paragraph after page load
  useEffect(() => {
    if (activeParagraphId && paragraphs.length > 0) {
      const element = document.getElementById(activeParagraphId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;

      const progress = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (paragraphs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-primary text-lg">
          No story to display. Please add a story first.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-text-primary p-4 md:p-8">
      {title && (
        <h1 className="fixed top-5 left-[50%] translate-x-[-50%] text-3xl font-bold mb-8 text-center text-accent">{title}</h1>
      )}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[11]">
        <div
          className="h-full bg-accent transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="min-h-screen py-[240px] relative z-10">
        <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 text-text-primary">
          {paragraphs.map((paragraph, index) => (
            <ParagraphSection
              key={paragraph.id}
              id={paragraph.id}
              content={paragraph.content}
              index={index}
              total={paragraphs.length}
            />
          ))}
        </div>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 blur-md animate-pulse"></div>
            {/* Progress circle */}
            <div
              className="absolute inset-0 rounded-full border-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              style={{
                background: `conic-gradient(from 0deg, rgb(6 182 212) ${progress}%, transparent ${progress}%)`,
              }}
            ></div>
            {/* Inner circle with progress text */}
            <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
              <span
                className="text-cyan-500 text-sm font-bold"
                style={{ textShadow: "0 0 8px rgb(6 182 212)" }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
