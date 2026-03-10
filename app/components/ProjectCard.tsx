import React from 'react';
import { Project } from '../../types';
import LocalInput from './LocalInput';

interface ProjectCardProps extends Project {
  isEditMode: boolean;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tags, isEditMode, onUpdate, onRemove }) => {
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    onUpdate('tags', newTags);
  };

  const handleAddTag = () => {
    onUpdate('tags', [...tags, 'New Tag']);
  }

  const handleRemoveTag = (index: number) => {
    onUpdate('tags', tags.filter((_: string, i: number) => i !== index));
  }


  return (
    <div className={`group cursor-pointer transition-all ${isEditMode ? 'ring-1 ring-accent p-4' : ''}`}>
      {isEditMode && (
        <button onClick={onRemove} className="float-right bg-red-500 text-white px-2 py-1 text-xs rounded-full hover:bg-red-600 -mt-2 -mr-2" aria-label={`Remove ${title} project`}>
          &times;
        </button>
      )}
      <div className="overflow-hidden mb-5">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {isEditMode && <LocalInput type="text" value={imageUrl} onCommit={val => onUpdate('imageUrl', val)} className="w-full bg-neutral-800 text-white p-1 mt-2 text-xs border border-white/10" aria-label="Project Image URL" />}
      </div>
      <h3
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate('title', e.currentTarget.textContent || '')}
        className={`text-lg md:text-xl font-bold text-white mb-2 ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
      >{title}</h3>
      <p
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate('description', e.currentTarget.textContent || '')}
        className={`text-gray-400 text-sm leading-relaxed mb-4 ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
      >{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <div key={index} className="flex items-center">
            <span
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => handleTagChange(index, e.currentTarget.textContent || '')}
              className={`bg-white/10 text-gray-300 text-xs font-medium font-mono px-3 py-1 ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
            >
              {tag}
            </span>
            {isEditMode && <button onClick={() => handleRemoveTag(index)} className="ml-1 text-red-500" aria-label={`Remove ${tag} tag`}>&times;</button>}
          </div>
        ))}
        {isEditMode && <button onClick={handleAddTag} className="text-accent text-xs ml-2">+ Tag</button>}
      </div>
    </div>
  );
};

export default ProjectCard;