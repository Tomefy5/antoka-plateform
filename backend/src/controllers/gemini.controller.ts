import { Request, Response } from "express";
import { z } from "zod";
import { generateText } from "../services/gemini.service";

export async function handleGenerate(req: Request, res: Response) {
    try {
        const GenerateRequestSchema = z.object({
            prompt: z.string().min(10, 'Prompt mon 10 caractères').max(5000),
            timeout_ms: z.number().optional().default(30000)
        });

        type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

        // Valider l'input
        const parsed = GenerateRequestSchema.parse(req.body);

        // Appel des services
        const result = await generateText(parsed.prompt, parsed.timeout_ms);

        if (result.success) {
            return res.status(200).json({
                success: true,
                data: {
                    text: result.text,
                    duration: result.duration_ms
                }
            });
        }

    } catch (error) {
        throw error;
    }
}



