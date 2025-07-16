const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  password: { type: String, required: true },
   profileImage: { type: String },
  savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
});

module.exports = mongoose.model('User', userSchema);
