'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  scrambleSpeed?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as: Tag = 'h2',
  scrambleSpeed = 80,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let index = 0;
    let lastTime = 0;

    const tick = (timestamp: number) => {
      if (timestamp - lastTime >= scrambleSpeed) {
        lastTime = timestamp;
        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < index) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        index++;
        if (index > text.length) {
          setDisplayText(text);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: show the final text, no scramble.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          scramble();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scramble]);

  return (
    // aria-label keeps screen readers on the real text while the visible glyphs scramble.
    // @ts-expect-error dynamic tag ref typing
    <Tag ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">{displayText}</span>
    </Tag>
  );
};

export default ScrambleText;
