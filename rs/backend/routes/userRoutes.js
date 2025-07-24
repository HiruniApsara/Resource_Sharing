const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserByUsername,
  deleteUserByUsername,
  updateUserByUsername
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);

// ✅ Get all users (excluding passwords)
router.get('/', async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protected route example
router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, userId: req.user.id });
});

// CRUD operations by username
router.get('/:username', getUserByUsername);
router.put('/:username', upload.single('profileImage'), updateUserByUsername); // ✅ Fixed here
router.delete('/:username', deleteUserByUsername);

module.exports = router;