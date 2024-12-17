export interface Character {
  id: string;
  name: string;
  imageUrl: string;
}

export interface StoryParagraph {
  id: string;
  content: string;
}

export interface StoryState {
  story: string;
  paragraphs: StoryParagraph[];
  activeParagraphId: string | null;
  characters: Character[];
  isGenerating: boolean;
}

export interface StoryActions {
  setTitle: (title: string) => void;
  setStory: (story: string) => void;
  setParagraphs: (paragraphs: StoryParagraph[]) => void;
  setActiveParagraph: (id: string) => void;
  addCharacter: (character: Pick<Character, 'name' | 'imageUrl'>) => void;
  removeCharacter: (id: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}
