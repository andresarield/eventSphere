import { Request, Response } from 'express';
import { UserModel } from '../models/UserModel';

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserModel.find({}, { password: 0 }); // Excluir contraseñas
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}