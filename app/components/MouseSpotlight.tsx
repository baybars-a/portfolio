'use client';

import { useEffect, useRef } from 'react';

const MouseSpotlight = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !window.matchMedia('(pointer: fine)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        overlay.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.07), transparent 40%)`;
        document.querySelectorAll<HTMLElement>('h1, h2, h3, p, a, li, span, button').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
            if (el.style.textShadow) el.style.textShadow = '';
            if (el.style.filter) el.style.filter = '';
            return;
          }
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          if (dist < 350) {
            const intensity = 1 - dist / 350;
            if (el.classList.contains('dot-title')) return;
            el.style.textShadow = `0 0 ${25 * intensity}px rgba(255,255,255,${0.6 * intensity}), 0 0 ${70 * intensity}px rgba(255,255,255,${0.2 * intensity}), 0 0 ${120 * intensity}px rgba(193,230,0,${0.08 * intensity})`;
            el.style.filter = `brightness(${1 + 0.3 * intensity})`;
          } else {
            if (el.style.textShadow) el.style.textShadow = '';
            if (el.style.filter) el.style.filter = '';
          }
        });
      });
    };

    const onMouseLeave = () => {
      overlay.style.opacity = '0';
      document.querySelectorAll<HTMLElement>('h1, h2, h3, p, a, li, span, button').forEach((el) => {
        el.style.textShadow = '';
        el.style.filter = '';
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
      document.querySelectorAll<HTMLElement>('h1, h2, h3, p, a, li, span, button').forEach((el) => {
        el.style.textShadow = '';
        el.style.filter = '';
      });
    };
  }, []);

  return <div ref={overlayRef} className="mouse-spotlight" />;
};

export default MouseSpotlight;
