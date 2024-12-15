'use client';

import Link from 'next/link';
import { StoryInput } from './components/StoryInput';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Story Teller Visualizer</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
          <Link 
            href="/characters" 
            className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-6"
          >
            Create Characters
          </Link>
          <StoryInput />
        </div>
      </main>
    </div>
  );
}
