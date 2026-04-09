import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createChannel,
  getChannel,
  getChannelVideos,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/", authMiddleware, createChannel);
router.get("/:id", getChannel);
router.get("/:id/videos", getChannelVideos);

export default router;