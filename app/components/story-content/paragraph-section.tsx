import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useStoryStore } from '../../stores/useStoryStore';

export function ParagraphSection({ content, id, index, total }: { content: string; id: string; index: number; total: number }) {
    const ref = useRef(null);
    const { activeParagraphId, setActiveParagraph, paragraphs } = useStoryStore();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollingDown, setScrollingDown] = useState(true);
    const [isInit, setIsInit] = useState(false);

    // Update scroll direction
    useEffect(() => {
        const updateScrollDirection = () => {
            const currentScrollY = window.scrollY;
            setScrollingDown(currentScrollY > lastScrollY);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', updateScrollDirection);
        return () => window.removeEventListener('scroll', updateScrollDirection);
    }, [lastScrollY]);

    const isInView = useInView(ref, {
        margin: "-25% 0px -25% 0px"
    });

    useEffect(() => {
        if (isInit && !isInView) {
            // When paragraph exits view, set the next or previous paragraph as active
            const nextIndex = scrollingDown ? index + 1 : index - 1;
            if (nextIndex >= 0 && nextIndex < total) {
                setActiveParagraph(paragraphs[nextIndex].id);
            }
        }

        setIsInit(true)
    }, [isInView, scrollingDown, index, total, paragraphs]);

    const isActive = activeParagraphId === id;

    // Find mentioned characters in the paragraph
    const { characters } = useStoryStore();
    const mentionedCharacters = characters.filter(char =>
        content.toLowerCase().includes(char.name.toLowerCase())
    );

    return (
        <motion.div
            ref={ref}
            id={id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`relative p-8 my-4 rounded-lg transition-all duration-300 ${isActive
                ? 'bg-white shadow-lg border-l-4 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
                }`}
        >
            <p className={`text-lg leading-relaxed ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                {content}
            </p>

            {mentionedCharacters.length > 0 && (
                <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                    {mentionedCharacters.map(character => (
                        <div key={character.id} className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <img
                                    src={character.imageUrl}
                                    alt={character.name}
                                    className="w-full h-full object-top object-cover"
                                />
                            </div>
                            <p className="mt-1 text-sm text-center text-gray-600">{character.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}