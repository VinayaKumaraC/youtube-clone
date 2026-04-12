// routes for channel management

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createChannel,
  getChannel,
  getChannelVideos,
  deleteChannel,
} from "../controllers/ChannelController.js";

const router = express.Router();

// create channel
router.post("/", authMiddleware, createChannel);

// get channel details
router.get("/:id", getChannel);

// get channel videos
router.get("/:id/videos", getChannelVideos);

// delete channel (bonus)
router.delete("/:id", authMiddleware, deleteChannel);

export default router;