import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string; // Opcional si usa Google/Facebook
    name: string;
    role: 'user' | 'admin';
    likedEvents: string[]; // IDs de eventos favoritos
    googleId?: string; // ID de Google si usa autenticación con Google
    facebookId?: string; // ID de Facebook si usa autenticación con Facebook
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    likedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    googleId: { type: String },
    facebookId: { type: String },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);