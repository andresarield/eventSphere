import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TICKETMASTER_API_KEY;
const API_BASE_URL = process.env.API_BASE_URL || "https://app.ticketmaster.com/discovery/v2/events.json";
const PORT = process.env.PORT || 5000;

if (!API_KEY || !API_BASE_URL) {
    throw new Error("Environment variables are missing or undefined. Check your .env file.");
}

export { API_KEY, API_BASE_URL, PORT };