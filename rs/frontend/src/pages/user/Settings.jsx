import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";


const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    course: '',
    year: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) return;

      try {
        const res = await axios.get(`http://localhost:3001/api/users/${storedUsername}`);
        const { username, displayName, course, year } = res.data;

        setFormData(prev => ({
          ...prev,
          username,
          displayName,
          course,
          year: year.toString()
        }));
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/users/${formData.username}`, {
        displayName: formData.displayName,
        course: formData.course,
        year: Number(formData.year),
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert('Profile updated successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }));
    } catch (err) {
      console.error('Failed to update profile:', err.response?.data || err.message);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Right Panel */}
      <div className="flex flex-col w-full p-8 min-h-screen">
        <div className="flex items-start gap-8">
          
          {/* Settings Title aligned to top-left */}
          <h2 className="text-2xl font-semibold mt-1">Settings</h2>

          {/* Account Settings Card */}
          <div className="bg-white rounded-lg shadow-sm p-10 w-full max-w-xl">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select Course</option>
                  <option value="bitc">BICT</option>
                  <option value="bsc-it">BSc in IT</option>
                  <option value="biz">Business Studies</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">Change Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
