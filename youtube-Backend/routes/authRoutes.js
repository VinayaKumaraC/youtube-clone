import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// Routes for user registration and login
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;