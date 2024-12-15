'use client';

import { BsPersonPlus } from 'react-icons/bs';
import { useCharacterFormStore } from '../../stores/useCharacterFormStore';

interface CharacterFormProps {
  onAddCharacter: (name: string, imageUrl: string) => void;
}

export function CharacterForm({ onAddCharacter }: CharacterFormProps) {
  const { name, imageUrl, setName, setImageUrl, reset } = useCharacterFormStore();

  const handleSubmit = () => {
    if (!name.trim() || !imageUrl.trim()) return;
    onAddCharacter(name.trim(), imageUrl.trim());
    reset();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Character name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !imageUrl.trim()}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <BsPersonPlus className="w-5 h-5" />
        Add Character
      </button>
    </div>
  );
}
