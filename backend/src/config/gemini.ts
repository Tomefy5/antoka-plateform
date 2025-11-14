import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY as string;
if (!apiKey) {
    throw new Error('GEMINI_API_KEY non configurée dans .env');
}

// Initialisation du client Gemini
export const genAI = new GoogleGenerativeAI(apiKey);

// Récupère le modèle
export const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-flash-latest"
});

console.log("Gemini-1.5-flash initialisé");