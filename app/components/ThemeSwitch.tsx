'use client';

import { useThemeStore } from '../stores/useThemeStore';
import { useEffect, useState } from 'react';
import { BsSun, BsMoonStars } from 'react-icons/bs';

export function ThemeSwitch() {
  const { isDark, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDark, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 z-[50]"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <BsSun className="w-5 h-5 text-yellow-500" />
      ) : (
        <BsMoonStars className="w-5 h-5 text-purple-200" />
      )}
    </button>
  );
}
