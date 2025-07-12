import React, { useState, useEffect, useRef } from 'react';
import fm from 'front-matter';

// Import your new components
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import Research from './components/Research';
import PublicationModal from './components/PublicationModal';
import Blog from './components/Blog';
import BlogModal from './components/BlogModal';
import Footer from './components/Footer';

// Firebase imports remain the same
import { auth } from './firebaseConfig';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const App = () => {
    // State to hold content fetched from markdown files
    const [aboutMeContent, setAboutMeContent] = useState('');
    const [publications, setPublications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);

    const [userId, setUserId] = useState(null);
    const sectionRefs = {
        'about-me': useRef(null),
        'research': useRef(null),
        'blog': useRef(null),
    };
    const [selectedPub, setSelectedPub] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    // New state to manage the publication toggle
    const [showAllPubs, setShowAllPubs] = useState(false);

    // --- Data Fetching useEffect ---
    useEffect(() => {
        // Fetch About Me content
        fetch('/content/about-me.md')
            .then(res => res.text())
            .then(text => setAboutMeContent(text));

        // Helper function to fetch and parse a collection of markdown files
        const fetchCollection = async (fileNames, directory) => {
            const files = await Promise.all(
                fileNames.map(file => fetch(`/content/${directory}/${file}`).then(res => res.text()))
            );
            return files.map(file => {
                const { attributes, body } = fm(file); // Use fm() and get attributes/body
                const data = attributes; // Keep your variable name 'data' if you wish

                data.fullContent = body

                // Assign body content to the correct key
                if (directory === 'publications') data.abstract = body;
                if (directory === 'projects') data.description = body;
                // if (directory === 'blog') data.snippet = body;
                return data;
            });
        };

        // Fetch all collections (no change here)
        fetchCollection(['astra.md', 'viveka-poster.md', 'spaarc-kurt.md', 'l3dp.md', 'armada.md', 'haccs.md', 'armada-impl.md', 'accelerate.md', 'vision.md'], 'publications').then(setPublications);
        fetchCollection(['project1.md', 'project2.md'], 'projects').then(setProjects);
        fetchCollection(['rust.md'], 'blog').then(setBlogPosts);

    }, []);

    // --- Authentication useEffect ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                console.log("Firebase User ID:", user.uid);
            } else {
                try {
                    await signInAnonymously(auth);
                    console.log("Signed in anonymously.");
                } catch (error) {
                    console.error("Firebase anonymous authentication error:", error);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    // --- Scroll-spy and Smooth Scrolling Effect (no changes needed) ---
    useEffect(() => {
        const handleScroll = () => {
            let currentActive = '';
            const scrollY = window.pageYOffset;
            for (const sectionId in sectionRefs) {
                const section = sectionRefs[sectionId].current;
                if (section && scrollY >= section.offsetTop - window.innerHeight / 3) {
                    currentActive = sectionId;
                }
            }
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('bg-blue-700');
                if (link.getAttribute('href') === `#${currentActive}`) {
                    link.classList.add('bg-blue-700');
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
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
        <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            <Navbar scrollToSection={scrollToSection} />
            
            <main className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
                <div ref={sectionRefs['about-me']}>
                    <AboutMe content={aboutMeContent} />
                </div>
                <div ref={sectionRefs['research']}>
                    <Research 
                        publications={publications}
                        projects={projects}
                        onPublicationSelect={setSelectedPub} 
                        showAllPubs={showAllPubs}
                        setShowAllPubs={setShowAllPubs}
                    />
                </div>
                <div ref={sectionRefs['blog']}>
                    <Blog 
                        posts={blogPosts} 
                        onPostSelect={setSelectedPost} // <-- Pass the setter function
                    />
                </div>
            </main>

            <Footer />
            
            {/* Render the modal conditionally. It will only appear when selectedPub is not null. */}
            <PublicationModal 
                publication={selectedPub} 
                onClose={() => setSelectedPub(null)} 
            />
            <BlogModal 
                post={selectedPost} 
                onClose={() => setSelectedPost(null)} 
            />
        </div>
    );
};

export default App;