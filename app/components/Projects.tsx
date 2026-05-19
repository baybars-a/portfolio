'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Github } from 'lucide-react';
import { Project } from '../../types';
import ScrambleText from './ScrambleText';

interface ProjectsProps {
  data: Project[];
  isEditMode: boolean;
  onUpdate: (path: string, value: any) => void;
  onAdd: (path: string, newItem: any) => void;
  onRemove: (path: string, index: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data, isEditMode, onUpdate, onAdd, onRemove }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState<number>(0);

  const mouseX = useSpring(0, { stiffness: 600, damping: 55 });
  const mouseY = useSpring(0, { stiffness: 600, damping: 55 });
  const activeIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (activeIndexRef.current === null) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (activeIndex !== null) setDisplayIndex(activeIndex);
  }, [activeIndex]);

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
      {/* Cursor-following image preview — desktop only */}
      <motion.div
        className="fixed z-50 pointer-events-none overflow-hidden hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-62%',
          width: 340,
          height: 220,
        }}
        animate={{
          clipPath: activeIndex !== null
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(100% 0% 0% 0%)',
        }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <img
          src={data[displayIndex]?.imageUrl ?? ''}
          alt={data[displayIndex]?.title ?? ''}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="flex justify-between items-center mb-16">
        <ScrambleText
          text="Projects"
          as="h2"
          className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-white"
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
            className="project-row group border-t border-white/10 py-5 md:py-7"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-start gap-4 md:gap-8">
              {/* Index */}
              <span className="font-mono text-xs text-white/25 tabular-nums pt-[6px] w-6 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-ostro text-white tracking-tight
                               leading-tight transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm font-mono text-white/30 mt-1.5 leading-relaxed
                              line-clamp-1 transition-colors duration-300 group-hover:text-white/55">
                  {project.description}
                </p>
              </div>

              {/* Tags — large screens only */}
              <div className="hidden lg:flex gap-x-4 items-center flex-shrink-0 pt-[6px]">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-white/25 transition-colors duration-300 group-hover:text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press flex-shrink-0 text-white/25 hover:text-accent pt-[6px]"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </section>
  );
};

export default Projects;
