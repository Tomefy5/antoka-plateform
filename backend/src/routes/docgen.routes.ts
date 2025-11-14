import express from "express";
const router = express.Router();
import { handleGenerate } from "../controllers/gemini.controller";

router.post("/generate-doc", handleGenerate);

export default router;