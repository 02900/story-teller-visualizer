import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoryInputState {
  inputText: string;
  isPreviewVisible: boolean;
  setInputText: (text: string) => void;
  setIsPreviewVisible: (visible: boolean) => void;
  reset: () => void;
}

export const useStoryInputStore = create<StoryInputState>()(
  persist(
    (set) => ({
      inputText: '',
      isPreviewVisible: false,
      
      setInputText: (inputText) => set({ inputText }),
      setIsPreviewVisible: (isPreviewVisible) => set({ isPreviewVisible }),
      reset: () => set({ inputText: '', isPreviewVisible: false }),
    }),
    {
      name: 'story-input-storage',
      skipHydration: true
    }
  )
);
