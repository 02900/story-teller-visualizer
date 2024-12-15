'use client';

import { BsTrash } from 'react-icons/bs';
import { Character } from '../../types';
import { useCharacterTemplatesStore } from '../../stores/useCharacterTemplatesStore';

interface CharacterTemplatesProps {
  showTemplates: boolean;
  onSelectTemplate: (template: Character) => void;
}

export function CharacterTemplates({
  showTemplates,
  onSelectTemplate,
}: CharacterTemplatesProps) {
  const { templates, removeTemplate } = useCharacterTemplatesStore();
  
  if (templates.length === 0) return null;
  if (!showTemplates) return null;

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent template selection when clicking delete
    removeTemplate(id);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onSelectTemplate(template)}
          className="cursor-pointer group relative"
        >
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={template.imageUrl}
              alt={template.name}
              className="w-full h-full object-top object-cover group-hover:opacity-75 transition-opacity"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
            <button
              onClick={(e) => handleDelete(e, template.id)}
              className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-opacity flex items-center gap-1"
            >
              <BsTrash className="w-4 h-4" /> Remove
            </button>
          </div>
          <p className="mt-2 text-center font-medium text-gray-800 dark:text-gray-200">
            {template.name}
          </p>
        </div>
      ))}
    </div>
  );
}
