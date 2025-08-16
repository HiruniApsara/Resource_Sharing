import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';

const ManageFiles = () => {
  const [resources, setResources] = useState([]);
  const [subjectInput, setSubjectInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef();

  // 📌 Fetch resources from backend
  const fetchResources = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/resources/all');
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // 📌 Filtered Subjects
  const allSubjects = [
    ...new Set(resources.map((res) => res.subject).filter(Boolean)),
  ];

  useEffect(() => {
    if (subjectInput.trim() === '') {
      setFilteredSubjects([]);
      setShowSuggestions(false);
    } else {
      const filtered = allSubjects.filter((subject) =>
        subject.toLowerCase().includes(subjectInput.toLowerCase())
      );
      setFilteredSubjects(filtered);
      setShowSuggestions(true);
    }
  }, [subjectInput, allSubjects]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSuggestionClick = (subject) => {
    setSubjectInput(subject);
    setShowSuggestions(false);
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/resources/approve/${id}`, {
        method: 'PUT',
      });
      fetchResources(); // Refresh list
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/resources/delete/${id}`, {
        method: 'DELETE',
      });
      fetchResources(); // Refresh list
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // ✅ Filter based on subject and status
  const filteredResources = resources.filter((res) => {
    const matchesSubject =
      !subjectInput || res.subject?.toLowerCase().includes(subjectInput.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || res.status === statusFilter;
    return matchesSubject && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Manage Files</h1>

        {/* Filters */}
        <div className="bg-[#1e293b] p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 mb-4 relative">
            {/* Subject Input */}
            <div className="w-64 relative" ref={suggestionsRef}>
              <input
                type="text"
                placeholder="All Subjects"
                className="bg-[#0f172a] text-white border border-gray-600 px-3 py-2 rounded text-sm w-full"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onFocus={() => {
                  if (filteredSubjects.length > 0) setShowSuggestions(true);
                }}
              />
              {showSuggestions && filteredSubjects.length > 0 && (
                <ul className="absolute z-10 bg-[#1e293b] max-h-48 overflow-y-auto w-full rounded shadow mt-1 border border-gray-600">
                  {filteredSubjects.map((subject, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-600"
                      onClick={() => onSuggestionClick(subject)}
                    >
                      {subject}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Status filter */}
            <select
              className="bg-[#0f172a] text-white border border-gray-600 px-3 py-2 rounded text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>

          {/* File Table */}
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Uploaded by</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Date</th>
                <th className="p-2">Likes / Downloads</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((res) => (
                <tr
                  key={res._id}
                  className="border-t border-gray-700 hover:bg-[#334155]"
                >
                  <td className="p-2">{res.title}</td>
                  <td className="p-2">{res.username}</td>
                  <td className="p-2">{res.subject}</td>
                  <td className="p-2">
                    {new Date(res.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {res.likes || 0} / {res.downloads || 0}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        res.status === 'Approved'
                          ? 'bg-green-700'
                          : 'bg-yellow-600'
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 text-sm">
                      <a
                        href={`http://localhost:3001/${res.fileUrl.replace(/\\/g, '/')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                      >
                        <FaEye /> View
                      </a>
                      <button
                        className="flex items-center gap-1 text-green-400 hover:text-green-300"
                        onClick={() => handleApprove(res._id)}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="flex items-center gap-1 text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(res._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredResources.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-400">
                    No resources found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageFiles;
