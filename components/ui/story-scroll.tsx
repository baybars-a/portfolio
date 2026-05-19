'use client';

import React from 'react';

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
  bare?: boolean;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
  bare = false,
}) => {
  const { backgroundColor, ...innerStyle } = style;
  return (
    <section
      aria-label={ariaLabel}
      className={cx('relative min-h-screen w-full overflow-hidden', className)}
    >
      <div
        className={cx(
          bare
            ? 'relative min-h-screen w-full'
            : 'relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
        )}
        style={{ backgroundColor, ...innerStyle }}
      >
        {children}
      </div>
    </section>
  );
};

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  id,
  'aria-label': ariaLabel = 'Portfolio',
}) => {
  return (
    <div
      id={id}
      aria-label={ariaLabel}
      className={cx('w-full', className)}
    >
      {children}
    </div>
  );
};

export default FlowArt;
