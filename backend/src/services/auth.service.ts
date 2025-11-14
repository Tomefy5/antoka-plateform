import { supabase } from '../config/supabase';
import { AppError } from '../middlewares/errorHandler';
import { SignupPayload, LoginPayload } from '../types/interface';
// import { auditService } from './audit.service'; // TODO: réactiver quand audit sera configuré

/**
 * Service gérant l'authentification utilisateur via Supabase
 * @class
 * @namespace AuthService
 */
export class AuthService {
    /**
     * Crée un nouvel utilisateur avec l'email et le mot de passe fournis
     * @param {SignupPayload} payload - Données de connexion de l'utilisateur
     * @returns {Promise<SignupResponse>} Promesse contenant les détails de l'utilisateur créé
     * @throws {Error} En cas d'erreur d'authentification ou de création de profil
     */
    async signup(payload: SignupPayload) {
        const { email, password, fullName, organizationId } = payload;

        // 1. Créer compte Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName // Metadata basique dans auth.users
                },
                emailRedirectTo: `${process.env.APP_URL}:${process.env.FRONTEND_PORT}/auth/callback` //! Vérifier le bon env
            }
        });

        if (authError) {
            // Message générique pour éviter l’énumération d’emails
            throw new AppError('Si un compte existe, un email a pu être envoyé. Vérifiez votre boîte mail ou utilisez “Mot de passe oublié”.');
        }


        const userId = authData.user!.id;

        if (organizationId) {
            const { error: updateError } = await supabase
                .from('user_profiles')
                .update({ organization_id: organizationId })
                .eq('user_id', userId);
            if (updateError) throw new AppError('Échec mise à jour profil');
        }

        // 3. Logger événement audit
        // await auditService.log({
        //   userId,
        //   action: 'user_signup',
        //   resourceType: 'user',
        //   resourceId: userId,
        //   metadata: { email, organizationId }
        // });

        return {
            userId,
            email,
            message: 'Compte créé. Vérifiez votre email pour confirmer.'
        };
    }

    async login(payload: LoginPayload) {
        const { email, password } = payload;

        const { data, error: sessionError } = await supabase.auth.signInWithPassword({ email, password });

        if (sessionError) {
            throw new AppError("Identifiants Invalide");
        }

        // Vérifier si l'email est confirmé
        if (data.user && !data.user.email_confirmed_at) {
            throw new AppError('Veuillez confirmer votre email avant de vous connecter');
        }

        return {
            success: true,
            session: data.session,
            user: {
                id: data.user!.id,
                email: data.user!.email
            }
        }
    }
}

export const authService = new AuthService();
