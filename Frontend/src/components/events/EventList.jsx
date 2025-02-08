import React from 'react';

const EventList = React.memo(({ events }) => {
    return (
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
    );
});

export default EventList;