const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, displayName, course, year, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save full relative path so frontend can load image
   const profileImage = req.file ? req.file.filename : '';


    const newUser = new User({
      username,
      displayName,
      course,
      year,
      password: hashedPassword,
      profileImage,
       uploadCount: 0,
  lastActive: new Date(),
  status: 'Active',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// LOGIN Controller
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // ✅ Check for hardcoded admin
    if (username === 'admin' && password === '1234') {
      const token = jwt.sign({ username: 'admin', role: 'admin' }, 'resource_secret', { expiresIn: '1h' });
      return res.json({
        message: 'Admin login successful',
        token,
        role: 'admin',
      });
    }

    // ✅ Normal user from DB
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id, username: user.username }, 'yourSecretKey', { expiresIn: '1h' });

    res.json({
      message: 'User login successful',
      token,
      username: user.username,
      role: 'user',
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// userController.js
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      displayName: user.displayName,
      course: user.course,
      year: user.year,
       profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// DELETE USER BY USERNAME
exports.deleteUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// UPDATE USER BY USERNAME
exports.updateUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { displayName, course, year } = req.body;

    // Optional: Handle new profile image if uploaded
    const profileImage = req.file ? req.file.filename : undefined;

    // Build update object dynamically
    const updateFields = {
      ...(displayName && { displayName }),
      ...(course && { course }),
      ...(year && { year }),
      ...(profileImage && { profileImage }),
    };

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: {
        username: updatedUser.username,
        displayName: updatedUser.displayName,
        course: updatedUser.course,
        year: updatedUser.year,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// GET /api/users/:username/saved
exports.getSavedResources = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('savedResources');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedResources);
  } catch (error) {
    console.error('Fetch saved resources error:', error);
    res.status(500).json({ message: 'Failed to fetch saved resources' });
  }
};


exports.saveResource = async (req, res) => {
  try {
    const { username, resourceId } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.savedResources.includes(resourceId)) {
      user.savedResources.push(resourceId);
      await user.save();
    }

    res.status(200).json({ message: 'Resource saved successfully' });
  } catch (err) {
    console.error('Error saving resource:', err);
    res.status(500).json({ message: 'Server error' });
  }
};