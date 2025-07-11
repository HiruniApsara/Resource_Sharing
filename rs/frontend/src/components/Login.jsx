// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImage from '../assets/login.svg';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/api/users/login', formData);
      localStorage.setItem('token', res.data.token);

      if (res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 bg-[#2094F3] text-white flex flex-col justify-center px-12 py-10 relative overflow-hidden">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-auto h-[60%] opacity-10 pointer-events-none"
        />
        <h1 className="text-4xl font-bold mb-6">NoteNest</h1>
        <p className="text-sm mb-6">
          Your university resource sharing platform. Upload and download study materials, notes,
          past papers, and more.
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
          <p className="text-gray-500 text-sm">
            The student resource sharing platform for your university
          </p>
        </div>

        <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
          {/* Tabs */}
          <div className="flex border border-gray-700 rounded-md overflow-hidden mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`w-1/2 py-2 text-sm font-medium ${
                activeTab === 'login' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                navigate('/register');
              }}
              className={`w-1/2 py-2 text-sm font-medium ${
                activeTab === 'register' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'
              }`}
            >
              Register
            </button>
          </div>

          <p>Log in to access your saved resources</p>

          {/* Login Form */}
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter your username"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2094F3] text-white bg-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2094F3] text-white bg-transparent"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center mt-1">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#2094F3] hover:bg-[#1a78c2] text-white py-2 rounded-md transition"
            >
              Log In
            </button>

            <p className="text-sm text-center text-gray-300 mt-4">
              Don’t have an account?{' '}
              <span
                onClick={() => navigate('/register')}
                className="text-[#2094F3] cursor-pointer"
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
