import express from 'express';
import { getEvents } from './controllers/eventController';

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/events", getEvents);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});