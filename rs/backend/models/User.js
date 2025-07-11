const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
