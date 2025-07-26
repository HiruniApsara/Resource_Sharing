import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
const baseURL = 'http://localhost:3001';

const Analytics = () => {
  const [weeklyUploads, setWeeklyUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/dashboard/stats`);
      const { weeklyUploads } = response.data;

      // Ensure it's an array
      if (Array.isArray(weeklyUploads)) {
        setWeeklyUploads(weeklyUploads);
      } else {
        setWeeklyUploads([]);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setWeeklyUploads([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Upload Trends</h2>

          {loading ? (
            <p className="text-gray-400">Loading data...</p>
          ) : weeklyUploads.length === 0 ? (
            <p className="text-gray-400">No data available yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyUploads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;