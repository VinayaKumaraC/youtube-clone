// validates user input (important for marks)

import { body } from "express-validator";

export const registerValidator = [
  body("username").notEmpty().withMessage("Username required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars"),
];