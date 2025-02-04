import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash'; // For debouncing
import Map from './components/Map.js';
import EventList from './components/EventList.js'; // Import the EventList component
import SearchBar from './components/SearchBar.js'; // Import the SearchBar component
import './styles.css';

const App = () => {
    const [events, setEvents] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    // Memoize the fetchEvents function
    const fetchEvents = useCallback(async () => {
        try {
            const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';
            const response = await axios.get('http://localhost:5000/api/events', {
                params: { keyword, category, date: formattedDate, location },
            });
            console.log('API Response:', response.data); // Log the full API response

            if (response.data._embedded && response.data._embedded.events) {
                setEvents(response.data._embedded.events); // Set events if found
            } else {
                console.warn('No events found in the API response');
                setEvents([]); // Set events to an empty array if no events are found
            }
        } catch (error) {
            console.error('Error fetching events:', error.response ? error.response.data : error.message); // Log detailed error
            setEvents([]); // Set events to an empty array in case of an error
        }
    }, [keyword, category, date, location]);

    // Debounced fetchEvents function
    const debouncedFetchEvents = useCallback(
        debounce(() => {
            fetchEvents();
        }, 500), // 500ms debounce delay
        [fetchEvents]
    );

    // Trigger debounced fetchEvents when search criteria change
    useEffect(() => {
        debouncedFetchEvents();
    }, [keyword, category, date, location, debouncedFetchEvents]);

    // Handle keyword search
    const handleKeywordSearch = (searchQuery) => {
        setKeyword(searchQuery); // Update the keyword state
    };

    return (
        <div className="app">
            <h1>EventSphere</h1>
            <div className="search-container">
                {/* SearchBar for keyword search */}
                <SearchBar
                    placeholder="Search for events..."
                    onSearch={handleKeywordSearch}
                />
                {/* Other search inputs */}
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
                <p>No events found. Try a different search.</p> // Display message if no events are found
            ) : (
                <>
                    <Map events={events} />
                    <EventList events={events} /> {/* Use a separate EventList component */}
                </>
            )}
        </div>
    );
};

export default App;