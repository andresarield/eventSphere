// Importo las funciones necesarias desde otros controladores y utilidades.
import { fetchEvents } from './eventController.js';
import { fetchEventDetails } from './eventDetailsController.js';

// Rutas y sus funciones correspondientes.
export const routesController = {
    getEvents: async (req) => {
        const { keyword, category, date, location } = req.query; // Extrae los parámetros de búsqueda.
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

// Exporto el objeto routesController para ser utilizado en otros archivos.
export default routesController;