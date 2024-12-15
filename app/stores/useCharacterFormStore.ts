import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CharacterFormState {
  name: string;
  imageUrl: string;
  setName: (name: string) => void;
  setImageUrl: (url: string) => void;
  reset: () => void;
}

export const useCharacterFormStore = create<CharacterFormState>()(
  persist(
    (set) => ({
      name: '',
      imageUrl: '',
      
      setName: (name) => set({ name }),
      setImageUrl: (imageUrl) => set({ imageUrl }),
      reset: () => set({ name: '', imageUrl: '' }),
    }),
    {
      name: 'character-form-storage',
      skipHydration: true
    }
  )
);
