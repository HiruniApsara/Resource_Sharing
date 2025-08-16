// src/components/ResourceCard.jsx
import React from 'react';
import { FaRegHeart, FaDownload, FaRegCommentDots } from 'react-icons/fa';

const ResourceCard = ({ author, subject, date, description, content, fileType }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border flex items-start justify-between">
      <div>
        <p className="text-sm font-medium">{author} shared {subject}</p>
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        <p className="text-sm font-semibold">{description}</p>
        <p className="text-sm text-gray-600 mt-1">{content}</p>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <FaRegHeart className="cursor-pointer" />
          <div className="flex items-center gap-1 cursor-pointer">
            <FaRegCommentDots />
            <span>Discuss</span>
          </div>
          <span className="cursor-pointer underline">Preview</span>
        </div>
      </div>

      {/* File icon + download */}
      <div className="flex flex-col items-center justify-between">
        <FaDownload className="text-gray-500 text-lg cursor-pointer mb-2" />
        {fileType === 'pdf' && (
          <img src="/pdf-icon.png" alt="PDF" className="w-12 h-12 object-contain" />
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
