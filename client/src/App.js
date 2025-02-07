import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './styles.css';

// React components
import Header from './components/layout/Header.js';
import SearchForm from './components/forms/SearchForm.jsx';
import EventDetails from './components/events/EventDetails.jsx';
import HomePage from './pages/HomePage.jsx';

// Custom hooks
import useDebouncedFetch from './hooks/useDebouncedFetch.js';


const App = () => {
    const { events, loading, error, debouncedFetch } = useDebouncedFetch();

    const handleSearch = (params) => { // Función que se ejecuta cuando se envía el formulario de búsqueda
        debouncedFetch(params); // Llama a la función debouncedFetch con los parámetros de búsqueda
    };

    return (
        <Router>
            <Header />
            <div className="search-container">
                <SearchForm onSearch={handleSearch} />
            </div>
            <Routes>
                {/* Home Page */}
                <Route
                    path="/" // Ruta de la página de inicio
                    element={
                        error ? (
                            <p>Error loading events. Please try again later.</p>
                        ) : (
                            <HomePage events={events} loading={loading} />
                        )
                    }
                />
                {/* Event Details Page */}
                <Route path="/event/:eventId" element={<EventDetails />} />
            </Routes>
        </Router>
    );
};

export default App;