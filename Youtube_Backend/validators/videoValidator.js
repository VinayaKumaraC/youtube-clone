import { body } from "express-validator";

export const videoValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 chars"),

  body("videoUrl").notEmpty().withMessage("Video URL required"),
];