import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoryInputState {
  inputText: string;
  setInputText: (text: string) => void;
  reset: () => void;
}

export const useStoryInputStore = create<StoryInputState>()(
  persist(
    (set) => ({
      inputText: '',
      setInputText: (inputText) => set({ inputText }),
      reset: () => set({ inputText: '' }),
    }),
    {
      name: 'story-input-storage',
      skipHydration: true
    }
  )
);
