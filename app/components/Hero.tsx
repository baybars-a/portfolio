import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';
import { PortfolioData } from '../../types';
import { HeroDitheringBackground } from '../../components/ui/hero-dithering-card';

// figlet "ANSI Shadow". Rendered in system monospace fonts (Consolas/Menlo)
// rather than Space Mono — the box-drawing glyphs must all come from one
// font or the columns drift out of alignment.
const BAYBARS_ASCII = `██████╗      █████╗     ██╗   ██╗    ██████╗      █████╗     ██████╗     ███████╗
██╔══██╗    ██╔══██╗    ╚██╗ ██╔╝    ██╔══██╗    ██╔══██╗    ██╔══██╗    ██╔════╝
██████╔╝    ███████║     ╚████╔╝     ██████╔╝    ███████║    ██████╔╝    ███████╗
██╔══██╗    ██╔══██║      ╚██╔╝      ██╔══██╗    ██╔══██║    ██╔══██╗    ╚════██║
██████╔╝    ██║  ██║       ██║       ██████╔╝    ██║  ██║    ██║  ██║    ███████║
╚═════╝     ╚═╝  ╚═╝       ╚═╝       ╚═════╝     ╚═╝  ╚═╝    ╚═╝  ╚═╝    ╚══════╝`;

interface HeroProps {
  name: string;
  data: PortfolioData['hero'];
}

const Hero: React.FC<HeroProps> = ({ name, data }) => {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 overflow-hidden">
      <HeroDitheringBackground />
      <div id="hero-content" className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-mono text-sm md:text-base tracking-wide text-[#6dff8c]/80 mb-4">
          {data.greeting}
        </p>
        <h1 aria-label="BAYBARS" className="mb-8 flex justify-center">
          <pre
            aria-hidden="true"
            className="text-accent select-none"
            style={{
              fontFamily:
                'Consolas, Menlo, "DejaVu Sans Mono", "Liberation Mono", monospace',
              fontSize: 'clamp(4.5px, 1.9vw, 15px)',
              lineHeight: 1,
              textShadow:
                '0 0 8px rgba(255, 129, 0, 0.55), 0 0 28px rgba(255, 129, 0, 0.3)',
            }}
          >
            {BAYBARS_ASCII}
          </pre>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          {data.description}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-10">
          <a href={data.socials.linkedin} aria-label="LinkedIn" className="icon-link text-gray-400 hover:text-accent">
            <LinkedInIcon className="w-6 h-6" />
          </a>
          <a href={data.socials.github} aria-label="GitHub" className="icon-link text-gray-400 hover:text-accent">
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={data.resumeUrl}
            className="btn-press bg-accent text-black font-mono text-sm font-bold tracking-widest py-3 px-8 hover:bg-accent/80"
          >
            RESUME
          </a>
          <a
            href={`mailto:${data.email}`}
            className="btn-press border border-white text-white font-mono text-sm font-bold tracking-widest py-3 px-8 hover:bg-white hover:text-black"
          >
            EMAIL ME
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
