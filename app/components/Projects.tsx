import React from 'react';
import ProjectCard from './ProjectCard';
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
  const handleAddProject = () => {
    onAdd('projects', {
      title: 'New Project',
      description: 'A brief description of the new project.',
      imageUrl: '',
      tags: ['New Tag'],
    });
  };

  return (
    <section className="py-20 md:py-32 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-center mb-16">
        <ScrambleText
          text="Projects"
          as="h2"
          className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-white"
        />
        {isEditMode && (
          <button onClick={handleAddProject} className="bg-accent text-black px-4 py-2 font-mono text-sm font-bold hover:bg-accent/80">
            Add Project
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {data.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            isEditMode={isEditMode}
            onUpdate={(field, value) => onUpdate(`projects.${index}.${field}`, value)}
            onRemove={() => onRemove('projects', index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;