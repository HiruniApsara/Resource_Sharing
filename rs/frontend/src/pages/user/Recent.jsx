import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";
import Topbar from '../../components/TopBar';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Recent = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  // Fetch last 2 uploaded resources
  const fetchRecentResources = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/resources/recent');
      const data = await res.json();

      const formatted = data.map(item => ({
        id: item._id,
        title: item.title,
        year: item.year,
        viewedDate: new Date(item.uploadedAt).toLocaleString(),
        fileUrl: `http://localhost:3001/${item.fileUrl.replace(/\\/g, '/')}`, // normalize file path
      }));

      setResources(formatted);
    } catch (err) {
      setError('Failed to fetch recent resources');
    }
  };

  useEffect(() => {
    fetchRecentResources();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">
        <Topbar />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent</h2>
          <button className="bg-[#2094F3] text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2">
            <FaCloudUploadAlt /> Upload Resource
          </button>
        </div>

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        {resources.length === 0 ? (
          <div className="bg-white p-6 rounded-lg text-gray-600 text-center shadow">
            No recent uploads found.
          </div>
        ) : (
          resources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-start mb-4"
            >
              <div>
                <h3 className="font-semibold text-black">{res.title}</h3>
                <p className="text-sm text-gray-600">{res.year}</p>
                <p className="text-xs text-gray-400">Viewed on {res.viewedDate}</p>
              </div>
              <div className="flex items-center">
                <a
                  href={res.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2094F3] text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Revisit
                </a>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Recent;
