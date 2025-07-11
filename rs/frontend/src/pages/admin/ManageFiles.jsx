import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';

const ManageFiles = () => {
  const [files] = useState([
    {
      name: 'Calculus_Notes.pdf',
      uploadedBy: 'John Doe',
      courseYear: 'Math/2023',
      uploadDate: '2025-05-30',
      likes: 50,
      downloads: 120,
      status: 'Approved',
    },
    {
      name: 'Physics_2023.pdf',
      uploadedBy: 'Jane Smith',
      courseYear: 'Physics/2024',
      uploadDate: '2025-05-29',
      likes: 30,
      downloads: 80,
      status: 'Pending',
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Manage Files</h1>

        {/* Filters */}
        <div className="bg-[#1e293b] p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <select className="bg-[#0f172a] text-white border border-gray-600 px-3 py-2 rounded text-sm">
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Computer Science</option>
            </select>
            <select className="bg-[#0f172a] text-white border border-gray-600 px-3 py-2 rounded text-sm">
              <option>All Statuses</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Flagged</option>
            </select>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-2">File Name</th>
                <th className="p-2">Uploaded by</th>
                <th className="p-2">Course/Year</th>
                <th className="p-2">Upload Date</th>
                <th className="p-2">Likes / Downloads</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-[#334155]">
                  <td className="p-2">{file.name}</td>
                  <td className="p-2">{file.uploadedBy}</td>
                  <td className="p-2">{file.courseYear}</td>
                  <td className="p-2">{file.uploadDate}</td>
                  <td className="p-2">{file.likes} / {file.downloads}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        file.status === 'Approved'
                          ? 'bg-green-700 text-white'
                          : 'bg-yellow-600 text-white'
                      }`}
                    >
                      {file.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 text-sm">
                      <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                        <FaEye />
                        View
                      </button>
                      <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                        <FaCheck />
                        Approve
                      </button>
                      <button className="flex items-center gap-1 text-red-400 hover:text-red-300">
                        <FaTrash />
                        Delete
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

export default ManageFiles;
