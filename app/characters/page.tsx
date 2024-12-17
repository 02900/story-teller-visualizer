'use client';

import { CharacterInput } from '../components/CharacterInput';

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Character Creator</h1>
        <div className="bg-surface rounded-xl shadow-lg p-6">
          <CharacterInput />
        </div>
      </main>
    </div>
  );
}
