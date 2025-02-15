import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../config/envConfig';

interface FetchEventsParams {
    keyword?: string;
    date?: string; // Fecha en formato YYYY-MM-DD
    category?: string;
    location?: string;
}

export async function fetchEvents({
    keyword,
    date,
    category,
    location,
}: FetchEventsParams): Promise<any[]> {
    try {
        // Configuración del rango de fechas si 'date' está presente
        const localStartEndDateTime = date ? `${date}T00:00:00,${date}T23:59:59` : undefined;

        // Creación de los parámetros para la solicitud
        const params: Record<string, any> = {
            apikey: API_KEY,
            keyword,
        };

        if (localStartEndDateTime) params['localStartEndDateTime'] = localStartEndDateTime;
        if (category) params['classificationName'] = category;
        if (location) params['city'] = location;

        // Log para ver los parámetros que se envían
        console.log('URL de Ticketmaster con parámetros:', API_BASE_URL, params);

        // Solicitud a la API de Ticketmaster
        const response = await axios.get(API_BASE_URL, { params });

        // Extraemos los eventos
        const events = response.data._embedded?.events || [];

        // Log para verificar los eventos obtenidos
        console.log('Eventos obtenidos de la API:', events.map((e: any) => ({
            id: e.id,
            name: e.name,
            localDate: e.dates.start.localDate,
        })));

        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}