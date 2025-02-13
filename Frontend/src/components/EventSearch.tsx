import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import '../styles/EventSearch.css'; // Importar estilos

const EventSearch: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [events, setEvents] = useState<any[]>([]);
    const navigate = useNavigate();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Buscando eventos...");
        const queryParams: string[] = [];
        if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
        if (selectedDate) queryParams.push(`date=${selectedDate.toISOString().split('T')[0]}`);
        if (category) queryParams.push(`category=${encodeURIComponent(category)}`);
        if (location) queryParams.push(`location=${encodeURIComponent(location)}`);

        const query = queryParams.join('&');
        console.log("Query construida:", query);

        if (!query) {
            console.log("No hay filtros, redirigiendo a /events");
            navigate("/events");
            return;
        }

        try {
            const response = await fetch(`/api/events?${query}`);
            const data = await response.json();
            console.log("Datos recibidos:", data);
            setEvents(data);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Buscar Eventos</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Artista o evento"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="input"
                />
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecciona una fecha"
                    className="date-picker"
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Ubicación"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input"
                />
                <button type="submit" className="button">Buscar Eventos</button>
            </form>

            {events.length > 0 ? (
                <div className="results-container">
                    {events.map((event: any) => (
                        <div key={event.id} className="event-card">
                            {/* Mostrar la primera imagen disponible */}
                            {event.images && event.images.length > 0 && (
                                <img src={event.images[0].url} alt={event.name} className="event-image" />
                            )}
                            <h3>{event.name}</h3>
                            <p>Fecha: {event.dates.start.localDate}</p>
                            <a href={event.url} target="_blank" rel="noopener noreferrer" className="link">
                                Más información
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-results">No se encontraron eventos.</p>
            )}
        </div>
    );
};

export default EventSearch;