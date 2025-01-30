require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

console.log('API Key:', process.env.API_KEY); // Debug: Check if API_KEY is loaded

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
    try {
        const keyword = req.query.keyword || 'music';
        const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.API_KEY}&keyword=${keyword}`;
        
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