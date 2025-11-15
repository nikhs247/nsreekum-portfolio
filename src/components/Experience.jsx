// src/components/Experience.jsx

import React from 'react';
// Import the new data
import { education, work } from '../data/experience.js';

const Experience = () => (
  <section id="experience" className="py-12">
    {/* Section Title */}
    <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
      Experience & Education
    </h1>

    <div className="flex flex-col md:flex-row gap-16">
      {/* Column 1: Work Experience */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Work Experience</h2>
        <div className="relative border-l-2 border-blue-200 pl-6 space-y-8">
          {/* Map over the work array */}
          {work.map((job, index) => (
            <div key={index} className="relative">
              {/* The timeline dot */}
              <div className="absolute -left-7 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
              
              <p className="text-sm text-gray-500">{job.years}</p>
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <p className="text-lg font-semibold text-gray-700">{job.company}</p>
              
              {/* Render details if they exist */}
              {job.details && (
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  {job.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Education */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Education</h2>
        <div className="space-y-6">
          {/* Map over the education array */}
          {education.map((edu, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm text-gray-500">{edu.years}</p>
              <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
              <p className="text-lg font-semibold text-gray-700">{edu.institution}</p>
              {edu.details && (
                <p className="mt-2 text-gray-600">{edu.details}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;