import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

// create
router.post("/", authMiddleware, addComment);

// read
router.get("/:videoId", getComments);

// UPDATE comment
router.put("/:id", authMiddleware, updateComment);

// DELETE comment
router.delete("/:id", authMiddleware, deleteComment);

export default router;