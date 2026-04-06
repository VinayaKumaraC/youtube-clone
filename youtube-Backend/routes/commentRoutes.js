import express from "express";
import {
  addComment,
  getCommentsByVideo,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:videoId", getCommentsByVideo);
router.delete("/:id", authMiddleware, deleteComment);

export default router;