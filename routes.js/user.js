// routes/userRegister.js
import express from 'express';
import User from '../models/User';
const router = express.Router();

router.post('/user-register', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ exists: true });
    }

    await User.create({ username });
    return res.json({ success: true });
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;