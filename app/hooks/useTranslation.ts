import { useState } from 'react';
import { useTranslationStore } from '../stores/useTranslationStore';

export function useTranslation() {
  const [isTranslating, setIsTranslating] = useState(false);
  const { targetLanguage } = useTranslationStore();

  const translate = async (text: string): Promise<string> => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLang: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    } finally {
      setIsTranslating(false);
    }
  };

  return { translate, isTranslating };
}
