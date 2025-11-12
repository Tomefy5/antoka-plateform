import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { authService } from '../services/auth.service';

export class AuthController {
    async signup(req: Request, res: Response) {
        try {
            // Vérifier erreurs de validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const result = await authService.signup(req.body);

            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error: any) {
            console.error('Signup error:', error);

            // Gestion erreurs UX-friendly
            const statusCode = error.message.includes('existe déjà') ? 409 : 500;

            res.status(statusCode).json({
                success: false,
                error: error.message || 'Erreur lors de l\'inscription'
            });
        }
    }
}

export const authController = new AuthController();
