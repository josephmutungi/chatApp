import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  getConversationMessages,
  getConversations,
  getMyProfile,
} from "../controllers/dashboardController.js";
import { logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
router.post("/logout", auth, logout);
router.get("/messages/conversations", auth, getConversations);
router.get("/messages/conversations/history", auth, getConversationMessages);

export default router;
