import express, { Router } from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import { UserModel } from '../models/UserModel';

const router: Router = express.Router();

// Obtener eventos favoritos del usuario autenticado
router.get('/liked-events', authenticateUser, async (req: any, res) => {
    try {
        const user = await UserModel.findById(req.user._id).populate('likedEvents');
        res.json({ events: user?.likedEvents || [] });
    } catch (error) {
        console.error('Error fetching liked events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;