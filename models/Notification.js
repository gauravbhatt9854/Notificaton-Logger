import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  package: { type: String },
  title: { type: String },
  text: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);