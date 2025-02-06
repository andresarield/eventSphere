const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

const apiKey = process.env.API_KEY;

console.log('API Key:', apiKey);

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
    try {
        const { keyword, category, date, location } = req.query;
        let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.API_KEY}`;

        if (keyword) apiUrl += `&keyword=${keyword}`;
        if (category) apiUrl += `&classificationName=${category}`;
        if (date) apiUrl += `&startDateTime=${date}&endDateTime=${date}`;
        if (location) apiUrl += `&city=${location}`;

        console.log('Fetching data from:', apiUrl);

        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ error: 'Failed to fetch events', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});