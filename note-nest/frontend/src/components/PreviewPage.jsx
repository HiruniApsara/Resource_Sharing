import React from 'react';

const PreviewPage = ({ resource, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Preview: {resource.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2"><strong>Author:</strong> {resource.author}</p>
          <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {resource.date}</p>
          <p className="text-gray-800 mb-4">{resource.content}</p>
          <button
            className="bg-[#2094F3] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;