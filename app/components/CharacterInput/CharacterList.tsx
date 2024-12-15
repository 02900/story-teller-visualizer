'use client';

import { BsTrash } from 'react-icons/bs';
import { useStoryStore } from '../../stores/useStoryStore';

export function CharacterList() {
  const { characters, removeCharacter } = useStoryStore();

  if (characters.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 p-4 min-w-max">
        {characters.map((character) => (
          <div
            key={character.id}
            className="flex-shrink-0 w-32 group relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-full h-full object-top object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeCharacter(character.id)}
                className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-opacity flex items-center gap-1"
              >
                <BsTrash className="w-4 h-4" /> Remove
              </button>
            </div>
            <p className="mt-2 text-center font-medium text-gray-800 dark:text-gray-200 truncate">
              {character.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
