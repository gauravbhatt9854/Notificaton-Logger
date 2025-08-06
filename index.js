import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(cors());

// Middleware to parse application/x-www-form-urlencoded
app.use(express.json()); // 
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to receive notifications
app.post('/receive-notification', (req, res) => {
    const { package: pkg, title, text } = req.body;

    console.log("📩 New Notification Received:");
    console.log(`📦 App Package: ${pkg}`);
    console.log(`📝 Title: ${title}`);
    console.log(`🔔 Text: ${text}`);
    console.log('------------------------------');

    res.status(200).send('Notification received!');
});

app.get('/', (req, res) => {
    res.status(200).send('Notification received!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
