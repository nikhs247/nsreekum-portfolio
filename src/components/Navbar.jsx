import React from 'react';

const Navbar = ({ scrollToSection }) => (
    <nav className="bg-blue-800 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 max-w-4xl flex justify-between items-center">
            <a href="#about-me" onClick={() => scrollToSection('about-me')} className="text-white text-2xl font-bold rounded-lg p-2 hover:bg-blue-700 transition-colors duration-200">My Website</a>
            <div className="space-x-4">
                <a href="#about-me" onClick={() => scrollToSection('about-me')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">About Me</a>
                <a href="#research" onClick={() => scrollToSection('research')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">Research</a>
                <a href="#blog" onClick={() => scrollToSection('blog')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">Blog</a>
            </div>
        </div>
    </nav>
);

export default Navbar;