'use client';

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import About from './components/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import MouseSpotlight from './components/MouseSpotlight';
import { initialData } from '../constants/constants';

const noop = () => {};

const Home: React.FC = () => {
  const { header, name, hero, projects, workExperience, about, experience, footer } = initialData;

  return (
    <div className="bg-black">
      <MouseSpotlight />
      <Header data={header} />
      <main>

        {/* Anchor placed OUTSIDE the sticky wrapper so the browser can
            calculate its true document offset (sticky elements always report
            top:0 while pinned, breaking in-page anchor navigation). */}

        {/* Layer 1 — Hero */}
        <div id="home" />
        <div className="relative z-10 min-h-screen">
          <Hero name={name} data={hero} />
        </div>

        {/* Layer 2 — Projects (not sticky so all cards remain scrollable) */}
        <div id="projects" />
        <div className="relative z-20 bg-neutral-950 rounded-t-3xl stack-card">
          <Projects data={projects} isEditMode={false} onUpdate={noop} onAdd={noop} onRemove={noop} />
        </div>

        {/* Layer 3 — Work Experience */}
        <div id="work-experience" className="scroll-mt-16" />
        <div className="sticky top-0 z-30 min-h-screen bg-neutral-900 rounded-t-3xl overflow-hidden stack-card">
          <WorkExperience data={workExperience} />
        </div>

        {/* Layer 4 — About */}
        <div id="about" className="scroll-mt-16" />
        <div className="sticky top-0 z-40 min-h-screen bg-neutral-950 rounded-t-3xl overflow-hidden stack-card">
          <About data={about} isEditMode={false} onUpdate={noop} />
        </div>

        {/* Layer 5 — Certifications */}
        <div id="experience" className="scroll-mt-16" />
        <div className="sticky top-0 z-50 min-h-screen bg-[#0a0e27] rounded-t-3xl overflow-hidden stack-card">
          <Experience data={experience} isEditMode={false} onUpdate={noop} />
        </div>

      </main>
      <Footer data={footer} isEditMode={false} onUpdate={noop} />
    </div>
  );
};

export default Home;
