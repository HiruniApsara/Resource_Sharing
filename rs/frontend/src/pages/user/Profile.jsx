import React, { useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/TopBar';
import { UserContext } from '../../components/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState(user?.profileImage || "https://via.placeholder.com/100");
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [bioInput, setBioInput] = useState(user?.bio || '');
  const [savedName, setSavedName] = useState(user?.name || '');
  const [savedBio, setSavedBio] = useState(user?.bio || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Preview immediately

      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const res = await fetch("http://localhost:5000/api/upload-profile-pic", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data?.imageUrl) {
          setProfileImage(data.imageUrl);
          setUser(prev => ({ ...prev, profileImage: data.imageUrl }));
          toast.success("Profile picture updated!");
        } else {
          toast.warn("Upload succeeded but no image URL returned.");
        }
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Failed to upload image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!nameInput.trim()) {
      toast.warn("Name cannot be empty.");
      return;
    }

    setIsSaving(true);

    const userData = {
      name: nameInput,
      bio: bioInput,
    };

    try {
      const res = await fetch("http://localhost:5000/api/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      setSavedName(nameInput);
      setSavedBio(bioInput);
      setUser(prev => ({ ...prev, ...userData }));

      toast.success("Profile updated successfully!");
      console.log("Saved:", data);
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save profile.");
    } finally {
      setIsSaving(false);
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
                <p className="text-lg font-medium">{savedName || "Your Name"}</p>

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
                  {isUploading ? "Uploading..." : "Change Picture"}
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
              <p><strong>Total Likes:</strong> {user?.likes || 155}</p>
              <p><strong>Total Downloads:</strong> {user?.downloads || 50}</p>
            </div>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </main>
      
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>

  );
};

export default Profile;