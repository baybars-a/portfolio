'use client';

import React, { useEffect, useRef } from 'react';
import { Project } from '../../types';

interface ProjectManPageProps {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
}

const winFont = '"Tahoma", "MS Sans Serif", "Segoe UI", sans-serif';

// Classic raised 3D bevel (buttons, window frame).
const raisedShadow =
  'inset 1px 1px 0 #fff, inset -1px -1px 0 #000, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #808080';
// Classic sunken 3D bevel (text areas, status bar well).
const sunkenShadow =
  'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #404040, inset -2px -2px 0 #dfdfdf';

const TitleBarButton: React.FC<{ label: string; onClick?: () => void; ariaLabel: string }> = ({
  label,
  onClick,
  ariaLabel,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    style={{ boxShadow: raisedShadow, fontFamily: winFont }}
    className="w-[18px] h-[16px] bg-[#c0c0c0] text-black text-[11px] leading-none font-bold
               flex items-center justify-center active:shadow-none"
  >
    {label}
  </button>
);

const ProjectManPage: React.FC<ProjectManPageProps> = ({ project, index, total, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
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
      <div className="absolute inset-0 bg-black/60" />

      {/* Window */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Project details for ${project.title}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#c0c0c0', boxShadow: raisedShadow, fontFamily: winFont }}
        className="relative w-full max-w-2xl max-h-full flex flex-col p-[3px] outline-none"
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-1.5 py-1 mb-[3px]"
          style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span className="text-white text-[13px] font-bold truncate pr-2 select-none">
            📄 {project.title}
          </span>
          <div className="flex gap-[3px] flex-shrink-0">
            <TitleBarButton label="✕" ariaLabel="Close" onClick={onClose} />
          </div>
        </div>

        {/* Menu bar (decorative) */}
        <div className="flex gap-4 px-2 py-1 text-[12px] text-black select-none">
          {['File', 'Edit', 'View', 'Help'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* Content — sunken text area */}
        <div
          className="mx-2 mb-2 bg-white overflow-y-auto"
          style={{ boxShadow: sunkenShadow, overscrollBehavior: 'contain', maxHeight: '60vh' }}
        >
          <div className="p-4 text-black text-[16px] leading-relaxed">
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ boxShadow: raisedShadow }}
                    className="bg-[#c0c0c0] px-2 py-0.5 text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.description && (
              <p className="mb-4">{project.description}</p>
            )}

            {project.result && (
              <>
                <p className="font-bold mb-1">Outcome:</p>
                <p className="mb-4">{project.result}</p>
              </>
            )}

            {project.githubUrl && (
              <p>
                <span className="font-bold">Repository: </span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0000ee] underline hover:text-[#ff0000]"
                >
                  {project.githubUrl.replace('https://', '')}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between gap-2 px-2 pb-2">
          <span
            style={{ boxShadow: sunkenShadow }}
            className="flex-1 bg-[#c0c0c0] px-2 py-0.5 text-[11px] text-black"
          >
            Project {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={onClose}
            style={{ boxShadow: raisedShadow }}
            className="bg-[#c0c0c0] text-black text-[12px] px-4 py-0.5 active:shadow-none"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectManPage;
