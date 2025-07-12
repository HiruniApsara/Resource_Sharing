const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResource, getResources } = require('../controllers/resourceController');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST - upload resource
// In your router file
router.post('/upload', upload.array('files'), uploadResource);

// GET - all uploaded resources
router.get('/all', getResources);

module.exports = router;
