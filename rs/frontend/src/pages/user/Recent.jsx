import Sidebar from "../../components/Sidebar";

import TopBar from '../../components/TopBar';
import { FaCloudUploadAlt} from 'react-icons/fa';
import { useState } from 'react';
import UploadModal from '../../components/UploadModal';

const Recent = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'HTML Notes',
      year: 'BICT - 3rd Year',
      viewedDate: 'May 31, 2025, 4:24 pm',
    },
    {
      id: 2,
      title: 'Python Basic Codes for Beginners',
      year: 'BICT - 4th Year',
      viewedDate: 'May 30, 2025, 6:24 pm',
    },
  ]);

  const handleRemove = (id) => {
    setResources(resources.filter((res) => res.id !== id));
  };

  return (
    <div className="flex min-h-screen">  {/* Changed from h-screen to min-h-screen */}
      <Sidebar />
      <main className="flex-1 bg-[#F7F8FB] p-6">  {/* Added consistent padding and background */}
        <Topbar />
        <div className="flex justify-between items-center mb-6">  {/* Increased mb-4 to mb-6 */}
          <h2 className="text-xl font-semibold">Recent</h2>
          <button className="bg-[#2094F3] text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2">
            <FaCloudUploadAlt /> Upload Resource
          </button>
        </div>

        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-start mb-4"  
          >
            <div>
              <h3 className="font-semibold text-black">{res.title}</h3>
              <p className="text-sm text-gray-600">{res.year}</p>
              <p className="text-xs text-gray-400">Viewed on {res.viewedDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-[#2094F3] text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600">
                Revisit
              </button>
              <button
                onClick={() => handleRemove(res.id)}
                className="text-gray-400 hover:text-red-500 text-lg font-bold"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Recent;