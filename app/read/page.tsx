'use client';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import BackgroundShader from "../components/BackgroundShader";
import { useThemeStore } from "../stores/useThemeStore";
import StoryContent from "../components/story-content";

export default function Page() {
  const { showShader, toggleShader } = useThemeStore();

  return (
    <>
      {showShader && <BackgroundShader />}
      <button
        onClick={toggleShader}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        title={showShader ? "Hide background effects" : "Show background effects"}
      >
        {showShader ? (
          <BsEye className="w-6 h-6" />
        ) : (
          <BsEyeSlash className="w-6 h-6" />
        )}
      </button>
      <StoryContent />
    </>
  );
}
