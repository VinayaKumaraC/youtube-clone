// handles authentication routes

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { registerValidator } from "../validators/authValidator.js";

const router = express.Router();

// register user
router.post("/register", registerValidator, registerUser);

// login user
router.post("/login", loginUser);

export default router;