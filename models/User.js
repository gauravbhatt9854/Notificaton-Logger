import mongoose from 'mongoose';
import Notification from './Notification';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

// ✅ Middleware: When a user is deleted, remove their notifications
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    await Notification.deleteMany({ user: this._id });
    console.log(`🗑 Deleted notifications for user: ${this.username}`);
    next();
  } catch (err) {
    console.error('❌ Error deleting notifications:', err);
    next(err);
  }
});

export default mongoose.model('User', userSchema);