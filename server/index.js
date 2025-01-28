const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
    try {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.API_KEY}&keyword=${req.query.keyword}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});