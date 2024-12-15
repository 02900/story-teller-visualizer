'use client';

import { useEffect, useState } from 'react';
import { splitIntoParagraphs, useStoryStore } from '../../stores/useStoryStore';
import { ParagraphSection } from './paragraph-section';

export default function StoryContent() {
    const { paragraphs, story, setParagraphs, setStory, activeParagraphId } = useStoryStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (story && paragraphs.length === 0) {
            setStory(story);
            setParagraphs(splitIntoParagraphs(story));
        }
    }, [story, paragraphs.length, setParagraphs, setStory]);

    // Scroll to active paragraph after page load
    useEffect(() => {
        if (activeParagraphId && paragraphs.length > 0) {
            const element = document.getElementById(activeParagraphId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollableHeight = documentHeight - windowHeight;

            const progress = (scrollTop / scrollableHeight) * 100;
            setProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (paragraphs.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                <p className="text-gray-600 text-lg">No story to display. Please add a story first.</p>
            </div>
        );
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-10">
                <div
                    className="h-full bg-blue-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="min-h-screen py-[240px] relative z-10">
                <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
                    {paragraphs.map((paragraph, index) => (
                        <ParagraphSection
                            key={paragraph.id}
                            id={paragraph.id}
                            content={paragraph.content}
                            index={index}
                            total={paragraphs.length}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
