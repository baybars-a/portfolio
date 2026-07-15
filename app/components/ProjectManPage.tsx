'use client';

import React, { useEffect, useRef } from 'react';
import { Project } from '../../types';

interface ProjectManPageProps {
  project: Project;
  index: number;
  onClose: () => void;
}

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Renders "[--flag value]" synopsis chunks with man-page-style
// underlined arguments.
const SynopsisLine: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\[[^\]]+\])/g).map((part, i) =>
      part.startsWith('[') ? (
        <span key={i}>
          {'['}
          <span className="underline decoration-accent/60 underline-offset-2">
            {part.slice(1, -1)}
          </span>
          {']'}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    )}
  </>
);

const ProjectManPage: React.FC<ProjectManPageProps> = ({ project, index, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const name = project.manName ?? slug(project.title);
  const section = index + 1; // project number doubles as the man section
  const manTitle = `${name.toUpperCase()}(${section})`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'q' || e.key === 'Q' || e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    // Lock page scroll behind the pager and focus it for keyboard users.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Pager */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Manual page for ${project.title}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-full flex flex-col bg-[#0d0702] border border-accent/25 font-mono text-accent text-xs md:text-sm leading-relaxed shadow-[0_0_60px_rgba(255,129,0,0.15)] outline-none"
      >
        {/* Close control */}
        <button
          onClick={onClose}
          aria-label="Close manual page"
          className="absolute top-3 right-3 md:top-4 md:right-5 z-10 font-bold text-accent
                     hover:bg-accent hover:text-black transition-colors px-1"
        >
          [ X ]
        </button>

        <div
          className="overflow-y-auto px-5 py-5 md:px-10 md:py-8"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* man header line */}
          <div className="flex justify-between text-accent/80 mb-8 pr-16">
            <span>{manTitle}</span>
            <span className="hidden sm:inline">User Commands</span>
            <span>{manTitle}</span>
          </div>

          <h2 className="uppercase tracking-wider mb-1 text-accent">Name</h2>
          <p className="pl-6 md:pl-10 mb-6 text-accent/90">
            {name} —{' '}
            {project.title
              .toLowerCase()
              // drop a leading "name —" so titles that start with the
              // command don't read "uniq — uniq — ..."
              .replace(new RegExp(`^${name}\\s*[—–-]\\s*`, 'i'), '')}
          </p>

          {project.synopsis && (
            <>
              <h2 className="uppercase tracking-wider mb-1 text-accent">Synopsis</h2>
              <p className="pl-6 md:pl-10 mb-6 text-accent/90 break-words">
                <span className="font-bold">{name}</span>{' '}
                <SynopsisLine text={project.synopsis.replace(`${name} `, '')} />
              </p>
            </>
          )}

          {project.description && (
            <>
              <h2 className="uppercase tracking-wider mb-1 text-accent">Description</h2>
              <p className="pl-6 md:pl-10 mb-6 text-accent/90">{project.description}</p>
            </>
          )}

          <h2 className="uppercase tracking-wider mb-1 text-accent">Environment</h2>
          <p className="pl-6 md:pl-10 mb-6 text-accent/90">{project.tags.join(', ')}</p>

          {project.githubUrl && (
            <>
              <h2 className="uppercase tracking-wider mb-1 text-accent">See Also</h2>
              <p className="pl-6 md:pl-10 mb-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6dff8c] underline underline-offset-2 hover:bg-[#6dff8c] hover:text-black transition-colors"
                >
                  {project.githubUrl.replace('https://', '')}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManPage;
