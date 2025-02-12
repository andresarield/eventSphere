import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventSearch from './components/EventSearch';

const App: React.FC = () => {
  return (
    <div>
      <h1>EventSphere</h1>
      <Routes>
        <Route path="/" element={<EventSearch />} /> {/* Página de búsqueda de eventos */}
        <Route path="/events" element={<EventSearch />} /> {/* Página de todos los eventos */}
      </Routes>
    </div>
  );
};

export default App;