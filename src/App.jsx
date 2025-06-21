import React, { useState, useEffect, useRef } from 'react';

import {signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';


// --- Helper Function for Basic Markdown Rendering ---
// In a real application, you'd use a robust library like 'marked' or 'react-markdown'.
const renderMarkdown = (markdownText) => {
    if (!markdownText) return { __html: '' };

    // Basic paragraph separation and HTML tagging
    let html = markdownText.split('\n\n').map(paragraph => {
        // Basic bolding: **text**
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Basic italics: *text*
        paragraph = paragraph.replace(/\*(.*?)\*/g, '<em>$1</em>');
        return `<p class="mb-2 leading-relaxed">${paragraph}</p>`;
    }).join('');

    return { __html: html };
};

// --- ABOUT ME COMPONENT ---
// This would typically be in a file like 'AboutMe.jsx'
const AboutMe = ({ content }) => (
    <section id="about-me" className="py-12" >
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">About Me</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Content rendered from Markdown */}
            <div dangerouslySetInnerHTML={renderMarkdown(content)} />
        </div>
    </section>
);

// --- RESEARCH COMPONENT ---
// This would typically be in a file like 'Research.jsx'
const Research = ({ publications, projects }) => (
    <section id="research" className="py-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">Research</h1>

        {/* Publications Subsection */}
        <h2 className="text-3xl font-semibold text-blue-600 mb-4 mt-8">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{pub.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Authors: {pub.authors}</p>
                    {/* Abstract rendered from Markdown */}
                    <div className="text-gray-700 text-base mb-3" dangerouslySetInnerHTML={renderMarkdown(pub.abstract)} />
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">Read More &rarr;</a>
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
                    {/* Description rendered from Markdown */}
                    <div className="text-gray-700 text-base mb-3" dangerouslySetInnerHTML={renderMarkdown(proj.description)} />
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">{proj.linkText} &rarr;</a>
                </div>
            ))}
        </div>
    </section>
);

// --- BLOG COMPONENT ---
// This would typically be in a file like 'Blog.jsx'
const Blog = ({ posts }) => (
    <section id="blog" className="py-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Date: {post.date}</p>
                    {/* Snippet rendered from Markdown */}
                    <div className="text-gray-700 text-base mb-3" dangerouslySetInnerHTML={renderMarkdown(post.snippet)} />
                    <a href={post.link} className="text-blue-500 hover:underline text-sm font-medium">Read More &rarr;</a>
                </div>
            ))}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <p className="text-lg leading-relaxed text-center">
                More blog posts coming soon! Stay tuned for insights on [topics you plan to cover].
            </p>
        </div>
    </section>
);

