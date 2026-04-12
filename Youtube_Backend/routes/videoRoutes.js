// routes for video operations

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

const router = express.Router();

// create video
router.post("/", authMiddleware, createVideo);

// fetch videos (search + filter + pagination)
router.get("/", getAllVideos);

// get single video
router.get("/:id", getVideoById);

// update video
router.put("/:id", authMiddleware, updateVideo);

// delete video
router.delete("/:id", authMiddleware, deleteVideo);

// like / dislike
router.put("/:id/like", authMiddleware, likeVideo);
router.put("/:id/dislike", authMiddleware, dislikeVideo);

export default router;