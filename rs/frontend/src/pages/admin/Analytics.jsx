import React from 'react';
import AdminSideBar from '../../components/AdminSideBar';

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSideBar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Analytics</h1>
        <div className="bg-[#1e293b] p-4 rounded-lg shadow">
          <p className="text-gray-300">Analytics dashboard coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
