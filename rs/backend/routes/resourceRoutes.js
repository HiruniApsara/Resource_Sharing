const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResource, getResources, saveResource, getSavedResources, getRecentResources, approveResource, deleteResource,  likeResource, incrementDownload } = require('../controllers/resourceController');

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


// POST - save a resource
router.post('/save', saveResource);

// GET - saved resources for user
// Correct — you're fetching by username
router.get('/saved/:username', getSavedResources);


router.get('/recent', getRecentResources);


router.put('/approve/:id', approveResource);
router.delete('/delete/:id', deleteResource);


router.post('/:id/like', likeResource);
router.post('/:id/download', incrementDownload);



module.exports = router;