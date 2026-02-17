import React from 'react';
import { Certification } from '../../types';

interface CertificationsProps {
  data: Certification[];
  isEditMode: boolean;
  onUpdate: (path: string, value: any) => void;
  onAdd: (path: string, newItem: any) => void;
  onRemove: (path: string, index: number) => void;
}


const Certifications: React.FC<CertificationsProps> = ({ data, isEditMode, onUpdate, onAdd, onRemove }) => {
    const handleAddCertification = () => {
      onAdd('certifications', { name: 'New Certification', issuer: 'Issuer' });
    };

    return (
        <section className="py-16 md:py-24 rounded-lg">
            <div className="px-6 md:px-12">
                <div className="flex justify-between items-center mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white flex-1">
                    </h2>
                    {isEditMode && (
                      <button onClick={handleAddCertification} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        Add
                      </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((cert, index) => (
                        <div key={index} className={`bg-black/20 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-white/20 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative ${isEditMode ? 'ring-1 ring-yellow-400' : ''}`}>
                             {isEditMode && (
                                <button onClick={() => onRemove('certifications', index)} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 text-xs rounded-full hover:bg-red-600">
                                &times;
                                </button>
                            )}
                            <h3 
                                className={`font-bold text-white text-lg mb-1 ${isEditMode ? 'outline-dashed outline-1 outline-yellow-400 p-1' : ''}`}
                                contentEditable={isEditMode}
                                suppressContentEditableWarning
                                onBlur={(e) => onUpdate(`certifications.${index}.name`, e.currentTarget.textContent || '')}
                            >{cert.name}</h3>
                            <p 
                                className={`text-gray-300 text-sm ${isEditMode ? 'outline-dashed outline-1 outline-yellow-400 p-1' : ''}`}
                                contentEditable={isEditMode}
                                suppressContentEditableWarning
                                onBlur={(e) => onUpdate(`certifications.${index}.issuer`, e.currentTarget.textContent || '')}
                            >{cert.issuer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certifications;