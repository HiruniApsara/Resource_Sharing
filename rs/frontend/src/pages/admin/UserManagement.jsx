import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FaUser, FaBan, FaArrowUp } from 'react-icons/fa';

const UserManagement = () => {
  const [users] = useState([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      uploadCount: 15,
      lastActive: '2025-05-30',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Admin',
      uploadCount: 8,
      lastActive: '2025-05-29',
      status: 'Active',
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">User Management</h1>

        <div className="bg-[#1e293b] p-4 rounded-lg shadow">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-[#334155] text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Upload Count</th>
                <th className="p-2">Last Active</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-[#334155]"
                >
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.uploadCount}</td>
                  <td className="p-2">{user.lastActive}</td>
                  <td className="p-2">{user.status}</td>
                  <td className="p-2">
                    <div className="flex gap-2 text-sm flex-wrap">
                      <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                        <FaUser />
                        View
                      </button>
                      <button className="flex items-center gap-1 text-red-400 hover:text-red-300">
                        <FaBan />
                        Ban
                      </button>
                      <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                        <FaArrowUp />
                        Promote
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
