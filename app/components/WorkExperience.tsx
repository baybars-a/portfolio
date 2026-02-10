import React from 'react';
import { WorkExperience as WorkExperienceType } from '../../types';

interface WorkExperienceProps {
  data: WorkExperienceType[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => {
  return (
    <section id="work-experience" className="py-16 md:py-24">
      <div className="bg-black/20 backdrop-blur-md p-8 md:p-16 rounded-lg border border-white/10 text-white">
        <h2 className="text-2xl md:text-3xl font-mono font-bold tracking-widest uppercase mb-8">
          Experience
        </h2>
        <hr className="border-white/20 mb-12" />

        <div className="space-y-8">
          {data.map((exp, index) => (
            <div key={index} className="border-l-2 border-white/30 pl-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                <span className="text-gray-400 text-sm md:text-base">{exp.period}</span>
              </div>
              <p className="text-gray-300 mb-3">
                {exp.company} &bull; {exp.location}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
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
