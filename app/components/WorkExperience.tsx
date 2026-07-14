import React from 'react';
import { WorkExperience as WorkExperienceType } from '../../types';
import ScrambleText from './ScrambleText';

interface WorkExperienceProps {
  data: WorkExperienceType[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => {
  return (
    <section
      id="work-experience"
      className="relative overflow-hidden py-20 md:py-32 bg-[#0a0503]"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrambleText
          text="Experience"
          as="h2"
          className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-white mb-16"
        />
        <hr className="border-white/20 mb-12" />

        <div>
          {data.map((exp, index) => (
            <div
              key={index}
              className={`work-exp-entry py-10 ${index > 0 ? 'border-t border-white/10' : ''}`}
            >
              <div className="flex gap-6 md:gap-10 items-start">
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                    <span className="text-white/60 text-sm font-mono mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-white/80 mb-4 font-medium">
                    {exp.company} &bull; {exp.location}
                  </p>
                  <ul className="list-disc list-inside space-y-4 text-white/70 text-base leading-relaxed">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
