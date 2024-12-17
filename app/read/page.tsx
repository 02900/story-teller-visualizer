'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import { BsEye, BsEyeSlash, BsHouseDoor, BsTranslate } from "react-icons/bs";
import { IoChevronDown } from 'react-icons/io5';
import BackgroundShader from "../components/BackgroundShader";
import StoryContent from "../components/story-content";
import { useThemeStore } from "../stores/useThemeStore";
import { SUPPORTED_LANGUAGES, useTranslationStore } from "../stores/useTranslationStore";

export default function Page() {
  const { showShader, toggleShader } = useThemeStore();
  const { targetLanguage, setTargetLanguage } = useTranslationStore();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === targetLanguage);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {showShader && <BackgroundShader />}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <BsTranslate />
            {selectedLanguage?.name}
            <IoChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${language.code === targetLanguage ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  onClick={() => {
                    setTargetLanguage(language.code);
                    setIsOpen(false);
                  }}
                >
                  {language.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <Link
          href="/"
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          title="Home"
        >
          <BsHouseDoor className="w-6 h-6" />
        </Link>
        <button
          onClick={toggleShader}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          title={showShader ? "Hide background effects" : "Show background effects"}
        >
          {showShader ? (
            <BsEye className="w-6 h-6" />
          ) : (
            <BsEyeSlash className="w-6 h-6" />
          )}
        </button>
      </div>
      <StoryContent />
    </>
  );
}
