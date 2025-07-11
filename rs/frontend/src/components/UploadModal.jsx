// components/UploadModal.jsx
import { useState, useRef } from 'react';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/jpeg',
    'image/png',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska'
  ];

  const maxSize = 25 * 1024 * 1024; // 25MB in bytes

  const validateFiles = (files) => {
    for (let file of files) {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        setError(`Unsupported file type: ${file.name}. Supported formats: PDF, DOC/DOCX, PPT/PPTX, JPG/PNG, MP4/MOV/AVI/MKV`);
        return false;
      }
      
      // Check file size
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Maximum size is 25MB`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (validateFiles(files)) {
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (validateFiles(files)) {
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file');
      return;
    }
    onUpload(selectedFiles);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h2 className="text-xl font-bold mb-4">Upload New Resource</h2>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onClick={handleUploadClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mov,.avi,.mkv"
          />
          <p className="text-gray-600 mb-2">
            {selectedFiles.length > 0 
              ? `${selectedFiles.length} file(s) selected`
              : "Drag and drop files here, or click to browse"}
          </p>
          <p className="text-sm text-gray-500">
            Supports PDF, DOC/DOCX, PPT/PPTX, JPG/PNG, MP4/MOV/AVI/MKV (Max 25MB)
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <ul className="max-h-40 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center text-sm text-gray-600 py-1">
                  <span>
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </span>
                  <button 
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0}
            className={`px-4 py-2 rounded-md text-white ${selectedFiles.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2094F3] hover:bg-[#1b7cd0]'}`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;