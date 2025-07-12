const Resource = require('../models/Resource');

// POST /api/resources/upload
const uploadResource = async (req, res) => {
  try {
    const { title, description, year, subject, resourceType, username } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Create a Resource document for each uploaded file
    const savedResources = await Promise.all(
      req.files.map(file => {
        const newResource = new Resource({
          title,
          description,
          year,
          subject,
          resourceType,
          fileUrl: file.path,  // multer stores uploaded file info here
          username,
        });
        return newResource.save();
      })
    );

    res.status(201).json({ message: 'Resources uploaded successfully', resources: savedResources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload resources' });
  }
};

// GET /api/resources/all
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

module.exports = {
  uploadResource,
  getResources
};