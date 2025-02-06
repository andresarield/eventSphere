import axios from 'axios';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json'; // URL base del backend.

// Realiza una peticion GET para obtener eventos desde la API.
export const fetchEventsFromAPI = async (params) => {
    try {
        const response = await axios.get(BASE_URL, { params }); // Realiza la petición con los parámetros proporcionados.
        console.log('API response:', response.data); // Muestra la respuesta de la API en la consola.
        return response.data._embedded?.events || []; // Retorna los eventos o un array vacío si no hay datos.
    } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message); // Maneja errores.
        throw error; // Relanza el error para manejarlo en el controlador.
    }
};