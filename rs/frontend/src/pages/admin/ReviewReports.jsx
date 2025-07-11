import React, { useState } from 'react';
import AdminSideBar from '../../components/AdminSidebar';
import { FaEye, FaTimes, FaTrash } from 'react-icons/fa';

const ReviewReports = () => {
  const [reports] = useState([
    {
      id: 'R001',
      fileName: 'Physics_2023.pdf',
      reason: 'Inappropriate content',
      reportedBy: 'Alice Brown',
      date: '2025-05-30',
    },
    {
      id: 'R002',
      fileName: 'CS_Notes.pdf',
      reason: 'Copyright violation',
      reportedBy: 'Bob Wilson',
      date: '2025-05-29',
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSideBar />

      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-4">Review Reports</h1>

        <div className="bg-[#1e293b] p-4 rounded-lg shadow">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-[#334155] text-left">
                <th className="p-2">Report ID</th>
                <th className="p-2">File Name</th>
                <th className="p-2">Reason for Report</th>
                <th className="p-2">Reported by</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t border-gray-700 hover:bg-[#334155]">
                  <td className="p-2">{report.id}</td>
                  <td className="p-2">{report.fileName}</td>
                  <td className="p-2">{report.reason}</td>
                  <td className="p-2">{report.reportedBy}</td>
                  <td className="p-2">{report.date}</td>
                  <td className="p-2">
                    <div className="flex gap-2 flex-wrap">
                      <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        <FaEye /> View
                      </button>
                      <button className="text-green-400 hover:text-green-300 flex items-center gap-1">
                        <FaTimes /> Dismiss
                      </button>
                      <button className="text-red-400 hover:text-red-300 flex items-center gap-1">
                        <FaTrash /> Remove
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

export default ReviewReports;
