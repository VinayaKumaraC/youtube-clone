// routes for video-related APIs

import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { videoValidator } from "../validators/videoValidator.js";
import { validationResult } from "express-validator";

const router = express.Router();


// ==============================
// VALIDATION HANDLER (IMPORTANT)
// ==============================
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};


// ==============================
// ROUTES
// ==============================

// create video (with validation)
router.post(
  "/",
  authMiddleware,
  videoValidator,
  handleValidation,
  createVideo
);

// get all videos
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