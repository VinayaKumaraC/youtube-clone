import express from "express";
import {
  addComment,
  getCommentsByVideo,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add comment
router.post("/", authMiddleware, addComment);

// Get comments for a video
router.get("/:videoId", getCommentsByVideo);

// Delete comment
router.delete("/:id", authMiddleware, deleteComment);

// Update comment
router.put("/:id", authMiddleware, updateComment);

export default router;