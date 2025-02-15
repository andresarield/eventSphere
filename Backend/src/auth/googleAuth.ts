import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../models/UserModel';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/envConfig';

// Configurar la estrategia de Google OAuth
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserModel.findOne({ googleId: profile.id });

                if (!user) {
                    user = new UserModel({
                        googleId: profile.id,
                        email: profile.emails?.[0]?.value || '',
                        name: profile.displayName,
                        role: 'user',
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serializar y deserializar el usuario para mantener la sesión
passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;