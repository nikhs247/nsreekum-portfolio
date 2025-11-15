// src/components/Skills.jsx

import React from 'react';
import { skills } from '../data/skills.js'; // Import the new data

const Skills = () => (
  <section id="skills" className="py-12">
    <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
      Technical Skills
    </h1>
    
    {/* Grid container for the skill categories */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {skills.map((skillCategory, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            {skillCategory.category}
          </h3>
          
          {/* Flex container for the pills/tags */}
          <div className="flex flex-wrap gap-2">
            {skillCategory.items.map((item, i) => (
              <span 
                key={i} 
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

    </div>
  </section>
);

export default Skills;