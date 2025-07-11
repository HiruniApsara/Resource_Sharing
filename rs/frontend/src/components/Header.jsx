// Header.jsx
import React from 'react';
import logoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = ({ scrollToAbout, scrollToFeatures, scrollToContact }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-[#020d23] py-4 px-8 shadow-lg text-white w-full sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="NoteNest Logo"
            className="w-8 h-8 object-contain"
            style={{
              filter:
                'invert(28%) sepia(92%) saturate(2990%) hue-rotate(195deg) brightness(96%) contrast(92%)',
            }}
          />
          <button 
            onClick={handleHomeClick}
            className="text-xl font-bold hover:text-[#2094F3] transition"
          >
            NoteNest
          </button>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 items-center text-sm font-medium">
            <li>
              <button 
                onClick={handleHomeClick}
                className="hover:text-[#2094F3] transition"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={scrollToAbout}
                className="hover:text-[#2094F3] transition"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={scrollToFeatures}
                className="hover:text-[#2094F3] transition"
              >
                Features
              </button>
            </li>
            <li>
              <button 
                onClick={scrollToContact}
                className="hover:text-[#2094F3] transition"
              >
                Contact
              </button>
            </li>
            <li>
              <a
                href="/login"
                className="bg-[#2094F3] hover:bg-[#1b7cd0] text-white px-5 py-2 rounded-md transition duration-200"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="bg-[#2094F3] hover:bg-[#1b7cd0] text-white px-5 py-2 rounded-md transition duration-200"
              >
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;