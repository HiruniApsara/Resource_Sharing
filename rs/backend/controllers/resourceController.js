const Resource = require('../models/Resource');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// ✅ POST /api/resources/upload
const uploadResource = async (req, res) => {
  try {
    const { title, description, year, subject, resourceType, username } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const savedResources = await Promise.all(
      req.files.map(file => {
        const newResource = new Resource({
          title,
          description,
          year,
          subject,
          resourceType,
          fileUrl: file.path,
          username,
        });
        return newResource.save();
      })
    );

    res.status(201).json({
      message: 'Resources uploaded successfully',
      resources: savedResources,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload resources' });
  }
};

// ✅ GET /api/resources/all
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

// ✅ POST /api/resources/save
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

// ✅ GET /api/users/:username/saved
const getSavedResources = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('savedResources');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.savedResources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch saved resources' });
  }
};

// ✅ GET /api/resources/recent
const getRecentResources = async (req, res) => {
  try {
    const recent = await Resource.find().sort({ uploadedAt: -1 }).limit(2);
    res.json(recent);
  } catch (error) {
    console.error('Get recent resources error:', error);
    res.status(500).json({ message: 'Failed to fetch recent resources' });
  }
};

// ✅ PUT /api/resources/approve/:id
const approveResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved' },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource approved', resource });
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ message: 'Failed to approve resource' });
  }
};

// ✅ DELETE /api/resources/delete/:id
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.fileUrl) {
      const filePath = path.join(__dirname, '..', resource.fileUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error('File deletion error:', err);
        else console.log('File deleted:', resource.fileUrl);
      });
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete resource' });
  }
};

// ✅ POST /api/resources/:id/like
// POST /api/resources/:id/like
const likeResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({
      message: 'Liked',
      likes: resource.likes
    });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ message: 'Failed to increment like count' });
  }
};


// ✅ POST /api/resources/:id/download
const incrementDownload = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Download counted', downloads: resource.downloads });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Failed to increment download count' });
  }
};

// ✅ Export all controller functions
module.exports = {
  uploadResource,
  getResources,
  saveResource,
  getSavedResources,
  getRecentResources,
  approveResource,
  deleteResource,
  likeResource,
  incrementDownload,
};