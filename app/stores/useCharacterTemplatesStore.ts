import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character } from '../types';

interface CharacterTemplatesState {
  templates: Character[];
  addTemplate: (character: Pick<Character, 'name' | 'imageUrl'>) => void;
  removeTemplate: (id: string) => void;
}

export const useCharacterTemplatesStore = create<CharacterTemplatesState>()(
  persist(
    (set) => ({
      templates: [],
      
      addTemplate: (character) => set((state) => {
        // Don't add if character with same name already exists
        if (state.templates.some(t => t.name.toLowerCase() === character.name.toLowerCase())) {
          return state;
        }
        return {
          templates: [...state.templates, {
            ...character,
            id: Date.now().toString(),
          }]
        };
      }),

      removeTemplate: (id) => set((state) => ({
        templates: state.templates.filter(t => t.id !== id)
      })),
    }),
    {
      name: 'character-templates-storage',
      skipHydration: true
    }
  )
);
