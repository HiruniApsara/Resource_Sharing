const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],

  // Additional for admin management
  uploadCount: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' }, // optional
});

module.exports = mongoose.model('User', userSchema);