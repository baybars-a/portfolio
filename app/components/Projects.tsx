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

const linkClass =
  'btn-press font-mono text-base md:text-lg text-crt-text hover:bg-accent hover:text-black transition-colors px-1';

// Demo / Code / Details — the same three exits on every project.
const ProjectLinks: React.FC<{ project: Project; onDetails: () => void }> = ({ project, onDetails }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
    {project.demoUrl && (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClass} text-accent`}
        aria-label={`Watch a demo of ${project.title}`}
      >
        [ demo ↗ ]
      </a>
    )}
    {project.githubUrl && (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`View ${project.title} source on GitHub`}
      >
        [ code ]
      </a>
    )}
    <button
      type="button"
      onClick={onDetails}
      className={linkClass}
      aria-label={`How ${project.title} works`}
    >
      [ how it works → ]
    </button>
  </div>
);

const Projects: React.FC<ProjectsProps> = ({ data, isEditMode, onAdd }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAddProject = () => {
    onAdd('projects', {
      title: 'New Project',
      summary: 'One plain-English sentence.',
      highlight: 'One result, ideally with a number.',
      description: 'A brief description.',
      tags: ['New Tag'],
    });
  };

  // Keep each project's index into `data` so the details view can page through all of them.
  const indexed = data.map((project, index) => ({ project, index }));
  const featured = indexed.filter(({ project }) => project.featured);
  const more = indexed.filter(({ project }) => !project.featured);

  return (
    <section id="projects" className="py-20 md:py-32 max-w-4xl mx-auto px-6">
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

      {/* Featured — summary, result and links all visible without a click */}
      <div className="space-y-16 md:space-y-20">
        {featured.map(({ project, index }) => (
          <article key={index} className="border-t border-accent/15 pt-8">
            <h3 className="text-2xl md:text-4xl font-mono text-crt-bright tracking-tight leading-tight mb-4">
              {project.title}
            </h3>
            <p className="text-crt-text text-base md:text-lg leading-relaxed mb-4 max-w-prose">
              {project.summary}
            </p>
            <p className="text-accent text-sm md:text-base leading-relaxed mb-4">
              → {project.highlight}
            </p>
            {project.tags?.length > 0 && (
              <p className="text-crt-dim text-xs md:text-sm mb-5">{project.tags.join(' · ')}</p>
            )}
            <ProjectLinks project={project} onDetails={() => setOpenIndex(index)} />
          </article>
        ))}
      </div>

      {/* More — one compact row each */}
      {more.length > 0 && (
        <div className="mt-24">
          <h3 className="font-mono text-sm md:text-base tracking-widest uppercase text-crt-dim mb-6">
            More projects
          </h3>
          {more.map(({ project, index }) => (
            <div key={index} className="border-t border-accent/15 py-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 mb-2">
                <h4 className="text-xl md:text-2xl font-mono text-crt-bright tracking-tight leading-tight">
                  {project.title}
                </h4>
                <div className="hidden md:block">
                  <ProjectLinks project={project} onDetails={() => setOpenIndex(index)} />
                </div>
              </div>
              <p className="text-crt-text text-sm md:text-base leading-relaxed max-w-prose">
                {project.summary}
              </p>
              <p className="text-accent/90 text-xs md:text-sm mt-1">→ {project.highlight}</p>
              {/* On mobile the links follow the text instead of sitting above it */}
              <div className="md:hidden mt-3">
                <ProjectLinks project={project} onDetails={() => setOpenIndex(index)} />
              </div>
            </div>
          ))}
          <div className="border-t border-accent/15" />
        </div>
      )}

      {openIndex !== null && data[openIndex] && (
        <ProjectManPage
          project={data[openIndex]}
          index={openIndex}
          total={data.length}
          onClose={() => setOpenIndex(null)}
          onPrev={openIndex > 0 ? () => setOpenIndex(openIndex - 1) : undefined}
          onNext={openIndex < data.length - 1 ? () => setOpenIndex(openIndex + 1) : undefined}
        />
      )}
    </section>
  );
};

export default Projects;
