"use client";

import { useStoryStore } from "../../stores/useStoryStore";
import { CharacterForm } from "./CharacterForm";
import { CharacterTemplates } from "./CharacterTemplates";

export function CharacterInput() {
  const { addCharacter } = useStoryStore();

  const handleAddCharacter = (name: string, imageUrl: string) => {
    const character = {
      name,
      imageUrl,
    };

    addCharacter(character);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary">Characters</h2>
      </div>

      <CharacterForm onAddCharacter={handleAddCharacter} />
      <CharacterTemplates />
    </div>
  );
}
