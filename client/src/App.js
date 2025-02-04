import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Header from './components/Header.js'; // Import the Header component
import Map from './components/Map.js';
import EventList from './components/EventList.js';
import SearchBar from './components/SearchBar.js';
import './styles.css';

const App = () => {
    const [events, setEvents] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    // Memoize the fetchEvents function
    const fetchEvents = useCallback(async () => {
        if (!keyword && !category && !date && !location) {
            console.log('No search criteria provided. Skipping API call.');
            return;
        }

        try {
            const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';
            const response = await axios.get('http://localhost:5000/api/events', {
                params: { keyword, category, date: formattedDate, location },
            });
            console.log('API Response:', response.data);

            if (response.data._embedded && response.data._embedded.events) {
                setEvents(response.data._embedded.events);
            } else {
                console.warn('No events found in the API response');
                setEvents([]);
            }
        } catch (error) {
            console.error('Error fetching events:', error.response ? error.response.data : error.message);
            setEvents([]);
        }
    }, [keyword, category, date, location]);

    // Debounced fetchEvents function
    const debouncedFetchEvents = useCallback(
        debounce(() => {
            fetchEvents();
        }, 1000), // Increased debounce delay to 1000ms
        [fetchEvents]
    );

    // Trigger debounced fetchEvents when search criteria change
    useEffect(() => {
        debouncedFetchEvents();
    }, [keyword, category, date, location, debouncedFetchEvents]);

    // Handle keyword search
    const handleKeywordSearch = (searchQuery) => {
        setKeyword(searchQuery);
    };

    return (
        <div className="app">
            {/* Include the Header component */}
            <Header />

            <div className="search-container">
                <SearchBar
                    placeholder="Search for events..."
                    onSearch={handleKeywordSearch}
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category (e.g., music, sports)"
                    aria-label="Category"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                    aria-label="Date"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    aria-label="Location"
                />
            </div>
            {events.length === 0 ? (
                <p>No events found. Try a different search.</p>
            ) : (
                <>
                    <Map events={events} />
                    <EventList events={events} />
                </>
            )}
        </div>
    );
};

export default App;