import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../config/env';
import { Event } from '../models/Event';

interface FetchEventsParams {
    keyword?: string;
    date?: string;
    category?: string;
    location?: string;
}

export async function fetchEvents({
    keyword,
    date,
    category,
    location,
}: FetchEventsParams): Promise<Event[]> {
    try {
        // Configuración de las fechas de inicio y fin si 'date' está presente
        const startDateTime = date ? `${date}T00:00:00Z` : undefined;
        const endDateTime = date ? `${date}T23:59:59Z` : undefined;

        // Creación de los parámetros para la solicitud
        const params: Record<string, string | undefined> = {
            apikey: API_KEY,
            keyword,
            countryCode: 'US',
            ...(startDateTime && { startDateTime }),
            ...(endDateTime && { endDateTime }),
            ...(category && { classificationName: category }),
            ...(location && { city: location }),
        };

        // Log para ver los parámetros que se envían
        console.log('URL de Ticketmaster con parámetros:', API_BASE_URL, params);

        // Solicitud a la API de Ticketmaster
        const response = await axios.get(API_BASE_URL, { params });

        // Extraemos los eventos
        const events = response.data._embedded?.events || [];

        // Log para verificar los eventos obtenidos
        console.log('Eventos obtenidos de la API:', events.map((e: any) => e.dates.start.localDate));

        // Si se ha especificado una fecha, filtramos los eventos por esa fecha
        const filteredEvents = date ? events.filter((event: any) => event.dates.start.localDate === date) : events;

        // Log para ver los eventos después del filtro por fecha (si aplica)
        console.log('Eventos después del filtro por fecha:', filteredEvents.map((e: any) => e.dates.start.localDate));

        // Devolvemos los eventos filtrados
        return filteredEvents;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}