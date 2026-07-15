'use client';

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import About from './components/About';
import PortfolioHeroWithPaperShaders from '../components/ui/portfolio-hero-with-paper-shaders';
import { initialData } from '../constants/constants';
import FlowArt, { FlowSection } from '../components/ui/story-scroll';

const noop = () => {};

const Home: React.FC = () => {
  const { header, name, hero, projects, workExperience, about } = initialData;

  return (
    <div className="min-h-screen">
      <Header data={header} />
      <FlowArt aria-label="Portfolio">
        <FlowSection bare aria-label="Hero" style={{ backgroundColor: '#000000' }}>
          <Hero name={name} data={hero} />
        </FlowSection>
        <FlowSection bare aria-label="Projects" style={{ backgroundColor: '#0a0a0a' }}>
          <Projects data={projects} isEditMode={false} onUpdate={noop} onAdd={noop} onRemove={noop} />
        </FlowSection>
        <FlowSection bare aria-label="Work Experience" style={{ backgroundColor: '#0a0503' }}>
          <WorkExperience data={workExperience} />
        </FlowSection>
        <FlowSection bare aria-label="About" style={{ backgroundColor: '#0a0a0a' }}>
          <About data={about} isEditMode={false} onUpdate={noop} />
        </FlowSection>
        <FlowSection bare aria-label="Contact" style={{ backgroundColor: '#2d1507' }}>
          <PortfolioHeroWithPaperShaders />
        </FlowSection>
      </FlowArt>
    </div>
  );
};

export default Home;
