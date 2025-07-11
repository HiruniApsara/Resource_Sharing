import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';

const subjectsByYear = {
  "1st Year": [
    "Essential of ICT",
    "Fundamentals of Computer Programming",
    "Fundamentals of Web Technology",
    "English",
    "Mathematics",
  ],
  "2nd Year": [
    "Data Structures and Algorithms",
    "Statistics for Technology",
    "Advanced Computer Programming",
    "Multimedia Design and Technologies",
    "Human Computer Interaction",
    "Fundamentals of Web Technology",
    "Computer Networks",
    "Database Management Systems",
    "Computer Graphics",
    "System Analysis and Design",
    "Accounting for Technology",
  ],
  "3rd Year": [
    "Computer Architecture and Organization",
    "Advanced Database Management Systems",
    "Advanced Web Technologies",
    "Social and Professional Issues in IT",
    "Software Engineering",
    "Information Security",
  ],
};

// Flatten all subjects into one array for searching
const allSubjects = Object.values(subjectsByYear).flat();

const ManageFiles = () => {
  const [files] = useState([
    {
      name: 'Calculus_Notes.pdf',
      uploadedBy: 'John Doe',
      courseYear: 'Math/2023',
      uploadDate: '2025-05-30',
      likes: 50,
      downloads: 120,
      status: 'Approved',
    },
    {
      name: 'Physics_2023.pdf',
      uploadedBy: 'Jane Smith',
      courseYear: 'Physics/2024',
      uploadDate: '2025-05-29',
      likes: 30,
      downloads: 80,
      status: 'Pending',
    },
  ]);

  const [subjectInput, setSubjectInput] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef();

  // Filter subjects as user types
  useEffect(() => {
    if (subjectInput.trim() === '') {
      setFilteredSubjects([]);
      setShowSuggestions(false);
    } else {
      const filtered = allSubjects.filter(subject =>
        subject.toLowerCase().includes(subjectInput.toLowerCase())
      );
      setFilteredSubjects(filtered);
      setShowSuggestions(true);
    }
  }, [subjectInput]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When user clicks a suggestion
  const onSuggestionClick = (subject) => {
    setSubjectInput(subject);
    setShowSuggestions(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Manage Files</h1>

        {/* Filters */}
        <div className="bg-[#1e293b] p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 mb-4 relative">
            {/* Subject Input with autocomplete */}
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

            {/* Status select */}
            <select className="bg-[#0f172a] text-white border border-gray-600 px-3 py-2 rounded text-sm">
              <option>All Statuses</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Flagged</option>
            </select>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-2">File Name</th>
                <th className="p-2">Uploaded by</th>
                <th className="p-2">Course/Year</th>
                <th className="p-2">Upload Date</th>
                <th className="p-2">Likes / Downloads</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-[#334155]">
                  <td className="p-2">{file.name}</td>
                  <td className="p-2">{file.uploadedBy}</td>
                  <td className="p-2">{file.courseYear}</td>
                  <td className="p-2">{file.uploadDate}</td>
                  <td className="p-2">
                    {file.likes} / {file.downloads}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        file.status === 'Approved'
                          ? 'bg-green-700 text-white'
                          : 'bg-yellow-600 text-white'
                      }`}
                    >
                      {file.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2 text-sm">
                      <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                        <FaEye />
                        View
                      </button>
                      <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                        <FaCheck />
                        Approve
                      </button>
                      <button className="flex items-center gap-1 text-red-400 hover:text-red-300">
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageFiles;
