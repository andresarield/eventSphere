// Importando las funciones necesarias desde otros controladores y utilidades.
import { fetchEvents } from './eventController.js';
import { fetchEventsFromAPI } from '../api/ticketmasterApi.js';

export const routesController = {
    getEvents: async (req) => {
        const { keyword, category, date, location } = req.query;
        const events = await fetchEvents({ keyword, category, date, location });
        return events;
    } catch(error) {
        console.error('Error in getEvents:', error.message);
        throw error;
    }
},