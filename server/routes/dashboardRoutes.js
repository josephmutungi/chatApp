import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getMyProfile } from "../controllers/dashboardController.js";
import { logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
router.post("/logout", auth, logout);

export default router;
