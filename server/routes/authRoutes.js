import express from "express";
import { login, register } from "../controllers/authController.js";
import { getMyProfile } from "../controllers/dashboardController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
