const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Example protected route
router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, userId: req.user.id });
});

module.exports = router;
