import React from 'react';
import ReactMarkdown from 'react-markdown';

const Research = ({ publications, projects, onPublicationSelect }) => (
    <section id="research" className="py-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">Research</h1>

        {/* Publications Subsection */}
        <h2 className="text-3xl font-semibold text-blue-600 mb-4 mt-8">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
                // Add onClick handler and cursor-pointer for interaction
                <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => onPublicationSelect(pub)}
                >
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{pub.title}</h3>
                    <p className="text-gray-600 text-sm mb-2"><strong>Authors:</strong> {pub.authors}</p>
                    <p className="text-gray-600 text-sm"><strong>Venue:</strong> {pub.venue}</p>
                    {/* Abstract and Read More link are removed from here */}
                </div>
            ))}
        </div>

        {/* Projects Subsection */}
        <h2 className="text-3xl font-semibold text-blue-600 mb-4 mt-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{proj.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Technologies: {proj.technologies}</p>
                    <div className="prose prose-sm text-gray-700 mb-3">
                        <ReactMarkdown>{proj.description}</ReactMarkdown>
                    </div>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">{proj.linkText} &rarr;</a>
                </div>
            ))}
        </div>
    </section>
);

export default Research;