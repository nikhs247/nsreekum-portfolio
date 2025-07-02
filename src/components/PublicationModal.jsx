import React from 'react';
import ReactMarkdown from 'react-markdown';

const PublicationModal = ({ publication, onClose }) => {
    if (!publication) return null;

    // This function stops the click from propagating to the backdrop and closing the modal.
    const handleCardClick = (e) => e.stopPropagation();

    return (
        // Backdrop: blurs and darkens the background
        <div 
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose} // Closes the modal when the backdrop is clicked
        >
            {/* Modal Card */}
            <div 
                className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all"
                onClick={handleCardClick} // Prevent clicks inside the card from closing the modal
            >
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{publication.title}</h3>
                <p className="text-gray-600 text-base mb-1"><strong>Authors:</strong> {publication.authors}</p>
                <p className="text-gray-600 text-base mb-4"><strong>Venue:</strong> {publication.venue}</p>
                
                <div className="prose prose-lg text-gray-700 max-w-none mb-6">
                    <ReactMarkdown>{publication.abstract}</ReactMarkdown>
                </div>
                
                <a 
                    href={publication.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline font-semibold"
                >
                    Read More &rarr;
                </a>
            </div>
        </div>
    );
};

export default PublicationModal;