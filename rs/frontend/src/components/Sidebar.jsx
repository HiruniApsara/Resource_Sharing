import React from 'react';
import {
  FaBook,
  FaBookmark,
  FaClock,
  FaCog,
  FaTachometerAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser && setUser(null);
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const navItems = [
    { to: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { to: '/my-resources', icon: <FaBook />, label: 'My Resources' },
    { to: '/saved', icon: <FaBookmark />, label: 'Saved' },
    { to: '/recent', icon: <FaClock />, label: 'Recent' },
    { to: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="px-4 py-4">
          <div className="flex items-start gap-3">
            <img
              src={logoImage}
              alt="NoteNest Logo"
              className="w-8 h-8 object-contain mt-0.6"
              style={{
                filter:
                  'invert(45%) sepia(95%) saturate(700%) hue-rotate(183deg) brightness(95%) contrast(85%)',
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-blue-600 leading-tight">NoteNest</h1>
              <p className="text-xs text-gray-500 mt-1">Resource sharing platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 mt-16 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-[#2094F3]'
                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                }`}
              >
                <div className="text-lg">{item.icon}</div>
                {item.label}
              </Link>
            );
          })}

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 cursor-pointer"
          >
            <div className="text-lg">
              <FaSignOutAlt />
            </div>
            Logout
          </div>
        </nav>

        {/* Top Subjects Placeholder */}
        <div className="px-6 mt-10 text-sm text-gray-400 uppercase">Top Subjects</div>
      </div>

      {/* User Info - Clickable */}
      <div
        className="px-6 py-4 flex items-center gap-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
        onClick={handleProfileClick}
      >
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-700">Hiruni Apsara</h4>
          <p className="text-xs text-gray-500">BICT</p>
          <p>3rd Year</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
