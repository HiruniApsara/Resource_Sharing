import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import { FaUser, FaBan, FaArrowUp } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">User Management</h1>

        <div className="bg-[#1e293b] p-4 rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-[#334155] text-left">
                <th className="p-2">Display Name</th>
                <th className="p-2">Username</th>
                <th className="p-2">Course</th>
                <th className="p-2">Year</th>
                <th className="p-2">Upload Count</th>
                <th className="p-2">Last Active</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-[#334155]">
                  <td className="p-2">{user.displayName}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.course}</td>
                  <td className="p-2">{user.year}</td>
                  <td className="p-2">{user.uploadCount}</td>
                  <td className="p-2">{new Date(user.lastActive).toLocaleDateString()}</td>
                  <td className="p-2">{user.status}</td>
                  <td className="p-2">
                    <div className="flex gap-2 flex-wrap text-sm">
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