"use client";

import Link from "next/link";
import { CharacterInput } from "../components/CharacterInput";
import { BsHouseDoor } from "react-icons/bs";

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Link
          href="/"
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          title="Home"
        >
          <BsHouseDoor className="w-6 h-6" />
        </Link>
      </div>
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Character Creator
        </h1>
        <div className="bg-surface rounded-xl shadow-lg p-6">
          <CharacterInput />
        </div>
      </main>
    </div>
  );
}
