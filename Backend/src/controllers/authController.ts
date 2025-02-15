import { Request, Response } from 'express';
import { registerUser, loginUser, authenticateWithGoogle } from '../services/authService';
import { CustomError } from '../utils/errorHandler';

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;
        const user = await registerUser(email, password, name);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({ message: 'Login successful', user, token });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export async function googleAuth(req: Request, res: Response) {
    try {
        const { googleId, email, name } = req.body;
        const { user, token } = await authenticateWithGoogle(googleId, email, name);
        res.json({ message: 'Google authentication successful', user, token });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}