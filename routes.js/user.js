import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello server is running - Notification Backend Logic");
})

router.post('/user-register', async (req, res) => {
  console.log('📥 Received user registration request');

  const { username } = req.body;
  console.log('📦 Request Body:', req.body);

  if (!username) {
    console.warn('⚠️ Username not provided in request');
    return res.status(400).json({ error: 'Username required' });
  }

  console.log(`🔍 Checking if username "${username}" already exists...`);

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log(`✅ Username "${username}" already exists`);
      return res.json({ exists: true });
    }

    console.log(`🆕 Creating new user with username "${username}"`);
    await User.create({ username });

    console.log(`🎉 User "${username}" registered successfully`);
    return res.json({ success: true });
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
