import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const baseURL = 'http://localhost:3001';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${baseURL}/api/dashboard/stats`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    };

    const fetchRecentUploads = async () => {
      try {
        const res = await fetch(`${baseURL}/api/dashboard/recent-uploads`);
        const data = await res.json();
        setRecentUploads(data);
      } catch (error) {
        console.error('Failed to load recent uploads', error);
      }
    };

    const fetchPendingReports = async () => {
      try {
        const res = await fetch(`${baseURL}/api/reports`);
        const data = await res.json();
        setPendingReports(data);
      } catch (error) {
        console.error('Failed to load pending reports', error);
      }
    };

    fetchStats();
    fetchRecentUploads();
    fetchPendingReports();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSidebar />

      <main className="flex-1 p-12 space-y-12 max-w-[1200px] mx-auto w-full">
        <h1 className="text-4xl font-bold mb-10 border-b border-gray-700 pb-4">
          Admin Dashboard
        </h1>

        {/* Top stats section with 2 cards filling full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
          <Card title="Total Uploads Today" value={stats?.totalToday ?? '...'} />
          <Card title="Total Uploads This Week" value={stats?.totalWeek ?? '...'} />
        </div>

        {/* Main content sections using full width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* User Activity Section */}
          <SectionCard title="User Activity">
            <ul className="text-gray-300 text-base space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {recentUploads.length === 0 ? (
                <li>No recent uploads.</li>
              ) : (
                recentUploads.map((upload) => (
                  <li key={upload._id} className="hover:bg-[#1e293b] p-2 rounded transition">
                    📄 <strong>{upload.username}</strong> uploaded{' '}
                    <em>{upload.title}</em> at{' '}
                    {new Date(upload.uploadedAt).toLocaleString()}
                  </li>
                ))
              )}
            </ul>
          </SectionCard>

          {/* Reports Pending Review Section */}
          <SectionCard title="Reports Pending Review">
            <ul className="text-gray-300 text-base space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {pendingReports.length === 0 ? (
                <li>No reports pending.</li>
              ) : (
                pendingReports.map((report) => (
                  <li key={report._id} className="hover:bg-[#1e293b] p-2 rounded transition">
                    {report.reportedBy} reported file <strong>{report.fileName}</strong> for reason: <em>{report.reason}</em>
                  </li>
                ))
              )}
            </ul>
          </SectionCard>
        </div>
      </main>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg text-white flex flex-col justify-center items-center hover:shadow-[#3b82f6]/60 transition-shadow cursor-default">
    <h3 className="font-semibold mb-4 text-xl">{title}</h3>
    <p className="text-5xl font-extrabold">{value}</p>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg text-white hover:shadow-[#3b82f6]/60 transition-shadow cursor-default">
    <h3 className="font-semibold mb-6 text-2xl border-b border-gray-600 pb-2">{title}</h3>
    {children}
  </div>
);

export default AdminDashboard;