import React from 'react';
import AdminSideBar from '../../components/AdminSidebar';

const AdminSettings = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSideBar />

      <div className="flex-1 p-8 space-y-10">

        {/* Admin Account */}
        <div className="bg-[#1e293b] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Admin Account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm">Username</label>
              <input
                type="text"
                id="username"
                defaultValue="admin"
                className="w-full px-4 py-2 rounded bg-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
            <label htmlFor="password" className="text-sm">Password</label>
              <input
                type="password"
                id="password"
                defaultValue="1234"
                className="w-full px-4 py-2 rounded bg-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
