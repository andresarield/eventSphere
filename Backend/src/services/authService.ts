import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import { JWT_SECRET } from '../config/envConfig';
import { CustomError } from '../utils/errorHandler';

// Registrar un nuevo usuario
export async function registerUser(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword, name });
    return user.save();
}

// Iniciar sesión con correo electrónico y contraseña
export async function loginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new CustomError('Invalid credentials', 401); // Usuario no encontrado
    }

    // Verificar si el usuario tiene una contraseña (usuarios de Google pueden no tenerla)
    if (!user.password || !(await bcrypt.compare(password, user.password))) {
        throw new CustomError('Invalid credentials', 401); // Credenciales inválidas
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
}

// Autenticación con Google
export async function authenticateWithGoogle(googleId: string, email: string, name: string) {
    let user = await UserModel.findOne({ googleId });
    if (!user) {
        user = new UserModel({ googleId, email, name });
        await user.save();
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
}