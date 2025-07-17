import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/TopBar';
import { UserContext } from '../../components/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = 'http://localhost:3001';

const formatImagePath = (path) => {
  if (!path) return 'https://via.placeholder.com/100';
  
  // If path already starts with uploads/, just return full URL
  if (path.startsWith('uploads/')) {
    return `${baseURL}/${path}`;
  }

  // Otherwise, assume it's just a filename
  return `${baseURL}/uploads/profile_images/${path}`;
};

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://via.placeholder.com/100');
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [bioInput, setBioInput] = useState(user?.bio || '');
  const [savedName, setSavedName] = useState(user?.name || '');
  const [savedBio, setSavedBio] = useState(user?.bio || '');
  const [isUploading, setIsUploading] = useState(false);
  // No saving state needed if you don't save profile info to backend now

  const username = localStorage.getItem('username');

  // Load user data on mount (refresh local profile data)
  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseURL}/api/users/${username}`);
        const data = await res.json();

        const imageUrl = data.profileImage
          ? formatImagePath(data.profileImage)
          : 'https://via.placeholder.com/100';

        setProfileImage(imageUrl);
        setNameInput(data.displayName || '');
        setBioInput(data.bio || '');
        setSavedName(data.displayName || '');
        setSavedBio(data.bio || '');

        setUser(prev => ({
          ...prev,
          name: data.displayName,
          bio: data.bio,
          profileImage: imageUrl,
          likes: data.likes || 0,
          downloads: data.downloads || 0,
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data.');
      }
    };

    fetchProfile();
  }, [username, setUser]);

  // Handle profile picture upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Preview image immediately
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('username', username);

    try {
      const res = await fetch(`${baseURL}/api/upload-profile-pic`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data?.imageUrl) {
        const fullUrl = formatImagePath(data.imageUrl);
        setProfileImage(fullUrl);
        setUser(prev => ({ ...prev, profileImage: fullUrl }));
        toast.success('Profile picture updated!');
      } else {
        toast.warn('Upload succeeded but no image URL returned.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">
        <Topbar />
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

          <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="ml-6">
                <p className="text-lg font-medium">{savedName || 'Your Name'}</p>

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
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Change Picture'}
                </button>
              </div>
            </div>

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

            <div className="mb-4 text-sm text-gray-700">
              <p>
                <strong>Total Likes:</strong> {user?.likes || 0}
              </p>
              <p>
                <strong>Total Downloads:</strong> {user?.downloads || 0}
              </p>
            </div>

            {/* No save button since you said no saving needed */}
          </div>
        </main>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Profile;