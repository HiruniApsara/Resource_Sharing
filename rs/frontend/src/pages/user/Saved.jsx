import React from 'react';
import Sidebar from "../../components/Sidebar";
import TopBar from '../../components/TopBar';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Saved = () => {
  const handleUploadClick = () => {
    alert('Upload modal or navigation can go here!');
    // You can open a modal or navigate somewhere on upload click
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">
        <TopBar />
        {/* Header row with title and upload button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saved</h2>
          <button
            onClick={handleUploadClick}
            className="bg-[#2094F3] text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2 focus:outline-none focus:ring-0"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <FaCloudUploadAlt />
            Upload Resource
          </button>
        </div>

        {/* Content box */}
        <div className="bg-white border rounded-lg p-10 text-center shadow-sm">
          <p className="text-gray-700 font-medium mb-2">No resources saved yet</p>
          <p className="text-gray-500 text-sm mb-4">Save resources by clicking the bookmark icon</p>
          <button
            className="bg-[#2094F3] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-0"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            Explore Resources
          </button>
        </div>
      </main>
    </div>
  );
};

export default Saved;
