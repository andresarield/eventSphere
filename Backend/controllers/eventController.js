import { formatDateForAPI, isValidDate } from "../utils/dateUtils.js";
import { fetchEventsFromAPI } from "../../Frontend/src/api/ticketmasterApi.js";

// Obtiene eventos basados en criterios de búsqueda.
export const fetchEvents = async ({ keyword, category, date, location }) => {
    console.log('Initial search criteria:', { keyword, category, date, location });

    if (!keyword && !category && !date && !location) {
        console.log('No search criteria provided. Skipping API call.');
        return [];
    }

    try {
        // Validar el formato de la fecha.
        if (date && !isValidDate(date)) {
            console.warn('Invalid date format. Skipping API call.');
            return [];
        }

        // Formatea la fecha para la API.
        const formattedDate = formatDateForAPI(date);
        console.log('Formatted date:', formattedDate);

        // Preparar los parámetros de búsqueda con valores por default para parámetros no proporcionados.
        const queryParams = {
            keyword: keyword || '',
            category: category || '',
            date: formattedDate || '',
            location: location || '',
        };

        console.log('Query parameters sent to API:', queryParams);

        // Obtiene eventos desde la API usando los parámetros preparados.
        const events = await fetchEventsFromAPI(queryParams);
        console.log('API response:', events);

        // Muestra un mensaje si no se encuentran eventos.
        if (events.length === 0) {
            console.log('No events found for the given criteria.');
        }

        return events;
    } catch (error) {
        // Maneja errores y retorna un array vacío.
        console.error('Error in fetchEvents:', error.message);
        return [];
    }
};