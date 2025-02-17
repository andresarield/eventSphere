import express, { Router, Response, Request } from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import { UserModel } from '../models/UserModel';

const router: Router = express.Router();

// Obtener eventos favoritos del usuario autenticado
router.get('/liked-events', authenticateUser, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated' });
            return;
        }

        const userId = (req.user as Express.User)._id; // 🔹 Forzar tipado para TypeScript

        const user = await UserModel.findById(userId).populate('likedEvents');

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ events: user.likedEvents || [] });
    } catch (error) {
        console.error('Error fetching liked events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;