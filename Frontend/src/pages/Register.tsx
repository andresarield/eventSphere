import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton'
import axios from 'axios';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Manejar el registro con correo electrónico y contraseña
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos

        // Validaciones básicas
        if (!email || !password || !name) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            // Enviar solicitud POST al backend para registrar al usuario
            const response = await axios.post('/api/auth/register', {
                email,
                password,
                name,
            });

            if (response.status === 201) {
                alert('Registro exitoso. Por favor, inicia sesión.');
                navigate('/login'); // Redirigir al usuario al login
            }
        } catch (err: any) {
            console.error('Error durante el registro:', err);
            setError(err.response?.data?.error || 'Hubo un problema al registrarte. Inténtalo más tarde.');
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico"
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                <button type="submit">Registrarse con Email</button>
            </form>

            <div style={{ margin: '20px 0' }}>
                <p>O regístrate con:</p>
                <GoogleLoginButton />
            </div>

            <p>
                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>.
            </p>
        </div>
    );
};

export default Register;