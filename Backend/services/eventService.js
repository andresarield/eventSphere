// Importo las funciones necesarias desde otros controladores y utilidades.
import { fetchEvents } from '../controllers/eventController.js';
import { fetchEventDetails } from '../controllers/eventDetailsController.js';

// Rutas y sus funciones correspondientes.
export const eventService = {
    getEvents: async (req) => {
        console.log('Request object:', req); // Debugging
        const { keyword = '', category = '', date = '', location = '' } = req || {}; // Extrae los parámetros de búsqueda.
        console.log('Search criteria:', { keyword, category, date, location }); // Debugging

        try {
            const events = await fetchEvents({ keyword, category, date, location }); // Llama al controlador de eventos.
            return events;
        } catch (error) {
            console.error('Error fetching events:', error.message);
            throw error;
        }
    },

    getEventDetails: async (req) => {
        const { eventId } = req.params; // Extrae el ID del evento de los parámetros de la solicitud.
        try {
            const eventDetails = await fetchEventDetails(eventId); // Llama al controlador de detalles de eventos.
            return eventDetails;
        } catch (error) {
            console.error('Error fetching eventDetails:', error.message);
            throw error;
        }
    },
};

// Exporto el objeto eventService para ser utilizado en otros archivos.
export default eventService;