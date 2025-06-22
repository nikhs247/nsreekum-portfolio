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