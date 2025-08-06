import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

router.post('/receive-notification', (req, res) => {
    const { package: pkg, title, text } = req.body;

    console.log("📩 New Notification Received:");
    console.log(`📦 App Package: ${pkg}`);
    console.log(`📝 Title: ${title}`);
    console.log(`🔔 Text: ${text}`);
    console.log('------------------------------');

    res.status(200).send('Notification received!');
});

router.post('/receive-notification-user', async (req, res) => {
  try {
    const { username, package: pkg, title, text } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const notification = new Notification({
      username,
      package: pkg,
      title,
      text
    });

    await notification.save();
    console.log("Notification saved successfully from : " , username , " and text is " , text);
    res.status(201).json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /notifications/:username?page=1&limit=6&packageName=samsung&startDate=2025-08-01&endDate=2025-08-06
router.get('/notifications/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { page = 1, limit = 9, start, end, package: pkg } = req.query;

    const query = { username };
    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }
    if (pkg) query.package = pkg;

    const total = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const allPackages = await Notification.distinct("package", { username });

    res.json({
      notifications,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      allPackages
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});






export default router;