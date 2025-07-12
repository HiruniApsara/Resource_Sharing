const Resource = require('../models/Resource');
const User = require('../models/User');

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



// POST /api/resources/save
const saveResource = async (req, res) => {
  const { username, resourceId } = req.body;

  try {
    const user = await User.findOne({ username });
    const resource = await Resource.findById(resourceId);

    if (!user || !resource) {
      return res.status(404).json({ message: 'User or Resource not found' });
    }

    if (!user.savedResources.includes(resourceId)) {
      user.savedResources.push(resourceId);
      await user.save();
    }

    res.status(200).json({ message: 'Resource saved successfully' });
  } catch (error) {
    console.error('Error saving resource:', error);
    res.status(500).json({ message: 'Failed to save resource' });
  }
};
// GET /api/users/:userId/saved
const getSavedResources = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('savedResources');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.savedResources); // ✅ should return an array
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch saved resources' });
  }
};


module.exports = {
  uploadResource,
  getResources,
  saveResource,
  getSavedResources
};

