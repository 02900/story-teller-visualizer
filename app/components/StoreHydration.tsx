'use client';

import { useEffect, useState } from 'react';
import { useStoryStore } from '../stores/useStoryStore';
import { useThemeStore } from '../stores/useThemeStore';
import { useCharacterTemplatesStore } from '../stores/useCharacterTemplatesStore';
import { useCharacterFormStore } from '../stores/useCharacterFormStore';
import { useStoryInputStore } from '../stores/useStoryInputStore';

export function StoreHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isDark } = useThemeStore();

  useEffect(() => {
    Promise.all([
      useStoryStore.persist.rehydrate(),
      useThemeStore.persist.rehydrate(),
      useCharacterTemplatesStore.persist.rehydrate(),
      useCharacterFormStore.persist.rehydrate(),
      useStoryInputStore.persist.rehydrate()
    ]).then(() => {
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (isHydrated) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isHydrated, isDark]);

  return null;
}
