import React from 'react';
import ReactMarkdown from 'react-markdown';

const Research = ({ publications, projects }) => (
    <section id="research" className="py-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">Research</h1>

        <h2 className="text-3xl font-semibold text-blue-600 mb-4 mt-8">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{pub.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Authors: {pub.authors}</p>
                    <p className="text-gray-600 text-sm mb-2">Venue: {pub.venue}</p>
                    <div className="prose prose-sm text-gray-700 mb-3">
                         <ReactMarkdown>{pub.abstract}</ReactMarkdown>
                    </div>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">Read More &rarr;</a>
                </div>
            ))}
        </div>

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