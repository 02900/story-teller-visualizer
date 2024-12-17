'use client';

import { useThemeStore, type ThemeType } from '../stores/useThemeStore';
import { JSX, useEffect, useRef, useState } from 'react';
import { BsSnow, BsStar, BsMoon, BsGithub } from 'react-icons/bs';
import { IoChevronDown } from 'react-icons/io5';
import { FaCity } from 'react-icons/fa';
import { GiVampireDracula } from 'react-icons/gi';

const themes: Array<{ id: ThemeType; name: string; icon: JSX.Element; description?: string }> = [
  { id: 'nord', name: 'Nord', icon: <BsSnow className="w-4 h-4" />, description: 'Arctic-inspired' },
  { id: 'solarized', name: 'Solarized', icon: <BsStar className="w-4 h-4" />, description: 'Scientific precision' },
  { id: 'solarized-dark', name: 'Solarized Dark', icon: <BsMoon className="w-4 h-4" />, description: 'Dark precision' },
  { id: 'github-light', name: 'GitHub Light', icon: <BsGithub className="w-4 h-4" />, description: 'GitHub\'s light theme' },
  { id: 'github-dark', name: 'GitHub Dark', icon: <BsGithub className="w-4 h-4" />, description: 'GitHub\'s dark theme' },
  { id: 'dracula', name: 'Dracula', icon: <GiVampireDracula className="w-4 h-4" />, description: 'Dark and vibrant' },
  { id: 'tokyo-night', name: 'Tokyo Night', icon: <FaCity className="w-4 h-4" />, description: 'Cyberpunk vibes' },
];

export function ThemeSwitch() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 rounded-full bg-surface transition-colors hover:bg-opacity-80 z-[50] flex items-center gap-2"
        aria-label="Select theme"
      >
        {currentTheme.icon}
        <span className="text-sm text-text-primary">{currentTheme.name}</span>
        <IoChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed top-16 left-4 w-64 bg-surface rounded-lg shadow-lg border border-text-muted border-opacity-20 z-[51] overflow-auto max-h-[400px]">
          <div className="p-1 flex flex-col gap-1">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                className={`flex items-center gap-3 p-2 rounded-md w-full hover:bg-background transition-colors ${
                  theme === themeOption.id ? 'bg-background' : ''
                }`}
                onClick={() => {
                  setTheme(themeOption.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  {themeOption.icon}
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-text-primary">{themeOption.name}</span>
                    {themeOption.description && (
                      <span className="text-xs text-text-muted">{themeOption.description}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
