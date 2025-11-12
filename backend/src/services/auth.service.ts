import { supabase } from '../config/supabase';
import { SignupPayload } from '../types/interface';
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
                emailRedirectTo: `${process.env.APP_URL}/auth/confirm` //! Vérifier le bon env
            }
        });

        if (authError) {
            // Message générique pour éviter l’énumération d’emails
            throw new Error('Si un compte existe, un email a pu être envoyé. Vérifiez votre boîte mail ou utilisez “Mot de passe oublié”.');
        }


        const userId = authData.user!.id;

        // 2. Créer profil étendu dans public.user_profiles
        const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
                user_id: userId,
                email,
                full_name: fullName,
                organization_id: organizationId || null,
                role: 'USER',
                password_changed_at: new Date().toISOString()
            });

        if (organizationId) {
            const { error: updateError } = await supabase
                .from('user_profiles')
                .update({ organization_id: organizationId })
                .eq('user_id', userId);
            if (updateError) throw new Error('Échec mise à jour profil');
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
}

export const authService = new AuthService();
