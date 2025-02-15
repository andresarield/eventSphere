import express from 'express';
import session from 'express-session';
import passport from './auth/googleAuth'; // Importa Passport para autenticación
import authRoutes from './routes/authRoutes'; // Importa las rutas de autenticación
import eventsRoutes from './routes/eventsRoutes'; // Importa las rutas de eventos
import cors from 'cors';
import MongoStore from 'connect-mongo'; // Para almacenar sesiones en MongoDB
import { MONGO_URI } from './config/envConfig';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Permite solicitudes desde el frontend
    credentials: true, // Habilita el envío de cookies en solicitudes CORS
}));
app.use(express.json());

// Configuración de express-session
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret', // Clave secreta para firmar la sesión
        resave: false, // Evita guardar la sesión si no ha cambiado
        saveUninitialized: false, // No guarda sesiones vacías
        cookie: {
            httpOnly: true, // Previene el acceso a la cookie desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Usa `true` en producción con HTTPS
            maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie (24 horas)
        },
        store: MongoStore.create({
            mongoUrl: MONGO_URI, // Conexión a MongoDB
            collectionName: 'sessions', // Nombre de la colección para almacenar sesiones
        }),
    })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/auth', authRoutes); // Registra las rutas de autenticación
app.use('/api/events', eventsRoutes); // Registra las rutas de eventos

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});