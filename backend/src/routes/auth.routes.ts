import { Router } from "express";
import { LoginValidator, signupValidator } from "../middlewares/validators";
import { authController } from "../controllers/auth.controller";
import { loginLimiter } from "../middlewares/rate-limiter";
const router = Router();

router.post("/register", signupValidator, authController.signup);
router.post("/login", loginLimiter, LoginValidator, authController.login);
router.get("/logout", authController.logout);

export default router;