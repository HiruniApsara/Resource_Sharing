import React from 'react';
import { FaBook, FaBookmark, FaClock, FaCog, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="px-6 py-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">NoteNest</h1>
          <p className="text-xs text-gray-500 mt-1">Resource sharing platform</p>
        </div>

        {/* Navigation */}
        <nav className="px-6 mt-6 space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaTachometerAlt className="text-lg" />
            Dashboard
          </Link>
          <Link to="/my-resources" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaBook className="text-lg" />
            My Resources
          </Link>
          <Link to="/saved" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaBookmark className="text-lg" />
            Saved
          </Link>
          <Link to="/recent" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaClock className="text-lg" />
            Recent
          </Link>
          <Link to="/settings" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaCog className="text-lg" />
            Settings
          </Link>
          <Link to="/logout" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaSignOutAlt className="text-lg" />
            Logout
          </Link>
        </nav>

        {/* Top Subjects (placeholder for future) */}
        <div className="px-6 mt-10 text-sm text-gray-400 uppercase">
          Top Subjects
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-t flex items-center gap-3 bg-gray-50">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-700">Hiruni Apsara</h4>
          <p className="text-xs text-gray-500">BICT </p>
          <p>3rd Year</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
