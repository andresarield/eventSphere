import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import routesController from '../../controllers/routesController.js';
import '../../assets/styles/EventDetails.css';

const EventDetails = () => {
    const navigate = useNavigate(); // Hook para navegar entre páginas.
    const { eventId } = useParams(); // Obtiene el ID del evento de los parámetros de la URL.
    const [eventDetails, setEventDetails] = useState(null); // Estado para almacenar los detalles del evento.
    const [loading, setLoading] = useState(true); // Estado para manejar la carga.
    const [error, setError] = useState(null); // Estado para manejar errores.

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true); // Activa el estado de carga.
                const details = await routesController.getEventDetails({ params: { eventId } }); // Obtiene los detalles del evento.
                setEventDetails(details); // Almacena los detalles en el estado.
            } catch (err) {
                console.error('Error fetching event details:', err.message);
                setError('Failed to load event details.');
            } finally {
                setLoading(false); // Desactiva el estado de carga.
            }
        };
        fetchEventDetails();
    }, [eventId]); // Se ejecuta cuando el ID del evento cambia.

    if (loading) {
        return <p>Loading Event Details...</p>;
    }

    if (error) {
        return (
            // Muestra un mensaje de error y un botón para reintentar. Mejora UX al dar la opción de recuperarse de errores.
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="event-details">
            {/* Botón para regresar a la lista de eventos */}
            <button onClick={() => navigate(-1)} className="back-button" aria-label="Go back">
                ← Back
            </button>
            {/* Muestra la imagen del evento si está disponible. Mejora la presentación visual del evento al incluir imgs */}
            {eventDetails?.images?.[0]?.url && (
                <img
                    src={eventDetails.images[0].url}
                    alt={`Image for ${eventDetails.name}`}
                    className="event-image"
                />
            )}
            <h1>{eventDetails?.name || 'Without name'}</h1>
            <p><strong>Date:</strong> {eventDetails?.dates?.start?.localDate || 'Date not available'}</p>
            <p><strong>Location:</strong> {eventDetails?._embedded?.venues?.[0]?.name || 'Location not available'}</p>
            <p><strong>Description:</strong> {eventDetails?.description || 'Description not available'}</p>
        </div>
    );
};

export default EventDetails;