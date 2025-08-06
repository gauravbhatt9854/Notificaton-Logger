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


// 🧾 Get all notifications by username
router.get('/notifications/:username', async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const notifications = await Notification.find({ username }).sort({ timestamp: -1 });

    res.status(200).json({ count: notifications.length, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;