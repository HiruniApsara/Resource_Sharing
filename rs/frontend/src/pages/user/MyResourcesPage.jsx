import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";

import TopBar from '../../components/TopBar';
import PreviewPage from '../../components/PreviewPage';
import { FaCloudUploadAlt, FaDownload, FaRegCommentDots, FaHeart } from 'react-icons/fa';
import UploadModal from '../../components/UploadModal';

const MyResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [likedResources, setLikedResources] = useState({});
  const [commentBoxes, setCommentBoxes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleLike = (resourceId) => {
    setLikedResources((prev) => ({
      ...prev,
      [resourceId]: !prev[resourceId],
    }));
  };

  const handlePreview = (resource) => {
    window.history.pushState(resource, '', '/previewpage');
    setSelectedResource(resource);
  };

  const closePreview = () => {
    window.history.back();
    setSelectedResource(null);
  };

  const toggleCommentBox = (resourceId) => {
    setCommentBoxes((prev) => ({
      ...prev,
      [resourceId]: !prev[resourceId],
    }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = (resourceId) => {
    if (newComment.trim()) {
      setComments((prev) => ({
        ...prev,
        [resourceId]: [...(prev[resourceId] || []), { id: Date.now(), text: newComment, timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' }) }],
      }));
      setNewComment(''); // Clear input after adding
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      uploadFile(file); // Trigger upload
      event.target.value = null; // Reset input
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Mock API call (replace with actual endpoint, e.g., fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData }))
      console.log('Uploading file:', file.name);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Successfully uploaded ${file.name}`);
      setSelectedFile(null); // Clear selected file after upload
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-[#F7F8FB] p-6">
        <TopBar />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">My Resources</h1>
          <button
            className="bg-[#2094F3] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center gap-2 text-sm"
            onClick={handleFileUploadClick}
          >
            <FaCloudUploadAlt /> Upload Resource
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.mp4,.mov,.avi"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resource Card 1 (Hiruni Apsara) */}
          <div className="bg-white p-4 rounded-lg shadow relative">
            <div className="absolute top-4 right-4">
              <FaDownload className="text-gray-500 hover:text-[#2094F3] cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <img src="https://via.placeholder.com/32" alt="avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Hiruni Apsara shared Study materials</p>
                <p className="text-xs text-gray-500">Thursday, 10 July 2025 11:00 PM</p>
              </div>
            </div>
            <p className="text-sm text-gray-800 mb-2 font-medium">What is Python?</p>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">Python is a versatile and easy-to-learn language that lets you work quickly and integrate systems more effectively.</p>
            <div className="flex items-center justify-between">
              <FaHeart
                className={`cursor-pointer ${likedResources['myResource1'] ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                onClick={() => handleLike('myResource1')}
              />
              <div className="flex gap-4 text-gray-500 text-sm">
                <button
                  className="flex items-center gap-1 hover:text-[#2094F3]"
                  onClick={() => toggleCommentBox('myResource1')}
                >
                  <FaRegCommentDots /> Discuss
                </button>
                <button className="hover:text-[#2094F3]" onClick={() => handlePreview({
                  author: "Hiruni Apsara",
                  title: "What is Python?",
                  content: "Python is a versatile and easy-to-learn language that lets you work quickly and integrate systems more effectively.",
                  date: "Thursday, 10 July 2025 11:00 PM"
                })}>
                  Preview
                </button>
              </div>
            </div>
            {commentBoxes['myResource1'] && (
              <div className="mt-2">
                <div className="flex gap-2 mb-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment..."
                    className="border px-2 py-1 rounded text-sm w-full"
                  />
                  <button
                    className="bg-[#2094F3] text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                    onClick={() => addComment('myResource1')}
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-16 overflow-y-auto text-sm">
                  {comments['myResource1']?.map((comment) => (
                    <div key={comment.id} className="text-gray-700 mb-1">
                      {comment.text} <span className="text-xs text-gray-500">({comment.timestamp})</span>
                    </div>
                  )) || <p className="text-gray-500">No comments yet.</p>}
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedResource && <PreviewPage resource={selectedResource} onClose={closePreview} />}
      </main>
    </div>
  );
};

export default MyResourcesPage;