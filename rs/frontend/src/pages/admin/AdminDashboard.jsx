import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Uploads Today" value="42" />
          <Card title="Total Uploads This Week" value="189" />
          <Card
            title="Most Downloaded File"
            value="Calculus_Notes.pdf (120 downloads)"
          />
          <Card title="Reports Pending Review" value="8" />
        </div>

        {/* Activity & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="User Activity">
            <p className="text-gray-300">Coming soon...</p>
          </SectionCard>

          <SectionCard title="Notifications">
            <ul className="text-gray-300 text-sm space-y-1">
              <li>📄 New file uploaded by John Doe</li>
              <li>⚠️ Report filed on Physics_2023.pdf</li>
              <li>🚨 2 users flagged for suspicious activity</li>
            </ul>
          </SectionCard>
        </div>
      </main>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-[#1e293b] p-4 rounded-lg shadow text-white">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-2xl">{value}</p>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-[#1e293b] p-4 rounded-lg shadow text-white">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default AdminDashboard;
