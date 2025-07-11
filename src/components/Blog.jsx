// src/components/Blog.jsx

import React from 'react';
import ReactMarkdown from 'react-markdown';

const Blog = ({ posts, onPostSelect }) => (
    <section id="blog" className="py-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Date: {post.date}</p>
                    <div className="prose prose-sm text-gray-700 mb-3 flex-grow">
                        <ReactMarkdown>{post.snippet}</ReactMarkdown>
                    </div>
                    {/* Change the link to a button that triggers the modal */}
                    <button 
                        onClick={() => onPostSelect(post)} 
                        className="text-blue-500 hover:underline text-sm font-medium self-start mt-2"
                    >
                        Read More &rarr;
                    </button>
                </div>
            ))}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <p className="text-lg leading-relaxed text-center">
                More blog posts coming soon! Stay tuned for insights on AI, web development, and more.
            </p>
        </div>
    </section>
);

export default Blog;