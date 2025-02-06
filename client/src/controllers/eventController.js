import { formatDateForAPI } from "../utils/dateUtils.js";
import { fetchEventsFromAPI } from "../api/ticketmasterApi.js";

// Obtiene eventos basados en criterios de búsqueda.
export const fetchEvents = async ({ keyword, category, date, location }) => {
    if (!keyword && !category && !date && !location) {
        console.log('No search criteria provided. Skipping API call.');
        return [];
    }

    try {
        // Formatea la fecha usando la función de utilidad.
        const formattedDate = formatDateForAPI(date);

        // Prepare query parameters
        const queryParams = {
            keyword: keyword || undefined,
            category: category || undefined,
            date: formattedDate,
            location: location || undefined,
        };

        // Obtiene eventos desde la API usando los parámetros preparados.
        const events = await fetchEventsFromAPI(queryParams);
        return events;
    } catch (error) {
        console.error('Error in fetchEvents:', error.message);
        return [];
    }
};