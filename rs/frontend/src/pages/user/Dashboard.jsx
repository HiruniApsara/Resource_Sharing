import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";

import TopBar from '../../components/TopBar';
import PreviewPage from '../../components/PreviewPage';
import UploadModal from '../../components/UploadModal';

import { FaCloudUploadAlt, FaDownload, FaRegCommentDots, FaHeart } from 'react-icons/fa';

const subjectsByYear = {
  "1st Year": [
    "Essential of ICT",
    "Fundamentals of Computer Programming",
    "Fundamentals of Web Technology",
    "English",
    "Mathematics",
  ],
  "2nd Year": [
    "Data Structures and Algorithms",
    "Statistics for Technology",
    "Advanced Computer Programming",
    "Multimedia Design and Technologies",
    "Human Computer Interaction",
    "Fundamentals of Web Technology",
    "Computer Networks",
    "Database Management Systems",
    "Computer Graphics",
    "System Analysis and Design",
    "Accounting for Technology",
  ],
  "3rd Year": [
    "Computer Architecture and Organization",
    "Advanced Database Management Systems",
    "Advanced Web Technologies",
    "Social and Professional Issues in IT",
    "Software Engineering",
    "Information Security",
  ],
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [likedResources, setLikedResources] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);
  const [commentBoxes, setCommentBoxes] = useState({}); // Track which resource's comment box is open
  const [comments, setComments] = useState({}); // Store comments per resource ID
  const [newComment, setNewComment] = useState(''); // Input for new comment

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedSubject(''); // Reset subject when year changes
  };

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

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      alert(`Selected file: ${file.name}`); // Temporary feedback; replace with upload logic
      event.target.value = null; // Reset input to allow selecting the same file again
    }
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

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">
        <TopBar />
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

        
    

        {/* Upload & Popular Resources */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Popular Resources</h3>
          <div className="flex justify-end mb-4">
            <button
              className="bg-[#2094F3] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center gap-2"
              onClick={handleFileUploadClick}
            >
              <FaCloudUploadAlt /> Upload Resource
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-3 mb-6">
          {/* Year filter */}
          <select
            className="border px-3 py-2 rounded text-sm"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            {Object.keys(subjectsByYear).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Subject filter (filtered by year) */}
          <select
            className="border px-3 py-2 rounded text-sm"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedYear}
          >
            <option value="">Select Subject</option>
            {selectedYear &&
              subjectsByYear[selectedYear].map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
          </select>

          {/* Resource Type */}
          <select className="border px-3 py-2 rounded text-sm">
            <option>Resource Type</option>
            <option>PDF</option>
            <option>Video</option>
          </select>

          {/* Sort by */}
          <div className="ml-auto">
            <label className="text-sm mr-2">Sort by:</label>
            <select className="border px-3 py-2 rounded text-sm">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* Popular Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resource Card 1 */}
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
            <p className="text-sm text-gray-600 mb-3">Python is a versatile and easy-to-learn language...</p>
            <div className="flex items-center justify-between">
              <FaHeart
                className={`cursor-pointer ${likedResources['resource1'] ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                onClick={() => handleLike('resource1')}
              />
              <div className="flex gap-4 text-gray-500 text-sm">
                <button
                  className="flex items-center gap-1 hover:text-[#2094F3]"
                  onClick={() => toggleCommentBox('resource1')}
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
            {commentBoxes['resource1'] && (
              <div className="mt-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment..."
                    className="border px-3 py-1 rounded w-full"
                  />
                  <button
                    className="bg-[#2094F3] text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => addComment('resource1')}
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {comments['resource1']?.map((comment) => (
                    <div key={comment.id} className="text-sm text-gray-700 mb-1">
                      {comment.text} <span className="text-xs text-gray-500">({comment.timestamp})</span>
                    </div>
                  )) || <p className="text-sm text-gray-500">No comments yet.</p>}
                </div>
              </div>
            )}
          </div>

          {/* Resource Card 2 */}
          <div className="bg-white p-4 rounded-lg shadow relative">
            <div className="absolute top-4 right-4">
              <FaDownload className="text-gray-500 hover:text-[#2094F3] cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <img src="https://via.placeholder.com/32" alt="avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Peter shared Study materials</p>
                <p className="text-xs text-gray-500">Thursday, 10 July 2025 11:30 PM</p>
              </div>
            </div>
            <p className="text-sm text-gray-800 mb-2 font-medium">Full-Stack Development</p>
            <p className="text-sm text-gray-600 mb-3">A full stack developer works on both front-end and back-end...</p>
            <div className="flex items-center justify-between">
              <FaHeart
                className={`cursor-pointer ${likedResources['resource2'] ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                onClick={() => handleLike('resource2')}
              />
              <div className="flex gap-4 text-gray-500 text-sm">
                <button
                  className="flex items-center gap-1 hover:text-[#2094F3]"
                  onClick={() => toggleCommentBox('resource2')}
                >
                  <FaRegCommentDots /> Discuss
                </button>
                <button className="hover:text-[#2094F3]" onClick={() => handlePreview({
                  author: "Peter",
                  title: "Study Materials",
                  content: "A full stack developer works on both front-end and back-end...",
                  date: "Thursday, 10 July 2025 11:30 PM"
                })}>
                  Preview
                </button>
              </div>
            </div>
            {commentBoxes['resource2'] && (
              <div className="mt-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment..."
                    className="border px-3 py-1 rounded w-full"
                  />
                  <button
                    className="bg-[#2094F3] text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => addComment('resource2')}
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {comments['resource2']?.map((comment) => (
                    <div key={comment.id} className="text-sm text-gray-700 mb-1">
                      {comment.text} <span className="text-xs text-gray-500">({comment.timestamp})</span>
                    </div>
                  )) || <p className="text-sm text-gray-500">No comments yet.</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recently Added */}
        <h3 className="text-lg font-semibold mt-10 mb-4">Recently Added</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resource Card 3 */}
          <div className="bg-white p-4 rounded-lg shadow relative">
            <div className="absolute top-4 right-4">
              <FaDownload className="text-gray-500 hover:text-[#2094F3] cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <img src="https://via.placeholder.com/32" alt="avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Jayalath shared HTML Notes</p>
                <p className="text-xs text-gray-500">Thursday, 10 July 2025 11:34 PM</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Basic HTML structure and tags overview...</p>
            <div className="flex items-center justify-between">
              <FaHeart
                className={`cursor-pointer ${likedResources['resource3'] ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                onClick={() => handleLike('resource3')}
              />
              <div className="flex gap-4 text-gray-500 text-sm">
                <button
                  className="flex items-center gap-1 hover:text-[#2094F3]"
                  onClick={() => toggleCommentBox('resource3')}
                >
                  <FaRegCommentDots /> Discuss
                </button>
                <button className="hover:text-[#2094F3]" onClick={() => handlePreview({
                  author: "Jayalath",
                  title: "HTML Notes",
                  content: "Basic HTML structure and tags overview...",
                  date: "Thursday, 10 July 2025 11:34 PM"
                })}>
                  Preview
                </button>
              </div>
            </div>
            {commentBoxes['resource3'] && (
              <div className="mt-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment..."
                    className="border px-3 py-1 rounded w-full"
                  />
                  <button
                    className="bg-[#2094F3] text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => addComment('resource3')}
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {comments['resource3']?.map((comment) => (
                    <div key={comment.id} className="text-sm text-gray-700 mb-1">
                      {comment.text} <span className="text-xs text-gray-500">({comment.timestamp})</span>
                    </div>
                  )) || <p className="text-sm text-gray-500">No comments yet.</p>}
                </div>
              </div>
            )}
          </div>

          {/* Resource Card 4 */}
          <div className="bg-white p-4 rounded-lg shadow relative">
            <div className="absolute top-4 right-4">
              <FaDownload className="text-gray-500 hover:text-[#2094F3] cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <img src="https://via.placeholder.com/32" alt="avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Jay shared CSS Basic Codes</p>
                <p className="text-xs text-gray-500">Thursday, 10 July 2025 11:34 PM</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Introduction to CSS styling and selectors...</p>
            <div className="flex items-center justify-between">
              <FaHeart
                className={`cursor-pointer ${likedResources['resource4'] ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                onClick={() => handleLike('resource4')}
              />
              <div className="flex gap-4 text-gray-500 text-sm">
                <button
                  className="flex items-center gap-1 hover:text-[#2094F3]"
                  onClick={() => toggleCommentBox('resource4')}
                >
                  <FaRegCommentDots /> Discuss
                </button>
                <button className="hover:text-[#2094F3]" onClick={() => handlePreview({
                  author: "Jay",
                  title: "CSS Basic Codes",
                  content: "Introduction to CSS styling and selectors...",
                  date: "Thursday, 10 July 2025 11:34 PM"
                })}>
                  Preview
                </button>
              </div>
            </div>
            {commentBoxes['resource4'] && (
              <div className="mt-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment..."
                    className="border px-3 py-1 rounded w-full"
                  />
                  <button
                    className="bg-[#2094F3] text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => addComment('resource4')}
                  >
                    Add
                  </button>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {comments['resource4']?.map((comment) => (
                    <div key={comment.id} className="text-sm text-gray-700 mb-1">
                      {comment.text} <span className="text-xs text-gray-500">({comment.timestamp})</span>
                    </div>
                  )) || <p className="text-sm text-gray-500">No comments yet.</p>}
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

export default Dashboard;