"use client";

import { useStoryStore } from "@/app/stores/useStoryStore";
import { useState } from "react";
import { BsDownload, BsTrash, BsUpload } from "react-icons/bs";

export function CharacterTemplates() {
  const { characters, addCharacter, removeCharacter } = useStoryStore();
  const [error, setError] = useState("");

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent template selection when clicking delete
    removeCharacter(id);
  };

  const handleExport = () => {
    const templatesJson = JSON.stringify(characters, null, 2);
    const blob = new Blob([templatesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "character-templates.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        importTemplates(json);
      } catch (err) {
        setError("Invalid JSON file format");
      }
    };
    reader.readAsText(file);
  };

  const importTemplates = (json: any) => {
    if (!Array.isArray(json)) {
      setError("Invalid template format: expected an array");
      return;
    }

    const validTemplates = json.filter((template) => {
      return (
        template.name &&
        template.imageUrl &&
        typeof template.name === "string" &&
        typeof template.imageUrl === "string"
      );
    });

    if (validTemplates.length === 0) {
      setError("No valid templates found in the import");
      return;
    }

    validTemplates.forEach((template) => {
      addCharacter({
        name: template.name,
        imageUrl: template.imageUrl,
      });
    });

    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Character Templates
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <BsDownload className="w-4 h-4" /> Export
          </button>
          <label className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 cursor-pointer">
            <BsUpload className="w-4 h-4" /> Import File
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      {characters.length === 0 ? (
        <p className="text-center text-gray-500">No templates available</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {characters.map((character) => (
            <div key={character.id} className="cursor-pointer group relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-full object-top object-cover group-hover:opacity-75 transition-opacity"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                <button
                  onClick={(e) => handleDelete(e, character.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-opacity flex items-center gap-1"
                >
                  <BsTrash className="w-4 h-4" /> Remove
                </button>
              </div>
              <p className="mt-2 text-center font-medium text-gray-800 dark:text-gray-200">
                {character.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
