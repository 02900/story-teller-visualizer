import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  showShader: boolean;
  toggleTheme: () => void;
  toggleShader: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      showShader: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      toggleShader: () => set((state) => ({ showShader: !state.showShader })),
    }),
    {
      name: 'theme-storage',
      skipHydration: true
    }
  )
);
