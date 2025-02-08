import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import eventService from '../../../Backend/services/eventService.js';

const useDebouncedFetch = (debounceTime = 1000) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEventData = useCallback(async (params) => {
        console.log('Params received in fetchEventData:', params); // Debugging
        const controller = new AbortController();
        try {
            setLoading(true);
            setError(null); // Borra errores previops.
            const fetchedEvents = await eventService.getEvents({ ...params, signal: controller.signal });
            setEvents(fetchedEvents);

            if (process.env.NODE_ENV === 'development') {
                console.log('Fetched Events:', fetchedEvents);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error fetching events:', error.message);
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }

        return () => controller.abort(); // Limpia el controlador cuando se desmonta el componente.
    }, []);

    const debouncedFetch = useCallback(
        debounce((params) => {
            fetchEventData(params);
            console.log('Params received in debouncedFetch:', params); // Debugging
        }, debounceTime),
        [fetchEventData, debounceTime]
    );

    return { events, loading, error, debouncedFetch };
};

export default useDebouncedFetch;