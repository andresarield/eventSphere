// App.js
import React from 'react';
import Header from './components/layout/Header.js';
import Map from './components/events/Map.jsx';
import EventList from './components/events/EventList.jsx';
import SearchForm from './components/forms/SearchForm.jsx';
import useDebouncedFetch from './hooks/useDebouncedFetch.js';
import 'leaflet/dist/leaflet.css';
import './styles.css';

const App = () => {
    const { events, loading, debouncedFetch } = useDebouncedFetch();

    const handleSearch = (params) => {
        debouncedFetch(params);
    };

    return (
        <div className="app">
            <Header />
            <div className="search-container">
                <SearchForm onSearch={handleSearch} />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : events.length === 0 ? (
                <p>No events found. Try a different search.</p>
            ) : (
                <>
                    <Map events={events} />
                    <EventList events={events} />
                </>
            )}
        </div>
    );
};

export default App;