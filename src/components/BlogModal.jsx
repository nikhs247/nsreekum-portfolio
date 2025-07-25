import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const BlogModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    // Backdrop with blur effect
    <div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{post.title}</h2>
        <p className="text-gray-500 text-sm mb-6">Date: {post.date}</p>

        {/* Scrollable Content Area */}
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.fullContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;