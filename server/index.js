require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

const apiKey = process.env.API_KEY;

console.log('API Key:', apiKey); // Log the API key to the console

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
    try {
        const { keyword, category, date, location } = req.query;
        let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.API_KEY}`;

        if (keyword) apiUrl += `&keyword=${keyword}`;
        if (category) apiUrl += `&classificationName=${category}`;
        if (date) apiUrl += `&localDate=${date}`;
        if (location) apiUrl += `&city=${location}`;
        
        console.log('Fetching data from:', apiUrl); // Log the API URL being called

        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching events:', error.message); // Log the exact error
        res.status(500).json({ error: 'Failed to fetch events', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});