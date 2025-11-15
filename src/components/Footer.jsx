// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
    <footer className="bg-gray-800 text-white p-6 text-center">
        <div className="container mx-auto px-4 py-2">
            {/* Add a flex container for links */}
            <div className="flex justify-center space-x-6 mb-4">
                <a 
                    href="mailto:nikhs247@gmail.com" 
                    className="text-gray-300 hover:text-white transition-colors"
                >
                    Email
                </a>
                <a 
                    href="https://linkedin.com/in/sreekumarnikhil" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-white transition-colors"
                >
                    LinkedIn
                </a>
                {/* You can also link to your GitHub here */}
            </div>
            <p className="text-sm">&copy; 2025 Nikhil Sreekumar. All rights reserved.</p>
            <p className="text-sm">Built with ❤️ and React & Tailwind CSS</p>
        </div>
    </footer>
);

export default Footer;