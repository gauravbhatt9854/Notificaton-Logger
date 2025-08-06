import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import NotificationRouter from './routes.js/notifications.js';


const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(NotificationRouter);
await connectDB();


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});