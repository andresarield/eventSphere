import { Schema, Document, model, Types } from 'mongoose';

// Interfaz del usuario
export interface IUser extends Document {
    _id: Types.ObjectId; // Garantiza que _id sea accesible
    email: string;
    password?: string;
    name: string;
    role: 'user' | 'admin';
    likedEvents: Types.ObjectId[];
    googleId?: string;
    facebookId?: string;
}

// Esquema del usuario
const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        name: { type: String, required: true },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        likedEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event',
            },
        ],
        googleId: { type: String },
        facebookId: { type: String },
    },
    {
        timestamps: true,
    }
);

const UserModel = model<IUser>('User', userSchema);

export { UserModel };
