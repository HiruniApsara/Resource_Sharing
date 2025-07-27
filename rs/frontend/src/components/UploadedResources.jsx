import React, { useEffect, useState, useContext } from 'react';
import { FaDownload, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { UserContext } from './UserContext';
import ReportModal from './ReportModal';

const baseURL = 'http://localhost:3001';

const UploadedResources = ({
  username,
  searchTerm = '',
  selectedYear = '',
  selectedSubject = '',
  selectedType = '',
  onPreview
}) => {
  const { user } = useContext(UserContext);

  const [allResources, setAllResources] = useState([]);
  const [likedResources, setLikedResources] = useState({});
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  // Helper to build profile image URL
  const formatImagePath = (path) => {
    if (!path) return 'https://via.placeholder.com/40';
    if (path.startsWith('uploads/')) return `${baseURL}/${path}`;
    return `${baseURL}/uploads/profile_images/${path}`;
  };

  // Fetch all resources & user profile images, then mark liked by current user
  const fetchResources = async () => {
    try {
      const res = await fetch(`${baseURL}/api/resources/all`);
      const data = await res.json();

      const filteredResources = username
        ? data.filter((r) => r.username === username)
        : data;

      // Enrich each resource with uploader's profile image
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
            return {
              ...res,
              profileImage: 'https://via.placeholder.com/40',
            };
          }
        })
      );

      // Determine like status for current user
      const currentUsername = user?.username || localStorage.getItem('username');
      const likeMap = {};
      enhancedResources.forEach((res) => {
        likeMap[res._id] = Array.isArray(res.likes) && res.likes.includes(currentUsername);
      });

      setLikedResources(likeMap);
      setAllResources(enhancedResources);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch resources.');
    }
  };

  useEffect(() => {
    fetchResources();
  }, [username]);

  // Toggle like on backend and update local like state
  const handleLike = async (resourceId) => {
    const username = user?.username || localStorage.getItem('username');
    try {
      await fetch(`${baseURL}/api/resources/${resourceId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      // Optimistically update like locally
      setLikedResources((prev) => ({
        ...prev,
        [resourceId]: !prev[resourceId],
      }));

      // Refresh resources to update likes count and state
      fetchResources();
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  // Increment download count and open file
const handleDownload = async (res) => {
  try {
    await fetch(`${baseURL}/api/resources/${res._id}/download`, { method: 'POST' });

    // ✅ Save after download
    await saveResource(res._id);

    window.open(`${baseURL}/${res.fileUrl.replace(/\\/g, '/')}`, '_blank');
  } catch (err) {
    console.error('Failed to count download or save resource:', err);
  }
};

  // Save resource to user saved list
  const saveResource = async (resourceId) => {
    const username = user?.username || localStorage.getItem('username');
    try {
      await fetch(`${baseURL}/api/resources/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, resourceId }),
      });
      alert('Saved to your resources!');
    } catch (err) {
      alert('Failed to save.');
    }
  };

  // Filter resources based on props
  const filteredResources = allResources.filter((res) => {
    const matchTitle = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = selectedYear ? res.year === selectedYear : true;
    const matchSubject = selectedSubject ? res.subject === selectedSubject : true;
    const matchType = selectedType ? res.resourceType.toLowerCase() === selectedType.toLowerCase() : true;
    return matchTitle && matchYear && matchSubject && matchType;
  });

  return (
    <div className="mt-12 px-4 sm:px-8">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res) => (
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
            <div className="flex-1 cursor-pointer" onClick={() => onPreview?.(res)}>
              <p className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {res.title}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {res.subject} | {res.year} | {res.resourceType}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <FaHeart
                  className={`cursor-pointer text-xl ${
                    likedResources[res._id] ? 'text-red-500' : 'text-gray-400'
                  } hover:text-red-500`}
                  onClick={() => handleLike(res._id)}
                />
             
              </div>

              <div className="flex items-center gap-4 text-gray-500 text-lg">
                <FaDownload
                  className="cursor-pointer hover:text-[#2094F3]"
                  onClick={() => handleDownload(res)}
                />
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