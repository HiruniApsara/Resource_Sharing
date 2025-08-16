const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  resourceId: { type: String, required: true },
  fileName: { type: String, required: true },
  reason: { type: String, required: true },
  reportedBy: { type: String, required: true },
  fileUrl: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);