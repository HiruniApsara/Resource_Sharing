import React, { useEffect, useState, useContext } from 'react';
import { FaDownload, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { UserContext } from './UserContext'; // Adjust path if needed
import ReportModal from './ReportModal';


const baseURL = 'http://localhost:3001';

const UploadedResources = ({ username }) => {
  const { user } = useContext(UserContext);

  const [resources, setResources] = useState([]);
  const [liked, setLiked] = useState({});
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null); // for modal

  const formatImagePath = (path) => {
    if (!path) return 'https://via.placeholder.com/40';
    if (path.startsWith('uploads/')) return `${baseURL}/${path}`;
    return `${baseURL}/uploads/profile_images/${path}`;
  };

  const fetchResources = async () => {
    try {
      const res = await fetch(`${baseURL}/api/resources/all`);
      const data = await res.json();
      const filteredResources = username
        ? data.filter((resource) => resource.username === username)
        : data;

      const enhancedResources = await Promise.all(
        filteredResources.map(async (res) => {
          try {
            const userRes = await fetch(`${baseURL}/api/users/${res.username}`);
            const userData = await userRes.json();

            return {
              ...res,
              profileImage: userData?.profileImage
                ? formatImagePath(userData.profileImage.replace(/\\/g, '/'))
                : 'https://via.placeholder.com/40',
            };
          } catch {
            return { ...res, profileImage: 'https://via.placeholder.com/40' };
          }
        })
      );

      setResources(enhancedResources);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch resources');
    }
  };

  useEffect(() => {
    fetchResources();
  }, [username]);

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

   // ✅ Save Resource Function
  const saveResource = async (resourceId) => {
  const username = localStorage.getItem('username'); // Get username instead of userId
  try {
    await fetch('http://localhost:3001/api/resources/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, resourceId }),
    });
    alert('Saved to your resources!');
  } catch (err) {
    alert('Failed to save.');
  }
};

  return (
    <div className="mt-12 px-4 sm:px-8">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res) => (
          <div
            key={res._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[300px]"
          >
            {/* Uploader Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={res.profileImage}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{res.username}</p>
                <p className="text-xs text-gray-500">
                  {new Date(res.uploadedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Resource Details */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {res.title}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {res.subject} | {res.year} | {res.resourceType}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <FaHeart
                className={`cursor-pointer text-xl ${
                  liked[res._id] ? 'text-red-500' : 'text-gray-400'
                } hover:text-red-500`}
                onClick={() => toggleLike(res._id)}
              />
              <div className="flex items-center gap-4 text-gray-500 text-lg">
                <a
                  href={`${baseURL}/${res.fileUrl.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2094F3]"
                  onClick={() => saveResource(res._id)}
                >
                  <FaDownload />
                </a>
                <FaRegCommentDots
                  className="cursor-pointer hover:text-[#2094F3]"
                  onClick={() => setSelectedReport(res)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal
          file={selectedReport}
          onClose={() => setSelectedReport(null)}
          reporter={user?.name || localStorage.getItem('username')}
        />
      )}
    </div>
  );
};

export default UploadedResources;