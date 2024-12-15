import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoryState, StoryActions, StoryParagraph } from '../types';

type StoryStore = StoryState & StoryActions;

export const splitIntoParagraphs = (text: string): StoryParagraph[] => {
  return text
    .split(/\n\s*\n/) // Split on empty lines
    .filter(p => p.trim()) // Remove empty paragraphs
    .map(content => ({
      id: Math.random().toString(36).substring(2),
      content: content.trim()
    }));
};

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      story: '',
      paragraphs: [],
      activeParagraphId: null,
      characters: [],
      isGenerating: false,

      setStory: (story) => set({ story }),
      
      setParagraphs: (paragraphs) => {
        set({ 
          paragraphs,
          activeParagraphId: paragraphs[0]?.id || null
        });
      },

      setActiveParagraph: (id) => set({ activeParagraphId: id }),
      
      addCharacter: (character) => set((state) => {
        // Check if a character with the same name already exists (case-insensitive)
        const isDuplicate = state.characters.some(
          (char) => char.name.toLowerCase() === character.name.toLowerCase()
        );

        // If it's a duplicate, don't add it
        if (isDuplicate) {
          return state;
        }

        // Add new character if it's not a duplicate
        return {
          characters: [...state.characters, {
            ...character,
            id: Date.now().toString(),
          }],
        };
      }),
  
      removeCharacter: (id) => set((state) => ({
        characters: state.characters.filter((char) => char.id !== id),
      })),
  
      setIsGenerating: (isGenerating) => set({ isGenerating }),
    }),
    {
      name: 'story-storage',
      skipHydration: true // This helps prevent hydration mismatch in Next.js
    }
  )
);
