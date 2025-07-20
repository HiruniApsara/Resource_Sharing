// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  resourceId: String,
  fileName: String,
  reason: String,
  reportedBy: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);