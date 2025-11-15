// src/components/Navbar.jsx

import React, { useState } from 'react';

const Navbar = ({ scrollToSection }) => {
  // State to manage whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-4xl flex justify-between items-center">
        {/* Website Title/Logo */}
        <a 
          href="#about-me" 
          onClick={() => {
            scrollToSection('about-me');
            setIsMenuOpen(false); // Close menu on navigation
          }} 
          className="text-white text-2xl font-bold rounded-lg p-2 hover:bg-blue-700 transition-colors duration-200"
        >
          My Website
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <a href="#about-me" onClick={() => scrollToSection('about-me')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">About Me</a>
          <a href="#experience" onClick={() => scrollToSection('experience')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">Experience</a>
          <a href="#research" onClick={() => scrollToSection('research')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">Research</a>
          {/* <a href="#blog" onClick={() => scrollToSection('blog')} className="nav-link text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200">Blog</a> */}
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none p-2 rounded-lg hover:bg-blue-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          
          <a 
            href="#about-me" 
            onClick={() => {
              scrollToSection('about-me');
              setIsMenuOpen(false);
            }} 
            className="block text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            About Me
          </a>
          
          <a 
            href="#experience" 
            onClick={() => {
              scrollToSection('experience');
              setIsMenuOpen(false);
            }} 
            className="block text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Experience
          </a>
          
          <a 
            href="#research" 
            onClick={() => {
              scrollToSection('research');
              setIsMenuOpen(false);
            }} 
            className="block text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Research
          </a>
          {/* <a 
            href="#blog" 
            onClick={() => {
              scrollToSection('blog');
              setIsMenuOpen(false);
            }} 
            className="block text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Blog
          </a> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;