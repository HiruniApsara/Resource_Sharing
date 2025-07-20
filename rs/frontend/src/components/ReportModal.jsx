import React, { useState } from 'react';

const baseURL = 'http://localhost:3001';

const ReportModal = ({ file, onClose, reporter }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Please enter a reason.');
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceId: file._id,
          fileName: file.title,
          reason,
          reportedBy: reporter,
          date: new Date(),
        }),
      });

      if (res.ok) {
        alert('Report submitted successfully!');
        onClose();
      } else {
        alert('Failed to submit report.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Report Resource</h2>

        <div className="mb-2">
          <p><strong>File Name:</strong> {file.title}</p>
          <p><strong>Reported by:</strong> {reporter}</p>
        </div>

        <label className="block text-sm font-medium mb-1">Reason for Report</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
          rows={4}
          placeholder="Enter the reason for reporting..."
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;