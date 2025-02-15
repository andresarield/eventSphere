import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
    const token = localStorage.getItem('token'); // Verifica si hay un token en localStorage

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/login" />;
    }

    // Si hay token, permite el acceso a la ruta protegida
    return <Outlet />;
};

export default PrivateRoute;