// --- MAIN APP COMPONENT ---
// This would typically be in a file like 'App.jsx' or 'index.js'
const App = () => {
    const [userId, setUserId] = useState(null);
    const sectionRefs = {
        'about-me': useRef(null),
        'research': useRef(null),
        'blog': useRef(null),
    };

    // Simulated Markdown Content (in a real app, these would be fetched from .md files)
    const aboutMeContent = `
Hello! I'm **[Your Name]**, a passionate researcher/developer/writer with a keen interest in *[Your Field/Interests]*.
My work focuses on [briefly describe your main area of focus, e.g., developing innovative solutions in AI, exploring new frontiers in renewable energy, crafting compelling narratives].

I believe in the power of *[e.g., interdisciplinary collaboration, open-source initiatives, continuous learning]*
to drive progress and create meaningful impact. Outside of my professional pursuits, I enjoy [mention a hobby or two, e.g., hiking, reading, photography, coding side projects].
Feel free to explore my research, projects, and blog posts!
    `;

    const publicationsData = [
        {
            title: "Title of Publication One",
            authors: "A. Author, B. Author, C. Author",
            abstract: `
This paper explores the innovative approaches to **[topic 1]** and presents novel findings on *[result 1]*.
It discusses the implications for [application area].
            `,
            link: "https://example.com/publication1"
        },
        {
            title: "Another Groundbreaking Research Paper",
            authors: "D. Researcher, E. Collaborator",
            abstract: `
Investigating the impact of **[variable A]** on *[outcome B]*, this study provides empirical evidence
supporting [hypothesis]. Future work includes [next steps].
            `,
            link: "https://example.com/publication2"
        },
        {
            title: "Advances in [Specific Field]",
            authors: "F. Scientist, G. Engineer, H. Specialist",
            abstract: `
This work details the development of a new methodology for **[method]** and its successful
application in *[case study]*. Results demonstrate [key benefit].
            `,
            link: "https://example.com/publication3"
        }
    ];

    const projectsData = [
        {
            title: "Project X: Automated Data Analysis Tool",
            technologies: "Python, Pandas, Matplotlib",
            description: `
Developed a robust Python-based tool to automate the analysis of large datasets,
reducing manual effort by **70%**. Features include data cleaning, statistical analysis, and visualization.
            `,
            link: "https://github.com/your-username/project-x",
            linkText: "View on GitHub"
        },
        {
            title: "Interactive Web Dashboard",
            technologies: "HTML, CSS, JavaScript, D3.js",
            description: `
Designed and implemented an interactive web dashboard for real-time monitoring of IoT devices.
Utilizes *D3.js* for dynamic data visualization and a responsive layout.
            `,
            link: "https://github.com/your-username/web-dashboard",
            linkText: "View on GitHub"
        }
    ];

    const blogPostsData = [
        {
            title: "The Future of AI in [Your Field]",
            date: "June 15, 2025",
            snippet: `
A deep dive into how artificial intelligence is transforming **[your field]**, discussing
current trends and future predictions...
            `,
            link: "#blog-post-1"
        },
        {
            title: "My Journey into [Topic]",
            date: "May 28, 2025",
            snippet: `
Sharing personal experiences and lessons learned while exploring *[specific topic or skill]*...
            `,
            link: "#blog-post-2"
        }
    ];

    // Firebase Auth Effect
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in.
                setUserId(user.uid);
                console.log("Firebase User ID:", user.uid);
            } else {
                // User is signed out. Sign in anonymously if no token, or with token.
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                        console.log("Signed in with custom token.");
                    } else {
                        await signInAnonymously(auth);
                        console.log("Signed in anonymously.");
                    }
                } catch (error) {
                    console.error("Firebase authentication error:", error);
                }
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    // Scroll-spy and Smooth Scrolling Effect
    useEffect(() => {
        const handleScroll = () => {
            let currentActive = '';
            const scrollY = window.pageYOffset;

            for (const sectionId in sectionRefs) {
                const section = sectionRefs[sectionId].current;
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    // Adjust sensitivity (e.g., sectionHeight / 3) for when a section becomes 'active'
                    if (scrollY >= sectionTop - window.innerHeight / 3) {
                        currentActive = sectionId;
                    }
                }
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('bg-blue-700'); // Remove active class background
                if (link.getAttribute('href') === `#${currentActive}`) {
                    link.classList.add('bg-blue-700'); // Add active class background
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger on mount to set initial active link
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionRefs]);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="font-sans bg-gray-50 text-gray-800">
            

            {/* Navigation Bar */}
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

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Each section now uses a ref */}
                <div ref={sectionRefs['about-me']}>
                    <AboutMe content={aboutMeContent} />
                </div>
                <div ref={sectionRefs['research']}>
                    <Research publications={publicationsData} projects={projectsData} />
                </div>
                <div ref={sectionRefs['blog']}>
                    <Blog posts={blogPostsData} />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-6 text-center text-sm">
                <div className="container mx-auto px-4 py-2">
                    <p>&copy; 2025 [Your Name]. All rights reserved.</p>
                    <p>Built with ❤️ and React & Tailwind CSS. App ID: {appId}. User ID: {userId}</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
