import React from 'react';
import { projects } from '../data/projects.js';

const Research = ({ publications, onPublicationSelect, showAllPubs, setShowAllPubs }) => {
    const displayedPubs = showAllPubs ? publications : publications.slice(0, 6);

    return (
        <section id="research" className="py-12">
            <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">Research</h1>

            {/* Publications Subsection */}
            <h2 className="text-3xl font-semibold text-blue-600 mb-4 mt-8">Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedPubs.map((pub, index) => (
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

            {/* "See more" / "See less" Toggle Button */}
            {/* This only appears if there are more than 6 publications */}
            {publications.length > 6 && (
                <div className="mt-8 text-center">
                <button
                    onClick={() => setShowAllPubs(!showAllPubs)}
                    className="text-blue-600 hover:underline font-semibold text-lg"
                >
                    {showAllPubs ? 'See less' : 'See more'}
                </button>
                </div>
            )}

            {/* Projects Subsection */}
            <h2 className="text-3xl font-semibold text-blue-600 mb-4 mt-8">
                Relevant Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <p className="text-sm text-gray-500">{proj.years}</p>
                        <h3 className="text-xl font-semibold text-blue-700 mb-2">{proj.title}</h3>
                        <p className="text-gray-700 mb-3 flex-grow">{proj.description}</p>
                        <p className="text-blue-500 text-sm font-medium self-start mt-2">
                            <strong>Technologies:</strong> {proj.tech}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Research;