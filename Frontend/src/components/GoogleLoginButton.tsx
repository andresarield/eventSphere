import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (credentialResponse: any) => {
        try {
            const { credential } = credentialResponse;

            const response = await axios.post('/api/auth/google-auth', {
                googleId: credential,
            });

            if (response.status === 200) {
                alert('Inicio de sesión con Google exitoso. ¡Bienvenido!');
                navigate('/');
            }
        } catch (err: any) {
            console.error('Error durante el inicio de sesión con Google:', err);
            alert(err.response?.data?.error || 'Hubo un problema al iniciar sesión con Google.');
        }
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                    console.log('Error al iniciar sesión con Google');
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;