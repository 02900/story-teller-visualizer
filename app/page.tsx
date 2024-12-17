"use client";

import Link from "next/link";
import { StoryInput } from "./components/StoryInput";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Story Teller Visualizer
        </h1>
        <div className="bg-surface rounded-xl shadow-lg p-6 space-y-4">
          <Link
            className="text-xl font-semibold text-primary hover:text-accent transition-colors"
            href="/characters"
          >
            Create Characters click here!
          </Link>

          <StoryInput />
        </div>
      </main>
    </div>
  );
}
