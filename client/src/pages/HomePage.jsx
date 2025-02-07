import React from 'react';
import Map from '../components/events/Map.jsx';
import EventList from '../components/events/EventList.jsx';

const HomePage = ({ events, loading }) => {
    if (loading) {
        return <p>Loading...</p>; // Muestra un mensaje mientras se cargan los datos.
    }

    if (events.length === 0) {
        return <p>Events not found. Try another search...</p>; // Mensaje si no hay eventos.
    }

    return (
        <>
            <Map events={events} />
            <EventList events={events} />
        </>
    );
};

export default HomePage;