'use client';

// Pinned to the bottom of the visual viewport (not the document), so it
// tracks Safari's collapsing toolbar and rubber-band overscroll instead
// of scrolling away with the page. Masks the sliver of browser chrome /
// out-of-bounds animation that Safari exposes beneath the last section
// when its dynamic UI resizes the viewport mid-scroll.
export default function BottomMask() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
        background: '#000000',
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    />
  );
}
