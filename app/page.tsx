'use client';

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import About from './components/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import { initialData } from '../constants/constants';

const noop = () => {};

const Home: React.FC = () => {
  const { header, name, hero, projects, workExperience, about, experience, footer } = initialData;

  return (
    <div className="min-h-screen pt-14">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 bg-gray-900/50 backdrop-blur-sm">
        <Header data={header} />
        <main>
          <Hero name={name} data={hero} />
          <Projects data={projects} isEditMode={false} onUpdate={noop} onAdd={noop} onRemove={noop} />
          <WorkExperience data={workExperience} />
          <About data={about} isEditMode={false} onUpdate={noop} />
          <Experience data={experience} isEditMode={false} onUpdate={noop} />
        </main>
        <Footer data={footer} isEditMode={false} onUpdate={noop} />
      </div>
    </div>
  );
};

export default Home;