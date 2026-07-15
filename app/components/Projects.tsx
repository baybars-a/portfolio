'use client';

import React, { useState } from 'react';
import { Project } from '../../types';
import ScrambleText from './ScrambleText';
import ProjectManPage from './ProjectManPage';

interface ProjectsProps {
  data: Project[];
  isEditMode: boolean;
  onUpdate: (path: string, value: any) => void;
  onAdd: (path: string, newItem: any) => void;
  onRemove: (path: string, index: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data, isEditMode, onUpdate, onAdd, onRemove }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAddProject = () => {
    onAdd('projects', {
      title: 'New Project',
      description: 'A brief description.',
      imageUrl: '',
      tags: ['New Tag'],
    });
  };

  return (
    <section id="projects" className="py-20 md:py-32 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-center mb-16">
        <ScrambleText
          text="Projects"
          as="h2"
          className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-crt-bright"
        />
        {isEditMode && (
          <button
            onClick={handleAddProject}
            className="bg-accent text-black px-4 py-2 font-mono text-sm font-bold hover:bg-accent/80"
          >
            Add Project
          </button>
        )}
      </div>

      <div>
        {data.map((project, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Open manual page for ${project.title}`}
            className="project-row group border-t border-accent/15 py-5 md:py-7 cursor-pointer"
            onClick={() => setOpenIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenIndex(index);
              }
            }}
          >
            <div className="flex items-start gap-4 md:gap-8">
              {/* Index */}
              <span className="font-mono text-xs text-crt-faint tabular-nums pt-[6px] w-6 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-mono text-crt-bright tracking-tight
                               leading-tight transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-xs md:text-sm font-mono text-crt-faint mt-1.5 leading-relaxed
                                line-clamp-1 transition-colors duration-300 group-hover:text-crt-dim">
                    {project.description}
                  </p>
                )}
              </div>

              {/* man-page hint on hover */}
              <span
                className="hidden md:inline font-mono text-xs text-transparent group-hover:text-crt-green/80
                           transition-colors duration-300 flex-shrink-0 pt-[6px] select-none"
                aria-hidden="true"
              >
                man {project.manName ?? 'page'}
              </span>

              {/* GitHub — terminal bracket token */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press flex-shrink-0 font-mono text-xs md:text-sm text-crt-faint hover:text-accent pt-[6px]"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${project.title} source on GitHub`}
                >
                  [git]
                </a>
              )}
            </div>
          </div>
        ))}
        <div className="border-t border-accent/15" />
      </div>

      {openIndex !== null && data[openIndex] && (
        <ProjectManPage
          project={data[openIndex]}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
};

export default Projects;
