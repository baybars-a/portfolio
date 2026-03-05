import React from 'react';
import { WorkExperience as WorkExperienceType } from '../../types';
import ScrambleText from './ScrambleText';

interface WorkExperienceProps {
  data: WorkExperienceType[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => {
  return (
    <section id="work-experience" className="py-20 md:py-32 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <ScrambleText
          text="Experience"
          as="h2"
          className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-white mb-16"
        />
        <hr className="border-white/10 mb-12" />

        <div className="space-y-12">
          {data.map((exp, index) => (
            <div key={index} className="border-l-2 border-accent pl-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                <span className="text-gray-500 text-sm font-mono">{exp.period}</span>
              </div>
              <p className="text-gray-400 mb-4 font-medium">
                {exp.company} &bull; {exp.location}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
