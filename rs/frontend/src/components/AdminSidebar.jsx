import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Flag,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from 'lucide-react';
import logoImage from '../assets/logo.png'; // Make sure the path is correct

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-[#1f2937] text-white w-64 h-screen p-6 flex flex-col justify-between">
      <div>
        {/* Logo and title */}
        <div className="flex items-start gap-3 mb-6">
          <img
            src={logoImage}
            alt="NoteNest Logo"
            className="w-8 h-8 object-contain mt-1"
            style={{
              filter:
                'invert(45%) sepia(95%) saturate(700%) hue-rotate(183deg) brightness(95%) contrast(85%)',
            }}
          />
          <div>
            <h1 className="text-xl font-bold leading-tight">
              <span className="text-[#3b82f6]">NoteNest</span> Admin
            </h1>
            <p className="text-sm text-gray-400">Resource sharing platform</p>
          </div>
        </div>

        {/* Add spacing like user sidebar */}
        <nav className="space-y-4 mt-16">
          <SidebarLink to="/admin-dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" currentPath={currentPath} />
          <SidebarLink to="/manage-files" icon={<FileText size={18} />} label="Manage Files" currentPath={currentPath} />
          <SidebarLink to="/review-reports" icon={<Flag size={18} />} label="Review Reports" currentPath={currentPath} />
          <SidebarLink to="/user-management" icon={<Users size={18} />} label="User Management" currentPath={currentPath} />
          <SidebarLink to="/admin-analytics" icon={<BarChart2 size={18} />} label="Analytics" currentPath={currentPath} />
          <SidebarLink to="/admin-settings" icon={<Settings size={18} />} label="Settings" currentPath={currentPath} />
          <SidebarLink to="/login" icon={<LogOut size={18} />} label="Log out" currentPath={currentPath} />
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <a href={to}>
      <div
        className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-all ${
          isActive ? 'bg-white text-black font-semibold' : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </div>
    </a>
  );
};

export default AdminSidebar;
