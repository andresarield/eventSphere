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
        const response = await axios.get(API_BASE_URL, {
            params: {
                apikey: API_KEY,
                countryCode: "US",
                ...(keyword && { keyword }),  // Si keyword está presente, incluirlo
                ...(date && { "dates.start.localDate": date }),
                ...(category && { classificationName: category }),
                ...(location && { city: location }),
            },
        });

        return response.data._embedded?.events || [];
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}