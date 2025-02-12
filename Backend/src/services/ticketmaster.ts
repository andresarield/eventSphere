import axios from "axios";
import { API_KEY, API_BASE_URL } from "../config/env";
import { Event } from "../models/Event";

interface FetchEventsParams {
    keyword?: string;
    date?: string;
    category?: string;
    location?: string;
}

export async function fetchEvents({ keyword, date, category, location }: FetchEventsParams): Promise<Event[]> {
    try {
        const startDateTime = date ? `${date}T00:00:00Z` : undefined;
        const endDateTime = date ? `${date}T23:59:59Z` : undefined;

        const params: Record<string, string | undefined> = {
            apikey: API_KEY,
            keyword,
            countryCode: "US",
            ...(startDateTime && { startDateTime }),
            ...(endDateTime && { endDateTime }),
            ...(category && { classificationName: category }),
            ...(location && { city: location }),
        };

        console.log("URL de Ticketmaster con parámetros:", API_BASE_URL, params);

        const response = await axios.get(API_BASE_URL, { params });

        const events = response.data._embedded?.events || [];

        console.log("Eventos obtenidos de la API:", events.map((e: any) => e.dates.start.localDate));

        // 🔥 Filtrar eventos por la fecha exacta deseada
        const filteredEvents = events.filter((event: any) => event.dates.start.localDate === date);

        console.log("Eventos después del filtro:", filteredEvents.map((e: any) => e.dates.start.localDate));

        return filteredEvents;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}