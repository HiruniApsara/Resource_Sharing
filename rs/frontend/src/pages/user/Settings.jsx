import Sidebar from "../../components/Sidebar";

import Topbar from '../../components/TopBar';
import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import UploadModal from '../../components/UploadModal';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Submit data to API here
  };

  return (
    <div className="flex min-h-screen">  {/* Changed from h-screen to min-h-screen */}
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">  {/* Added consistent padding and background */}
        <Topbar />
        
        {/* Title and Upload Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button className="bg-[#2094F3] text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2">
            <FaCloudUploadAlt />Upload Resource
          </button>
        </div>

        {/* Account Settings Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl">  {/* Added rounded-lg */}
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 block mb-1">User Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 block mb-1">Change Password</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="bg-[#2094F3] text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;