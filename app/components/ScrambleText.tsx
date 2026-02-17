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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

const scramble = useCallback(() => {
  let index = 0;

  intervalRef.current = setInterval(() => {
    setDisplayText((prev) =>
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(text);
    }
  }, scrambleSpeed);
}, [text, scrambleSpeed]);


  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scramble]);

  return (
    // @ts-expect-error dynamic tag ref typing
    <Tag ref={ref} className={`dot-title ${className}`}>
      {displayText}
    </Tag>
  );
};

export default ScrambleText;
