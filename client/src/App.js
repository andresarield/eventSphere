import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map.js';
import './styles.css';

const App = () => {
    const [events, setEvents] = useState([]);
    const [keyword, setKeyword] = useState('music');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events', {
                params: { keyword, category, date, location },
            });
            setEvents(response.data._embedded.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [keyword, category, date, location]);

    return (
        <div className="app">
            <h1>EventSphere</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search for events..."
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category (e.g., music, sports)"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                />
                <button onClick={fetchEvents}>Search</button>
            </div>
            <Map events={events} />
            <div className="events-list">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <img
                            src={event.images.find((img) => img.ratio === '16_9').url}
                            alt={event.name}
                            className="event-image"
                        />
                        <div className="event-details">
                            <h2>{event.name}</h2>
                            <p>{event.dates.start.localDate}</p>
                            <a href={event.url} target="_blank" rel="noopener noreferrer">
                                Buy Tickets
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;