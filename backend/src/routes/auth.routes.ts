import { Router } from "express";
import { signupValidator } from "../middlewares/validators";
import { authController } from "../controllers/auth.controller";
const router = Router();

router.post("/register", signupValidator, authController.signup);

export default router;