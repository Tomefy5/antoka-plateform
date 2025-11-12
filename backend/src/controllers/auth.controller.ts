import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { authService } from '../services/auth.service';
import { AppError } from '../middlewares/errorHandler';
import { supabase } from '../config/supabase';

export class AuthController {
    async signup(req: Request, res: Response) {
        // Vérifier erreurs de validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new AppError("Données invalides", 400, "INVALID DATA");
        }

        const result = await authService.signup(req.body);

        res.status(201).json({
            success: true,
            data: result
        });
    }

    async login(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new AppError("Données invalides", 400, "INVALID DATA");
        }

        const result = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            data: {
                user: result.user,
                session: result.session
            }
        });

    }

    async logout(_req: Request, res: Response) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Deconnexion réussie"
        });
    }
}

export const authController = new AuthController();
