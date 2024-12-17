import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoryInputState {
  titlePreview: string;
  setTitlePreview: (title: string) => void;
  inputText: string;
  setInputText: (text: string) => void;
}

export const useStoryInputStore = create<StoryInputState>()(
  persist(
    (set) => ({
      titlePreview: "",
      setTitlePreview: (title) => set({ titlePreview: title }),
      inputText: "",
      setInputText: (inputText) => set({ inputText }),
    }),
    {
      name: "story-input-storage",
      skipHydration: true,
    }
  )
);
