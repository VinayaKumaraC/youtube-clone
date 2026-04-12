// authRoutes.js

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { registerValidator } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginUser);

export default router;