import React from 'react';
import AdminSideBar from '../../components/AdminSidebar';

const AdminSettings = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSideBar />

      <div className="flex-1 p-8 space-y-10">
        {/* Notification Settings */}
        <div className="bg-[#1e293b] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-3">
            <label className="block">
              <input type="radio" name="notification" className="mr-2" />
              Email notifications for new reports
            </label>
            <label className="block">
              <input type="radio" name="notification" className="mr-2" />
              Push notification for urgent reports
            </label>
          </div>
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded">
            Save Changes
          </button>
        </div>

        {/* Admin Account */}
        <div className="bg-[#1e293b] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Admin Account</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value="jay1@gmail.com"
                readOnly
                className="w-full bg-[#334155] text-gray-300 px-4 py-2 rounded outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Change Password</label>
              <input
                type="password"
                placeholder="New password"
                className="w-full bg-[#334155] text-white px-4 py-2 rounded outline-none"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-[#334155] text-white px-4 py-2 rounded outline-none mt-2"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded">
              Update Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
