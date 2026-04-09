import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

// Routes for comment management
const router = express.Router();

// Add a new comment to a video
router.post("/", authMiddleware, addComment);
router.get("/:videoId", getCommentsByVideo);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;