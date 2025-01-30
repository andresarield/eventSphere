import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events?keyword=music')
            .then(response => setEvents(response.data._embedded.events))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;