import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';
import { XIcon } from './icons/XIcon';
import { PortfolioData } from '../../types';

interface HeroProps {
  name: string;
  data: PortfolioData['hero'];
}

const Hero: React.FC<HeroProps> = ({ name, data }) => {

  return (
    <section className="relative flex items-center justify-center min-h-[80vh] py-16 md:py-24 overflow-hidden rounded-lg border border-white/10">
      <video
          key={typeof data.videoUrl === 'string' ? data.videoUrl : undefined}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
          <source src="./background_vid.mp4" type="video/mp4" />
          
          Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>
      
      <div className="grid md:grid-cols-2 gap-16 items-center w-full max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left animate-fade-in-left">
          <div className="relative">
            <img
              src="./BaybarsImageCartoon.png"
              alt="Avatar of Baybars Al-Zibdeh"
              className="w-80 h-80 mb-6"
            />
          </div>
          <p className="text-lg text-gray-200 mb-2 drop-shadow-md">{data.greeting}</p>
          <h1 className="text-5xl md:text-6xl font-mono text-white tracking-tighter drop-shadow-md">
            Baybars
          </h1>
          <div className="flex space-x-4 mt-6">
            <a href={data.socials.linkedin} aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors drop-shadow-md">
              <LinkedInIcon className="w-8 h-8" />
            </a>
            <a href={data.socials.github} aria-label="GitHub" className="text-gray-300 hover:text-white transition-colors drop-shadow-md">
              <GithubIcon className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-black/20 backdrop-blur-md p-8 rounded-lg border border-white/10 space-y-4 animate-fade-in-right [animation-delay:200ms]">
          <h2 className="text-3xl font-bold text-white tracking-wide">About</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={data.resumeUrl} className="w-full text-center bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
              RESUME
            </a>
            <a href={`mailto:${data.email}`} className="w-full text-center bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
              EMAIL ME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;