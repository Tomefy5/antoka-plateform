import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { ErrorRequestHandler } from "express";

import authRouter from "./routes/auth.routes";
import docgenRouter from "./routes/docgen.routes"
import { AppError } from "./middlewares/errorHandler";

const app = express();

const PORT = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/docgen", docgenRouter);


app.get("/", (_req, res) => {
    res.send("Welcome to Antoka!")
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})

// Gestion globale des erreurs
const globalErrorHandler: ErrorRequestHandler = (err: any, _req, res, _next) => {
    const isAppError = err instanceof AppError;
    const status = isAppError ? err.statusCode : 500;
    const message = isAppError ? err.message : "Erreur du serveur interne";
    const code = isAppError ? err.code : ""

    console.error('[ERROR]', {
        name: err.name,
        message,
        status
    })

    res.status(status).json({ message, status, code });
}

app.use(globalErrorHandler);