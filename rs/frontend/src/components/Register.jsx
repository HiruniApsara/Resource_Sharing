import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.svg';

const Register = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('register');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    course: '',
    year: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const res = await axios.post('http://localhost:3001/api/users/register', {
        username: formData.username,
        displayName: formData.displayName,
        course: formData.course,
        year: parseInt(formData.year),
        password: formData.password,
      });

      setSuccessMessage('✅ Registered successfully! You can now log in.');
      setFormData({
        username: '',
        displayName: '',
        course: '',
        year: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 bg-[#2094F3] text-white flex flex-col justify-center px-12 py-10 relative overflow-hidden">
        <img
          src={loginImage}
          alt="Register Illustration"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-auto h-[60%] opacity-10 pointer-events-none"
        />
        <h1 className="text-4xl font-bold mb-6">NoteNest</h1>
        <p className="text-sm mb-6">
          Your university resource sharing platform. Upload and download study materials, notes, past papers, and more.
        </p>
        <h2 className="text-lg font-semibold mb-4">Platform Features</h2>
        <ul className="space-y-2 text-sm">
          <li>✅ University course-specific resources</li>
          <li>✅ Year-based organization (1st to 4th year)</li>
          <li>✅ File uploads with preview support</li>
          <li>✅ Save and like resources you find useful</li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center px-8 py-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Welcome to <span className="text-[#2094F3]">NoteNest</span>
          </h2>
          <p className="text-gray-500 text-sm">The student resource sharing platform for your university</p>
        </div>

        <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
          {/* Tabs */}
          <div className="flex border border-gray-700 rounded-md overflow-hidden mb-6">
            <button
              onClick={() => {
                setActiveTab('login');
                navigate('/login');
              }}
              className={`w-1/2 py-2 text-sm font-medium ${activeTab === 'login' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-1/2 py-2 text-sm font-medium ${activeTab === 'register' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'}`}
            >
              Register
            </button>
          </div>

          <p>Create a new account to start sharing resources</p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose username"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#2094F3]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input
                name="displayName"
                type="text"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#2094F3]"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 pr-10 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2094F3] appearance-none"
              >
                <option value="" disabled>Select course</option>
                <option value="bitc">BICT</option>
                <option value="bsc-it">BSc in IT</option>
                <option value="biz">Business Studies</option>
              </select>
              <div className="pointer-events-none absolute top-[38px] right-3 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative mt-4">
              <label className="text-sm font-medium">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 pr-10 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2094F3] appearance-none"
              >
                <option value="" disabled>Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              <div className="pointer-events-none absolute top-[38px] right-3 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#2094F3]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#2094F3]"
              />
            </div>
            <button type="submit" className="w-full bg-[#2094F3] hover:bg-[#1a78c2] text-white py-2 rounded-md transition">
              Register
            </button>

            {successMessage && (
              <p className="text-green-400 text-center text-sm mt-2">{successMessage}</p>
            )}

            <p className="text-sm text-center text-gray-300 mt-4">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="text-[#2094F3] cursor-pointer">
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
