import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";
import TopBar from '../../components/TopBar';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaDownload, FaHeart, FaRegCommentDots } from 'react-icons/fa';

const Saved = () => {
  const [savedResources, setSavedResources] = useState([]);
  const [error, setError] = useState(null);

  const fetchSavedResources = async () => {
    const username = localStorage.getItem('username');
    try {
      const res = await fetch(`http://localhost:3001/api/resources/saved/${username}`);
      const data = await res.json();
      setSavedResources(data);
    } catch (err) {
      setError('Failed to fetch saved resources');
    }
  };

  useEffect(() => {
    fetchSavedResources();
  }, []);

  const handleUploadClick = () => {
    alert('Upload modal or navigation can go here!');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">
        <TopBar />
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saved</h2>
          <button
            onClick={handleUploadClick}
            className="bg-[#2094F3] text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2 focus:outline-none focus:ring-0"
          >
            <FaCloudUploadAlt />
            Upload Resource
          </button>
        </div>

        {/* Saved Resources */}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {savedResources.length === 0 ? (
          <div className="bg-white rounded-lg p-10 text-center shadow-sm">
            <p className="text-gray-700 font-medium mb-2">No resources saved yet</p>
            <p className="text-gray-500 text-sm mb-4">Save resources by clicking the download icon</p>
            <button
              className="bg-[#2094F3] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Explore Resources
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {savedResources.map(res => (
              <div
                key={res._id}
                className="bg-white rounded-2xl shadow-lg p-6 min-h-[300px] flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Uploader Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{res.username}</p>
                    <p className="text-xs text-gray-500">{new Date(res.uploadedAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Resource Info */}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{res.title}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {res.subject} | {res.year} | {res.resourceType}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <FaHeart  />
                  <div className="flex items-center gap-4 text-gray-500 text-lg">
                    <a
                      href={`http://localhost:3001/${res.fileUrl.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#2094F3]"
                    >
                      <FaDownload />
                    </a>
                    <FaRegCommentDots className="cursor-pointer hover:text-[#2094F3]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Saved;