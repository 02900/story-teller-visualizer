# Story Teller Visualizer

A Next.js application that enhances story reading by visualizing character appearances and tracking reading progress. The app provides an immersive reading experience with smooth scrolling, character highlighting, and progress tracking.

## Features

- **Interactive Story Reading**: Smooth scrolling with automatic paragraph tracking
- **Character Management**: Add and remove characters with their images
- **Character Highlighting**: Automatically detects and highlights character mentions in paragraphs
- **Reading Progress**: Visual progress indicator as you read through the story
- **Active Paragraph Tracking**: Keeps track of your current reading position
- **State Persistence**: Maintains your reading progress and character information

## Project Structure

```
app/
├── components/         # Reusable React components
├── stores/            # Zustand store configurations
├── types.ts           # TypeScript type definitions
├── read/             # Story reading page
└── page.tsx          # Main landing page
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Components

- **ParagraphSection**: Handles the visualization of story paragraphs with character highlighting and scroll tracking
- **CharacterList**: Manages the list of characters and their images
- **CharacterInput**: Component for adding new characters to the story
- **StoreHydration**: Handles state persistence across page reloads

## Technical Details

- Built with Next.js 14 using the App Router
- State management with Zustand
- Animations powered by Framer Motion
- Styled using Tailwind CSS
- TypeScript for type safety

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
