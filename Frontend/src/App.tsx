import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo importa Routes y Route
import EventSearch from './components/EventSearch';
import MyEvents from './pages/MyEvents';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<EventSearch />} /> {/* Ruta para buscar eventos */}

            <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}

            <Route path="/login" element={<Login />} /> {/* Ruta hacia inicio de sesión */}

            {/* Ruta hacia "Mis Eventos" */}
            <Route path="/my-events" element={<PrivateRoute />}>
                <Route index element={<MyEvents />} />
            </Route>

            {/* Redirigir a la página principal si la ruta no existe */}
            <Route path="*" element={<EventSearch />} />
        </Routes>
    );
};

export default App;