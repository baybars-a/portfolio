'use client';

import { useEffect, useRef } from 'react';

const MouseSpotlight = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    // Only enable on devices with a mouse/trackpad
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // Move the spotlight overlay
        spotlight.style.opacity = '1';
        spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.07), transparent 40%)`;

        // Glow text elements based on proximity to cursor
        const elements = document.querySelectorAll('h1, h2, h3, p, a, li, span, button');
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();

          // Skip elements outside viewport
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style.textShadow) htmlEl.style.textShadow = '';
            if (htmlEl.style.filter) htmlEl.style.filter = '';
            return;
          }

          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          const htmlEl = el as HTMLElement;

          if (dist < 350) {
            const t = 1 - dist / 350;
            const isDotTitle = htmlEl.classList.contains('dot-title');

            if (isDotTitle) {
              // Skip dot-matrix titles — the mask already glows via CSS
              return;
            } else {
              htmlEl.style.textShadow = `0 0 ${25 * t}px rgba(255,255,255,${0.6 * t}), 0 0 ${70 * t}px rgba(255,255,255,${0.2 * t}), 0 0 ${120 * t}px rgba(193,230,0,${0.08 * t})`;
              htmlEl.style.filter = `brightness(${1 + 0.3 * t})`;
            }
          } else {
            if (htmlEl.style.textShadow) htmlEl.style.textShadow = '';
            if (htmlEl.style.filter) htmlEl.style.filter = '';
          }
        });
      });
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
      document.querySelectorAll('h1, h2, h3, p, a, li, span, button').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.textShadow = '';
        htmlEl.style.filter = '';
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      document.querySelectorAll('h1, h2, h3, p, a, li, span, button').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.textShadow = '';
        htmlEl.style.filter = '';
      });
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
    />
  );
};

export default MouseSpotlight;
