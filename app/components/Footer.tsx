import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { MailIcon } from './icons/MailIcon';
import { PortfolioData } from '../../types';
import ScrambleText from './ScrambleText';

interface FooterProps {
  data: PortfolioData['footer'];
  isEditMode: boolean;
  onUpdate: (path: string, value: any) => void;
}

const Footer: React.FC<FooterProps> = ({ data, isEditMode, onUpdate }) => {
  return (
    <footer id="contact" className="py-20 md:py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {isEditMode ? (
          <h2
            className="text-3xl md:text-5xl font-mono font-bold tracking-tight mb-6 outline-dashed outline-1 outline-accent p-1"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate('footer.title', e.currentTarget.textContent || '')}
          >{data.title}</h2>
        ) : (
          <ScrambleText
            text={data.title}
            as="h2"
            className="text-3xl md:text-5xl font-mono font-bold tracking-tight mb-6"
          />
        )}
        <p
          className={`text-gray-400 mb-10 max-w-md mx-auto ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
          contentEditable={isEditMode}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate('footer.subtitle', e.currentTarget.textContent || '')}
        >
          {data.subtitle}
        </p>
        <a
          href={`mailto:${data.email}`}
          className={`text-xl md:text-2xl text-accent hover:underline font-mono ${isEditMode ? 'outline-dashed outline-1 outline-accent p-1' : ''}`}
          contentEditable={isEditMode}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate('footer.email', e.currentTarget.textContent || '')}
        >
          {data.email}
        </a>
        <div className="flex justify-center gap-6 mt-10">
          {/* <a href={data.socials.linkedin} aria-label="LinkedIn" className="text-gray-400 hover:text-accent transition-colors">
            <LinkedInIcon className="w-6 h-6" />
          </a>
          <a href={`mailto:${data.email}`} aria-label="Email" className="text-gray-400 hover:text-accent transition-colors">
            <MailIcon className="w-6 h-6" />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;