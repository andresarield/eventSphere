import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TICKETMASTER_API_KEY;
const API_BASE_URL = process.env.API_BASE_URL || "https://app.ticketmaster.com/discovery/v2/events.json";
const PORT = process.env.PORT || 5000;
const JWT_SECRET: string = process.env.JWT_SECRET || ''; // Tipado explícito
const MONGO_URI = process.env.MONGO_URI;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

// Validación de variables obligatorias
if (!API_KEY || !API_BASE_URL || !JWT_SECRET || !MONGO_URI) {
    throw new Error("Environment variables are missing or undefined. Check your .env file.");
}

export { API_KEY, API_BASE_URL, PORT, JWT_SECRET, MONGO_URI };