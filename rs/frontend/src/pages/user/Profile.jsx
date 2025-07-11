import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/TopBar';

const Profile = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [nameInput, setNameInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [savedName, setSavedName] = useState('');
  const [savedBio, setSavedBio] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("profilePic", file);

      fetch("http://localhost:5000/api/upload-profile-pic", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Upload successful:", data);
          // If your server returns image path, update state here
        })
        .catch((err) => {
          console.error("Upload failed:", err);
        });
    }
  };

  const handleSave = () => {
    setSavedName(nameInput);
    setSavedBio(bioInput);

    const userData = {
      name: nameInput,
      bio: bioInput,
      // Optionally send image too
    };

    console.log("Saving user data:", userData);

    // Example fetch call to backend:
    // fetch('http://localhost:5000/api/save-profile', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    // })
    // .then(res => res.json())
    // .then(data => console.log("Saved:", data))
    // .catch(err => console.error("Save failed:", err));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar />
        <main className="flex-1 p-8">
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
                >
                  Change Picture
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
              <p><strong>Total Likes:</strong> 155</p>
              <p><strong>Total Downloads:</strong> 50</p>
            </div>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
