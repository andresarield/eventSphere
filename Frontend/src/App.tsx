import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo importa Routes y Route
import EventSearch from './components/EventSearch';
import MyEvents from './pages/MyEvents';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Routes>
            {/* Ruta pública para buscar eventos */}
            <Route path="/" element={<EventSearch />} />

            {/* Ruta pública para iniciar sesión */}
            <Route path="/login" element={<Login />} />

            {/* Ruta protegida para "Mis Eventos" */}
            <Route
                path="/my-events"
                element={
                    <PrivateRoute>
                        <MyEvents />
                    </PrivateRoute>
                }
            />

            {/* Redirigir a la página principal si la ruta no existe */}
            <Route path="*" element={<EventSearch />} />
        </Routes>
    );
};

export default App;