import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getAllUsers, getUserDetails } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUserDetails);

export default router;
