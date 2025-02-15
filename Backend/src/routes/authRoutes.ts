import express, { Router } from 'express';
import { register, login, googleAuth } from '../controllers/authController';

const router: Router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para autenticación con Google
router.post('/google-auth', googleAuth);

export default router;