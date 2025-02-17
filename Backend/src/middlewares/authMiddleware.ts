import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models/UserModel';
import { JWT_SECRET } from '../config/envConfig';

// 🔹 Extender `Express.User` en lugar de `Express.Request`
declare global {
    namespace Express {
        interface User extends IUser { } // Ahora `req.user` sigue la estructura de `IUser`
    }
}

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided or invalid format' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Buscar usuario y asegurarnos de que cumple con la interfaz IUser
        const user = await UserModel.findById(decoded.userId).lean().exec();

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        req.user = user as Express.User; // 🔹 Ahora coincide con `Express.User`

        next();
    } catch (error) {
        console.error('Authentication error:', error);

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
        } else if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: 'Token expired' });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }
};
