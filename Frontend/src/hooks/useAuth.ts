import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: string;
    exp: number; // Tiempo de expiración del token
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken: DecodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        } else {
            setIsAuthenticated(false); // No hay token
        }
    }, []);

    return { isAuthenticated };
};

export default useAuth;