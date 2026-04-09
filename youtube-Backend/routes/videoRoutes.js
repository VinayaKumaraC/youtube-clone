import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";

// Routes for video management
const router = express.Router();

// Create a new video
router.post("/", authMiddleware, createVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.put("/:id", authMiddleware, updateVideo);
router.delete("/:id", authMiddleware, deleteVideo);
router.put("/:id/like", authMiddleware, likeVideo);
router.put("/:id/dislike", authMiddleware, dislikeVideo);

export default router;