import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.js';
import Map from './components/events/Map.jsx';
import EventList from './components/events/EventList.jsx';
import SearchForm from './components/forms/SearchForm.jsx';
import EventDetails from './components/events/EventDetails.jsx';
import useDebouncedFetch from './hooks/useDebouncedFetch.js';
import 'leaflet/dist/leaflet.css';
import './styles.css';

const App = () => {
    const { events, loading, debouncedFetch } = useDebouncedFetch();
    const handleSearch = (params) => {
        debouncedFetch(params);
    };

    return (
        <Router>
            <Header />
            <div className="search-container">
                <SearchForm onSearch={handleSearch} />
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {loading ? (
                                <p>Loading...</p> // Muestra un mensaje mientras se cargan los datos.
                            ) : events.length === 0 ? (
                                <p>Events not found. Try another search...</p> // Mensaje si no hay eventos.
                            ) : (
                                <>
                                    <Map events={events} />
                                    <EventList events={events} />
                                </>
                            )}
                        </>
                    }
                />
                <Route path="/event/:eventId" element={<EventDetails />} />
            </Routes>
        </Router>
    );
};

export default App;