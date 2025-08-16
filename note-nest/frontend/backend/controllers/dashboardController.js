const Resource = require('../models/Resource');
const Report = require('../models/Report');

// Helper function to get weekly uploads count per day (last 7 days)
const getWeeklyUploads = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 6); // Last 7 days including today

  // Aggregate uploads grouped by date string YYYY-MM-DD
  const uploads = await Resource.aggregate([
    {
      $match: {
        uploadedAt: { $gte: weekAgo }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$uploadedAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Fill missing dates with zero counts for consistent 7-day data
  const results = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekAgo);
    date.setDate(weekAgo.getDate() + i);
    const dateString = date.toISOString().slice(0, 10);

    const found = uploads.find(u => u._id === dateString);
    results.push({
      date: dateString,
      count: found ? found.count : 0
    });
  }

  return results;
};

// Summary stats for dashboard
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const totalToday = await Resource.countDocuments({ uploadedAt: { $gte: today } });
    const totalWeek = await Resource.countDocuments({ uploadedAt: { $gte: weekAgo } });
    const mostDownloaded = await Resource.findOne().sort({ downloads: -1 });
    const reportsPending = await Report.countDocuments({ status: 'pending' });

    const weeklyUploads = await getWeeklyUploads();

    res.json({
      totalToday,
      totalWeek,
      mostDownloaded,
      reportsPending,
      weeklyUploads
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
};

// Recent uploaded resources
const getRecentUploads = async (req, res) => {
  try {
    const uploads = await Resource.find()
      .sort({ uploadedAt: -1 })
      .limit(5);
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recent uploads' });
  }
};

// Recent reports pending review
const getRecentReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ date: -1 })
      .limit(5);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};

module.exports = {
  getDashboardStats,
  getRecentUploads,
  getRecentReports,
};