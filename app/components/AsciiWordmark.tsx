'use client';

import React, { useEffect, useMemo, useRef } from 'react';

interface AsciiWordmarkProps {
  art: string;
  label: string;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Density ramp used for substitution near the cursor — lightest to densest.
// Reuses the wordmark's own box-drawing glyphs (corners → lines → solid
// block) instead of a generic ASCII ramp, so the hover effect stays visually
// consistent with the logo's own character set.
const RAMP = ' ╚╝╔╗║═█';

const FLICKER_PROBABILITY = 0.03;
const LERP_FACTOR = 0.15;
const RETURN_DURATION_MS = 500;

const AsciiWordmark: React.FC<AsciiWordmarkProps> = ({
  art,
  label,
  radius = 100,
  className,
  style,
}) => {
  const rows = useMemo(() => art.split('\n'), [art]);
  const containerRef = useRef<HTMLDivElement>(null);
  // One <span> per character, indexed [row][col].
  const cellRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  const rafRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);
  const targetPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const returnStartRef = useRef<number | null>(null);
  // Cells currently displaced from their original char, so mouseleave only
  // has to walk this (small) set back to normal instead of the whole grid.
  const dirtyCells = useRef<Set<HTMLSpanElement>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    type Box = { el: HTMLSpanElement; cx: number; cy: number; orig: string };
    let charBoxes: Box[] = [];
    let boxByEl = new Map<HTMLSpanElement, Box>();

    // Cell pixel centers (relative to the container) — font is monospace so
    // geometry is uniform per row/col. Recomputed on hover-start and resize
    // rather than every frame, since layout only changes on those events.
    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const boxes: Box[] = [];
      cellRefs.current.forEach((row) => {
        row.forEach((el) => {
          if (!el) return;
          const existing = boxByEl.get(el);
          const r = el.getBoundingClientRect();
          boxes.push({
            el,
            cx: r.left - containerRect.left + r.width / 2,
            cy: r.top - containerRect.top + r.height / 2,
            orig: existing?.orig ?? el.textContent ?? ' ',
          });
        });
      });
      charBoxes = boxes;
      boxByEl = new Map(boxes.map((b) => [b.el, b]));
    };
    measure();

    const setCell = (
      box: (typeof charBoxes)[number],
      char: string,
      intensity: number
    ) => {
      const el = box.el;
      if (char !== box.orig) {
        el.textContent = char;
      } else {
        el.textContent = box.orig;
      }
      if (intensity > 0.001) {
        el.style.opacity = String(0.75 + intensity * 0.25);
        el.style.fontWeight = intensity > 0.5 ? '700' : 'normal';
        el.style.textShadow = `0 0 ${4 + intensity * 14}px rgba(255, 129, 0, ${
          0.4 + intensity * 0.6
        })`;
        dirtyCells.current.add(el);
      } else if (dirtyCells.current.has(el)) {
        el.style.opacity = '';
        el.style.fontWeight = '';
        el.style.textShadow = '';
        el.textContent = box.orig;
        dirtyCells.current.delete(el);
      }
    };

    const resetCell = (box: (typeof charBoxes)[number]) => {
      const el = box.el;
      el.textContent = box.orig;
      el.style.opacity = '';
      el.style.fontWeight = '';
      el.style.textShadow = '';
    };

    const tick = () => {
      smoothPos.current.x +=
        (targetPos.current.x - smoothPos.current.x) * LERP_FACTOR;
      smoothPos.current.y +=
        (targetPos.current.y - smoothPos.current.y) * LERP_FACTOR;

      // Fade factor when easing back out after mouseleave (1 = full effect).
      let fadeOut = 1;
      if (!hoveredRef.current) {
        if (returnStartRef.current === null) {
          returnStartRef.current = performance.now();
        }
        const elapsed = performance.now() - returnStartRef.current;
        fadeOut = Math.max(0, 1 - elapsed / RETURN_DURATION_MS);
      }

      const { x, y } = smoothPos.current;
      const activeRadius = radius * fadeOut;

      // Only cells within radius of the smoothed cursor get touched; any
      // previously-dirty cell that's now out of range gets reset explicitly.
      const stillActive = new Set<HTMLSpanElement>();

      if (activeRadius > 0.5) {
        for (const box of charBoxes) {
          const dx = box.cx - x;
          const dy = box.cy - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > activeRadius) continue;

          let intensity = 1 - dist / activeRadius; // 1 at center, 0 at edge
          intensity *= fadeOut;

          let char = box.orig;
          if (box.orig !== ' ') {
            const rampIndex = Math.min(
              RAMP.length - 1,
              Math.floor(intensity * (RAMP.length - 1))
            );
            char = RAMP[rampIndex] === ' ' ? box.orig : RAMP[rampIndex];
            if (hoveredRef.current && Math.random() < FLICKER_PROBABILITY * intensity) {
              const flickerIndex = Math.min(
                RAMP.length - 1,
                Math.max(0, rampIndex + (Math.random() < 0.5 ? -1 : 1))
              );
              char = RAMP[flickerIndex] === ' ' ? box.orig : RAMP[flickerIndex];
            }
          }

          setCell(box, char, intensity);
          stillActive.add(box.el);
        }
      }

      // Reset anything that was dirty last frame but isn't active this frame.
      dirtyCells.current.forEach((el) => {
        if (!stillActive.has(el)) {
          const box = boxByEl.get(el);
          if (box) resetCell(box);
          dirtyCells.current.delete(el);
        }
      });

      if (!hoveredRef.current && fadeOut <= 0) {
        // Fully eased back — stop the loop until the next hover.
        dirtyCells.current.forEach((el) => {
          const box = boxByEl.get(el);
          if (box) resetCell(box);
        });
        dirtyCells.current.clear();
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      measure();
      hoveredRef.current = true;
      returnStartRef.current = null;
      const r = container.getBoundingClientRect();
      targetPos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      smoothPos.current = { ...targetPos.current };
      ensureLoop();
    };

    let lastMove = 0;
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove < 16) return; // ~60fps throttle
      lastMove = now;
      const r = container.getBoundingClientRect();
      targetPos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMouseLeave = () => {
      hoveredRef.current = false;
      returnStartRef.current = null;
      ensureLoop();
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      charBoxes.forEach(resetCell);
    };
  }, [rows, radius]);

  return (
    <h1 aria-label={label} className="mb-8 flex justify-center">
      <div
        ref={containerRef}
        aria-hidden="true"
        className={className}
        style={{ ...style, whiteSpace: 'pre' }}
      >
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: 'block' }}>
            {row.split('').map((ch, ci) => (
              <span
                key={ci}
                ref={(el) => {
                  if (!cellRefs.current[ri]) cellRefs.current[ri] = [];
                  cellRefs.current[ri][ci] = el;
                }}
                style={{ display: 'inline-block' }}
              >
                {ch}
              </span>
            ))}
          </div>
        ))}
      </div>
    </h1>
  );
};

export default AsciiWordmark;
