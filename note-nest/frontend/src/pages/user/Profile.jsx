import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

const baseURL = 'http://localhost:3001';

const formatImagePath = (path) => {
  if (!path) return 'https://via.placeholder.com/100';
  if (path.startsWith('uploads/')) {
    return `${baseURL}/${path}`;
  }
  return `${baseURL}/uploads/profile_images/${path}`;
};

const Profile = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [nameInput, setNameInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [likes, setLikes] = useState(0);
  const [downloads, setDownloads] = useState(0);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseURL}/api/users/${username}`);
        const data = await res.json();

        setProfileImage(formatImagePath(data.profileImage));
        setNameInput(data.displayName || '');
        setBioInput(data.bio || '');
        setLikes(data.likes || 0);
        setDownloads(data.downloads || 0);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (username) fetchProfile();
  }, [username]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

        <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
          {/* Profile Picture */}
          <div className="flex items-center mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="ml-6">
              <p className="text-lg font-medium">{nameInput || 'Your Name'}</p>
              <input
                type="file"
                accept="image/*"
                id="profilePicInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                className="text-blue-500 text-sm mt-1 hover:underline"
                onClick={() => document.getElementById('profilePicInput').click()}
              >
                Change Picture
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>

          {/* Bio Input */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              placeholder="Write a short bio about yourself"
            />
          </div>

          {/* Likes + Save Changes Button */}
          <div className="mb-4 flex justify-between items-center text-sm text-gray-700">
            <div>
              <p><strong></strong> </p>
              <p><strong></strong> </p>
            </div>

            <button
              className="bg-[#2094F3] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
