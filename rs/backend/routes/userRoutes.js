const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserByUsername } = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.post('/register', upload.single('profileImage'), registerUser);

router.post('/login', loginUser);

// Example protected route
router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, userId: req.user.id });
});


router.get('/:username', getUserByUsername);


module.exports = router;
