import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UrlExtractorState {
  url: string;
  elementId: string;
  titleId: string;
  setUrl: (url: string) => void;
  setElementId: (elementId: string) => void;
  setTitleId: (titleId: string) => void;
  reset: () => void;
}

export const useUrlExtractorStore = create<UrlExtractorState>()(
  persist(
    (set) => ({
      url: "",
      elementId: "",
      titleId: "",
      setUrl: (url) => set({ url }),
      setElementId: (elementId) => set({ elementId }),
      setTitleId: (titleId) => set({ titleId }),
      reset: () => set({ url: "", elementId: "", titleId: "" }),
    }),
    {
      name: "url-extractor-storage",
    }
  )
);
