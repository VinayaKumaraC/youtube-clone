// routes for comment system

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addComment,
  getComments,
} from "../controllers/commentController.js";

const router = express.Router();

// add comment
router.post("/", authMiddleware, addComment);

// get comments for video
router.get("/:videoId", getComments);

export default router;