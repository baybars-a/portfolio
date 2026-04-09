import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';
import { PortfolioData } from '../../types';
import ScrambleText from './ScrambleText';
import { HeroDitheringBackground } from '../../components/ui/hero-dithering-card';

interface HeroProps {
  name: string;
  data: PortfolioData['hero'];
}

const Hero: React.FC<HeroProps> = ({ name, data }) => {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 overflow-hidden" style={{ willChange: 'filter', transform: 'translateZ(0)' }}>
      <HeroDitheringBackground />
      <div id="hero-content" className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-mono text-sm md:text-base tracking-wide text-gray-400 mb-4">
          {data.greeting}
        </p>
        <ScrambleText
          text="BAYBARS"
          as="h1"
          dotEffect={false}
          className="text-5xl sm:text-6xl md:text-8xl font-ostro tracking-tighter mb-8 normal-case"
        />
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          {data.description}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-10">
          <a href={data.socials.linkedin} aria-label="LinkedIn" className="text-gray-400 hover:text-accent transition-colors">
            <LinkedInIcon className="w-6 h-6" />
          </a>
          <a href={data.socials.github} aria-label="GitHub" className="text-gray-400 hover:text-accent transition-colors">
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={data.resumeUrl}
            className="bg-accent text-black font-mono text-sm font-bold tracking-widest py-3 px-8 hover:bg-accent/80 transition-colors"
          >
            RESUME
          </a>
          <a
            href={`mailto:${data.email}`}
            className="border border-white text-white font-mono text-sm font-bold tracking-widest py-3 px-8 hover:bg-white hover:text-black transition-colors"
          >
            EMAIL ME
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
