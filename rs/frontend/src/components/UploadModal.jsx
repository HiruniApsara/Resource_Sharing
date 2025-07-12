import { useState, useRef } from 'react';

const subjectsByYear = {
  "1st Year": ["Essential of ICT", "Fundamentals of Computer Programming", "Fundamentals of Web Technology", "English", "Mathematics"],
  "2nd Year": ["Data Structures and Algorithms", "Statistics for Technology", "Advanced Computer Programming", "Multimedia Design and Technologies", "Human Computer Interaction", "Fundamentals of Web Technology", "Computer Networks", "Database Management Systems", "Computer Graphics", "System Analysis and Design", "Accounting for Technology"],
  "3rd Year": ["Computer Architecture and Organization", "Advanced Database Management Systems", "Advanced Web Technologies", "Social and Professional Issues in IT", "Software Engineering", "Information Security"],
};

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/jpeg', 'image/png', 'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
  const maxSize = 25 * 1024 * 1024; // 25MB

  const validateFiles = (files) => {
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError(`Unsupported file type: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (validateFiles(files)) setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (validateFiles(files)) setSelectedFiles([...selectedFiles, ...files]);
  };
const handleSubmit = async () => {
  if (!title || !year || !subject || !resourceType || selectedFiles.length === 0) {
    setError('Please fill in all fields and select at least one file');
    return;
  }

  const formData = new FormData();
  selectedFiles.forEach(file => formData.append('files', file));
  formData.append('title', title);
  formData.append('description', description);
  formData.append('year', year);
  formData.append('subject', subject);
  formData.append('resourceType', resourceType);

  // Retrieve username from local storage
  const username = localStorage.getItem('username');
  if (username) {
    formData.append('username', username);
  } else {
    setError('Username is required');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/api/resources/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result);
    onUpload(); // Call the onUpload callback to refresh the resources
  } catch (error) {
    console.error('Error uploading files:', error);
    setError('Failed to upload resources');
  }

  // Reset and close
  setSelectedFiles([]);
  setTitle('');
  setDescription('');
  setYear('');
  setSubject('');
  setResourceType('');
  setError('');
  onClose();
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}>
        <h2 className="text-xl font-bold">Upload Resource</h2>

        {/* Form Inputs */}
        <div className="space-y-3">
          <input type="text" className="w-full border px-3 py-2 rounded text-sm" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="w-full border px-3 py-2 rounded text-sm" placeholder="Description (optional)" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />

          {/* Year Dropdown */}
          <select className="w-full border px-3 py-2 rounded text-sm" value={year} onChange={(e) => { setYear(e.target.value); setSubject(''); }}>
            <option value="">Select Year</option>
            {Object.keys(subjectsByYear).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Subject Dropdown */}
          <select className="w-full border px-3 py-2 rounded text-sm" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={!year}>
            <option value="">Select Subject</option>
            {year && subjectsByYear[year].map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>

          {/* Resource Type */}
          <select className="w-full border px-3 py-2 rounded text-sm" value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
            <option value="">Select Resource Type</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
          </select>
        </div>

        {/* File Upload */}
        <div className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onClick={() => fileInputRef.current.click()}>
          <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mov,.avi,.mkv" multiple />
          <p className="text-sm text-gray-600">
            {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Click or drag files here to upload'}
          </p>
        </div>

        {/* Selected files list */}
        {selectedFiles.length > 0 && (
          <ul className="text-sm text-gray-700 max-h-24 overflow-y-auto">
            {selectedFiles.map((file, idx) => (
              <li key={idx} className="flex justify-between items-center">
                {file.name} ({Math.round(file.size / 1024)} KB)
                <button className="text-red-500 ml-2" onClick={() => {
                  const files = [...selectedFiles];
                  files.splice(idx, 1);
                  setSelectedFiles(files);
                }}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Error message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-[#2094F3] text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;