// Importo Axios para realizar solicitudes HTTP.
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/events'; // URL base del backend.

export const fetchEventDetails = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${eventId}`); // Realizo la solicitud GET al backend.
        console.log('eventDetails fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching eventDetails:', error.response ? error.response.data : error.message);
        throw error;
    }
};