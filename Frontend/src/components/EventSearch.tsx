import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const EventSearch: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [events, setEvents] = useState<any[]>([]);
    const navigate = useNavigate();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSearch = async () => {
        console.log("Buscando eventos..."); // <-- Verificar si se ejecuta
        
        let query = '';
        
        if (keyword) query += `keyword=${keyword}`;
        if (selectedDate) query += `&date=${selectedDate.toISOString().split('T')[0]}`; // Sólo la fecha (sin hora)
        if (category) query += `&category=${category}`;
        if (location) query += `&location=${location}`;
    
        console.log("Query construida:", query); // <-- Verificar la query construida
    
        if (!query) {
            console.log("No hay filtros, redirigiendo a /events");
            navigate("/events");  
            return;
        }
    
        try {
            const response = await fetch(`/api/events?${query}`);
            const data = await response.json();
            
            console.log("Datos recibidos:", data); // <-- Verificar la respuesta
    
            setEvents(data);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };
    

    return (
        <div>
            <input
                type="text"
                placeholder="Search by keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
            />
            <input
                type="text"
                placeholder="Search by category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search Events</button>

            <div>
                {events.length > 0 ? (
                    events.map((event: any) => (
                        <div key={event.id}>
                            <h3>{event.name}</h3>
                            <p>{event.dates.start.localDate}</p>
                            <a href={event.url} target="_blank" rel="noopener noreferrer">More info</a>
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default EventSearch;