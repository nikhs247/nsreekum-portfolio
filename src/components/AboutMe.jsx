// src/components/AboutMe.jsx
import React from 'react';

const AboutMe = () => (
    <section id="about-me" className="py-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">About Me</h1>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* We are using the summary from your resume here */}
            <p className="text-xl leading-relaxed text-gray-700">
                I build the foundational systems that make advanced applications practical and efficient. 
                With a decade of experience in both research and industry, I specialize in solving 
                complex data management and resource optimization challenges for distributed, 
                low-latency environments.
            </p>
            <p className="text-xl leading-relaxed text-gray-700 mt-4">
                My expertise lies in using C++, Go, and Python to create robust infrastructure 
                that bridges the gap between innovative ideas and real-world performance.
            </p>
        </div>
    </section>
);

export default AboutMe;