import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../components/AdminSidebar';
import { FaEye, FaTrash } from 'react-icons/fa';

const baseURL = 'http://localhost:3001';

const ReviewReports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${baseURL}/api/reports`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports.');
    }
  };
const handleView = (report) => {
  if (report.fileUrl) {
    const safeUrl = report.fileUrl.startsWith('http') 
      ? report.fileUrl.replace(/\\/g, '/')
      : `${baseURL}/${report.fileUrl.replace(/\\/g, '/')}`;
    window.open(safeUrl, '_blank');
  } else {
    alert('File URL is not available.');
  }
};

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`${baseURL}/api/reports/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setReports(reports.filter((r) => r._id !== id));
      } else {
        console.error('Failed to delete report');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSideBar />

      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-4">Review Reports</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="bg-[#1e293b] p-4 rounded-lg shadow">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-[#334155] text-left">
                <th className="p-2">Report ID</th>
                <th className="p-2">File Name</th>
                <th className="p-2">Reason</th>
                <th className="p-2">Reported by</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report._id} className="border-t border-gray-700 hover:bg-[#334155]">
                  <td className="p-2">R{String(index + 1).padStart(3, '0')}</td>
                  <td className="p-2">{report.fileName}</td>
                  <td className="p-2">{report.reason}</td>
                  <td className="p-2">{report.reportedBy}</td>
                  <td className="p-2">{new Date(report.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        onClick={() => handleView(report)}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 flex items-center gap-1"
                        onClick={() => handleRemove(report._id)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReviewReports;