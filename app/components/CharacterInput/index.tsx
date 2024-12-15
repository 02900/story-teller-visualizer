'use client';

import { useState } from 'react';
import { useCharacterTemplatesStore } from '../../stores/useCharacterTemplatesStore';
import { useStoryStore } from '../../stores/useStoryStore';
import { Character } from '../../types';
import { CharacterForm } from './CharacterForm';
import { CharacterTemplates } from './CharacterTemplates';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { CharacterList } from './CharacterList';

export function CharacterInput() {
  const { addCharacter } = useStoryStore();
  const { addTemplate } = useCharacterTemplatesStore();
  const [showTemplates, setShowTemplates] = useState(false);

  const handleAddCharacter = (name: string, imageUrl: string) => {
    const character = {
      name,
      imageUrl,
    };

    addCharacter(character);
    addTemplate(character);
  };

  const handleSelectTemplate = (template: Character) => {
    addCharacter({
      ...template,
    });
    setShowTemplates(false);
  };

  return (
    <div className="space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Characters
        </h2>

        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
        >
          {showTemplates ? (
            <>Hide Templates <BsChevronUp className="w-4 h-4" /></>
          ) : (
            <>Show Templates <BsChevronDown className="w-4 h-4" /></>
          )}
        </button>
      </div>

      <CharacterTemplates
        showTemplates={showTemplates}
        onSelectTemplate={handleSelectTemplate}
      />
      <CharacterForm onAddCharacter={handleAddCharacter} />
      <CharacterList />
    </div>
  );
}
