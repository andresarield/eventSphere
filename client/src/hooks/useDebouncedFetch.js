import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchEvents } from '../controllers/eventController.js';

const useDebouncedFetch = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEventData = useCallback(async (params) => {
        setLoading(true);
        const fetchedEvents = await fetchEvents(params);
        setEvents(fetchedEvents);
        setLoading(false);
    }, []);

    const debouncedFetch = useCallback(
        debounce((params) => {
            fetchEventData(params);
        }, 1000),
        [fetchEventData]
    );

    return { events, loading, debouncedFetch };
};

export default useDebouncedFetch;