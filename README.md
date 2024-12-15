# Story Teller Visualizer

A Next.js application that enhances story reading by visualizing character appearances and tracking reading progress. The app provides an immersive reading experience with character highlighting and progress tracking.

## Features

- **Character Creation**: Create and manage characters with their images
- **Story Input**: Multiple ways to input your story:
  - Direct text input
  - URL content extraction (supports extracting content from web pages)
- **Character Highlighting**: Automatically detects and highlights character mentions in paragraphs
- **Reading Progress**: Visual progress indicator as you read through the story
- **Dark Mode Support**: Full dark mode support across all components
- **State Persistence**: Maintains your story content, characters, and URL extraction history

## Project Structure

```
app/
├── components/        # Reusable React components
│   ├── CharacterInput.tsx    # Character creation interface
│   ├── StoryInput.tsx       # Story input with URL extraction
│   └── UrlContentExtractor.tsx # Web content extraction
├── stores/           # Zustand store configurations
├── api/             # API routes for content extraction
├── characters/      # Character management page
├── read/           # Story reading page
└── page.tsx        # Main landing page
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Components

- **UrlContentExtractor**: Extract story content directly from web pages by URL and element ID
- **CharacterInput**: Create and manage story characters with images
- **StoryInput**: Main story input interface with support for direct text and URL extraction
- **ParagraphSection**: Handles the visualization of story paragraphs with character highlighting

## Technical Details

- Built with Next.js 14 using the App Router
- State management with Zustand and persist middleware
- Styled using Tailwind CSS with dark mode support
- TypeScript for type safety
- Cheerio for HTML content extraction

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling
- [Cheerio](https://cheerio.js.org/) - HTML parsing and manipulation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
