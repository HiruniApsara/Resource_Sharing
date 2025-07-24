import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/TopBar";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadModal from "../../components/UploadModal";

const Recent = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchRecentResources = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/resources/recent");
      const data = await res.json();

      const formatted = data.map((item) => ({
        id: item._id,
        title: item.title,
        year: item.year,
        viewedDate: new Date(item.uploadedAt).toLocaleString(),
        fileUrl: `http://localhost:3001/${item.fileUrl.replace(/\\/g, "/")}`,
      }));

      setResources(formatted);
    } catch (err) {
      setError("Failed to fetch recent resources");
    }
  };

  useEffect(() => {
    fetchRecentResources();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Uploads</h2>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#2094F3] text-white px-5 py-2 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2 focus:outline-none focus:ring-0"
          >
            <FaCloudUploadAlt size={20} />
            Upload Resource
          </button>
        </div>

        {error && (
          <p className="text-red-600 mb-6 text-center font-medium">{error}</p>
        )}

        {resources.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-gray-500 text-center shadow-lg">
            No recent uploads found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between
                hover:shadow-xl transition-shadow duration-300"
              >
<div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{res.title}</h3>
  <p className="text-sm text-gray-600 mb-1">Year: {res.year}</p>
  <p className="text-xs text-gray-400 italic">Viewed on {res.viewedDate}</p>
</div>

<a
  href={res.fileUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-block text-center bg-[#2094F3] text-white text-sm font-medium px-4 py-2 rounded-lg
    hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
>
  Revisit Resource
</a>

              </div>
            ))}
          </div>
        )}

        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={(files) => {
            console.log("Files uploaded:", files);
            fetchRecentResources();
            setIsUploadModalOpen(false);
          }}
        />
      </main>
    </div>
  );
};

export default Recent;
