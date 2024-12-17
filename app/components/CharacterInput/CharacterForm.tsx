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
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !imageUrl.trim()}
        className="w-full py-2 px-4 bg-accent/90 text-white rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <BsPersonPlus className="w-5 h-5" />
        Add Character
      </button>
    </div>
  );
}
