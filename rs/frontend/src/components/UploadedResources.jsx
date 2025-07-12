import React, { useEffect, useState } from 'react';
import { FaDownload, FaHeart, FaRegCommentDots } from 'react-icons/fa';

const UploadedResources = ({ username }) => {
  const [resources, setResources] = useState([]);
  const [liked, setLiked] = useState({});
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/resources/all');
      const data = await res.json();

      // If username is provided, filter to show only that user's resources
      const filteredResources = username
        ? data.filter(resource => resource.username === username)
        : data; // Show all resources if no username is given

      setResources(filteredResources);
    } catch (err) {
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

            {/* Resource Details */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{res.title}</p>
              <p className="text-sm text-gray-600 mb-4">
                {res.subject} | {res.year} | {res.resourceType}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <FaHeart
                className={`cursor-pointer text-xl transition-colors duration-200 ${
                  liked[res._id] ? 'text-red-500' : 'text-gray-400'
                } hover:text-red-500`}
                onClick={() => toggleLike(res._id)}
              />
              <div className="flex items-center gap-4 text-gray-500 text-lg">
               <a
  href={`http://localhost:3001/${res.fileUrl.replace(/\\/g, '/')}`}
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-[#2094F3]"
  onClick={() => saveResource(res._id)}  // <-- Save when clicked
>
  <FaDownload />
</a>

                <FaRegCommentDots className="cursor-pointer hover:text-[#2094F3]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedResources;