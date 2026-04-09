import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:videoId", getCommentsByVideo);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;