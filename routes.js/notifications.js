import express from 'express';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

const router = express.Router();

// username -> userId cache
const userCache = new Map();

router.post('/receive-notification-user', async (req, res) => {
  try {
    const { username, package: pkg, title, text } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // 1. Check cache first
    let userId = userCache.get(username);

    // 2. Cache miss → check database
    if (!userId) {
      const user = await User.findOne({ username }).select('_id');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      userId = user._id;

      // 3. Save for future requests
      userCache.set(username, userId);
    }

    // 4. Directly save notification
    const notification = new Notification({
      user: userId,
      package: pkg,
      title,
      text
    });

    await notification.save();

    console.log('✅ Notification saved from:', username, '| Text:', text);

    res.status(201).json({
      message: 'Notification saved successfully'
    });

  } catch (error) {
    console.error('❌ Error saving notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
