import React from 'react';
// FIX: Use relative path for import as '@/' alias is not configured.
import { PortfolioData } from '../../types';
import ScrambleText from './ScrambleText';
import LocalInput from './LocalInput';

interface AboutProps {
  data: PortfolioData['about'];
  isEditMode: boolean;
  onUpdate: (path: string, value: any) => void;
}

const About: React.FC<AboutProps> = ({ data, isEditMode, onUpdate }) => {
  return (
    <section id="about" className="py-20 md:py-32 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/3">
          <div className="aspect-square overflow-hidden w-48 h-48 md:w-64 md:h-64 mx-auto border border-accent/30 bg-black">
            <img
              src="./baybars.png"
              alt="Baybars Al-Zibdeh, portrait rendered in amber phosphor duotone"
              width={512}
              height={512}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditMode && <LocalInput type="text" value={data.imageUrl} onCommit={val => onUpdate('about.imageUrl', val)} className="w-full bg-neutral-800 text-white p-1 mt-2 text-xs border border-white/10" aria-label="About Me Image URL" />}
        </div>
        <div className="md:w-2/3">
          <ScrambleText
            text="About"
            as="h2"
            className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-crt-bright mb-6"
          />
          <p
            className={`text-lg text-crt-text leading-relaxed mb-4 ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate('about.text1', e.currentTarget.textContent || '')}
          >
            {data.text1}
          </p>
          <p
            className={`text-lg text-crt-text leading-relaxed ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate('about.text2', e.currentTarget.textContent || '')}
          >
            {data.text2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;