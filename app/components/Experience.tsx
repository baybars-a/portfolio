import React from 'react';
import { PortfolioData, Experience as ExperienceType } from '../../types';
import Certifications from './Certifications';
import ScrambleText from './ScrambleText';

interface ExperienceProps {
  data: PortfolioData['experience'];
  isEditMode: boolean;
  onUpdate: (path: string, value: any) => void;
}

const Experience: React.FC<ExperienceProps> = ({ data, isEditMode, onUpdate }) => {
  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="./background_vid.mp4" type="video/mp4" />
      </video>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ScrambleText
          text="Certifications"
          as="h2"
          className="text-3xl md:text-5xl font-mono font-extrabold tracking-tight text-white mb-16"
        />
        <hr className="border-white/10 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {data.columns.map((column: ExperienceType[], colIndex: number) => (
            <div key={colIndex} className="space-y-8">
              {column.map((exp: ExperienceType, expIndex: number) => (
                <div key={expIndex}>
                  <h3
                    className={`font-extrabold text-base text-white ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdate(`experience.columns.${colIndex}.${expIndex}.role`, e.currentTarget.textContent || '')}
                  >{exp.role}</h3>
                  <p
                    className={`text-gray-400 text-sm ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdate(`experience.columns.${colIndex}.${expIndex}.company`, e.currentTarget.textContent || '')}
                  >{exp.company}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14">
          <a href={data.resumeUrl} className="inline-block bg-accent text-black font-mono text-sm font-bold tracking-widest py-3 px-8 hover:bg-accent/80 transition-colors">
            RESUME
          </a>
          {isEditMode && (
            <input
              type="text"
              value={data.resumeUrl}
              onChange={e => onUpdate('experience.resumeUrl', e.target.value)}
              className="w-full bg-neutral-800 text-white p-1 mt-2 text-xs border border-white/10"
              aria-label="Resume URL"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;