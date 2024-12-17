import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
] as const;

interface TranslationState {
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
}

export const useTranslationStore = create<TranslationState>()(
  persist(
    (set) => ({
      targetLanguage: 'es',
      setTargetLanguage: (targetLanguage) => set({ targetLanguage }),
    }),
    {
      name: 'translation-storage',
    }
  )
);
