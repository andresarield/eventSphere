import React, { useEffect, useState } from 'react';

const MyEvents: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchLikedEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/users/liked-events', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error('Error fetching liked events:', error);
            }
        };
        fetchLikedEvents();
    }, []);

    return (
        <div>
            <h1>Mis Eventos</h1>
            {events.length > 0 ? (
                events.map((event: any) => (
                    <div key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.dates.start.localDate}</p>
                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                            Más información
                        </a>
                    </div>
                ))
            ) : (
                <p>No hay eventos favoritos.</p>
            )}
        </div>
    );
};

export default MyEvents;