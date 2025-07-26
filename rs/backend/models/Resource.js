const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: String, required: true },
  subject: { type: String, required: true },
  resourceType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  username: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  downloads: { type: Number, default: 0 },        // ✅ Download count
  likes: { type: Number, default: 0 }
      // ✅ Like users
});

module.exports = mongoose.model('Resource', resourceSchema);