'use client';

import { StoryInput } from './components/StoryInput';
import { CharacterInput } from './components/CharacterInput';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Story Teller Visualizer</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
          <CharacterInput />
          <StoryInput />
        </div>
      </main>
    </div>
  );
}
