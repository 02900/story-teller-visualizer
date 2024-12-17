import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 
  | 'nord' 
  | 'solarized' 
  | 'solarized-dark'
  | 'github-dark'
  | 'github-light'
  | 'dracula'
  | 'tokyo-night';

interface ThemeState {
  theme: ThemeType;
  showShader: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleShader: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'github-light',
      showShader: true,
      setTheme: (theme) => set({ theme }),
      toggleShader: () => set((state) => ({ showShader: !state.showShader })),
    }),
    {
      name: 'theme-storage',
      skipHydration: true
    }
  )
);
