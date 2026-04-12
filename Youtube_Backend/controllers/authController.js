// handles register and login (secure + clean + production-ready)

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";


// ==============================
// REGISTER USER
// ==============================
export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;

  // check existing user
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "Registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});


// ==============================
// LOGIN USER
// ==============================
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required",
    });
  }

  // check user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email",
    });
  }

  // compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  }

  // generate token
  const token = generateToken(user);

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});