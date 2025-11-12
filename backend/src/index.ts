import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth.routes";

const app = express();

const PORT = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/api/auth", authRouter);


app.get("/", (_req, res) => {
    res.send("Welcome to Antoka!")
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})