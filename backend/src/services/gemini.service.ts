import { model } from '../config/gemini';
import { AppError } from '../middlewares/errorHandler';

interface GenerationResult {
    success: boolean;
    text?: string;
    duration_ms?: number;
}

export async function generateText(prompt: string, timeout_ms = 30000): Promise<GenerationResult> {
    const start = Date.now();
    // Créer un contrôleur d'abort pour le timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout_ms);

    try {
        console.log(`📝 Appel Gemini avec timeout ${timeout_ms}ms...`);

        // Appeler Gemini avec configuration
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ],
            // TODO : mettre en paramêtre
            generationConfig: {
                temperature: 0.3,        // Faible = plus déterministe
                topP: 0.9,               // Diversité contrôlée
                maxOutputTokens: 4096    // Assez pour un document
            },
            safetySettings: []         // Défaults ou adaptés selon risque
        });

        clearTimeout(timeoutId);

        // Extraire le texte généré
        const text = result.response.text();
        const duration = Date.now() - start;

        console.log(`✅ Génération réussie en ${duration}ms`);

        return {
            success: true,
            text,
            duration_ms: duration
        };

    } catch (error: any) {
        const duration = Date.now() - start;

        console.error(`❌ Erreur Gemini: ${error.message}`);

        // Gérer les erreurs courantes
        if (error.name === 'AbortError') {
            throw new AppError(`Timeout dépassé (> ${timeout_ms}ms)`, 504, 'TIMEOUT')
        }

        // Essaye d’extraire un status (selon SDK/transport)
        const e = error as any;
        const msg: string = e?.message ?? 'Generation error';
        const status: number | undefined = e?.status ?? e?.response?.status;

        // Auth / permissions
        if (status === 401 || status === 403 || /403/.test(msg)) {
            throw new AppError(
                'Clé API invalide ou permissions insuffisantes',
                403,
                'AUTH_FORBIDDEN'
            );
        }

        if (error.message.includes('429')) {
            throw new AppError(
                'Limite de débit dépassée. Réessayez dans quelques minutes.',
                429,
                'RATE_LIMITED'
            );
        }

        // IMPORTANT: chemin par défaut
        throw new AppError('Erreur du modèle génératif', 502, 'GENERATION_FAILED');
    } finally {
        clearTimeout(timeoutId);
    }
}
