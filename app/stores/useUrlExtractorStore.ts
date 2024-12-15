import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UrlExtractorState {
  url: string;
  elementId: string;
  setUrl: (url: string) => void;
  setElementId: (elementId: string) => void;
  reset: () => void;
}

export const useUrlExtractorStore = create<UrlExtractorState>()(
  persist(
    (set) => ({
      url: '',
      elementId: '',
      setUrl: (url) => set({ url }),
      setElementId: (elementId) => set({ elementId }),
      reset: () => set({ url: '', elementId: '' }),
    }),
    {
      name: 'url-extractor-storage',
    }
  )
);
