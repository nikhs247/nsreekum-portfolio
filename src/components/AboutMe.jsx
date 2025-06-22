const AboutMe = ({ content }) => (
    <section id="about-me" className="py-12" >
        <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">About Me</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Content rendered from Markdown */}
            <div dangerouslySetInnerHTML={renderMarkdown(content)} />
        </div>
    </section>
);