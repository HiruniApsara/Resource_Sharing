const express = require('express');
const router = express.Router();
const { getDashboardStats, getRecentUploads, getRecentReports } = require('../controllers/dashboardController');

router.get('/stats', getDashboardStats);
router.get('/recent-uploads', getRecentUploads);
router.get('/recent-reports', getRecentReports);

module.exports = router;