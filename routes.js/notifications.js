import express from 'express';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

const router = express.Router();

// 🔹 Save user-specific notification
router.post('/receive-notification-user', async (req, res) => {
  try {
    const { username, package: pkg, title, text } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notification = new Notification({
      user: user._id,
      package: pkg,
      title,
      text
    });

    await notification.save();
    console.log("✅ Notification saved from:", username, "| Text:", text);
    res.status(201).json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('❌ Error saving notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
