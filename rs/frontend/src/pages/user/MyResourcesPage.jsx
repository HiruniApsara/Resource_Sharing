import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import TopBar from '../../components/TopBar';
import UploadModal from '../../components/UploadModal';
import UploadedResources from '../../components/UploadedResources';

const MyResourcesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = localStorage.getItem('username'); // Get the logged-in username

  const handleUploadSuccess = () => {
    // Logic to refresh resources or handle upload success
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
            onClick={() => setIsModalOpen(true)}
          >
            Upload Resource
          </button>
        </div>

        <UploadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onUploadSuccess={handleUploadSuccess} 
        />

        {/* Pass the username to UploadedResources */}
        <UploadedResources username={username} />
      </main>
    </div>
  );
};

export default MyResourcesPage;