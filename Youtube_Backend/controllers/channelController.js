// handles everything related to channels
// includes create channel + fetch channel + channel videos

import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import asyncHandler from "../utils/asyncHandler.js";


// ==============================
// CREATE CHANNEL
// ==============================
export const createChannel = asyncHandler(async (req, res) => {
  const { channelName, description } = req.body;

  // basic validation
  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }

  // create channel linked to logged-in user
  const channel = await Channel.create({
    channelName,
    description,
    owner: req.user._id,
  });

  res.status(201).json(channel);
});


// ==============================
// GET CHANNEL DETAILS
// ==============================
export const getChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id)
    .populate("owner", "username")
    .populate({
      path: "videos",
      select: "title thumbnail views createdAt",
    });

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  res.json(channel);
});


// ==============================
// GET CHANNEL VIDEOS
// ==============================
export const getChannelVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ channel: req.params.id })
    .populate("user", "username")
    .sort({ createdAt: -1 });

  res.json(videos);
});


// ==============================
// DELETE CHANNEL + ALL ITS VIDEOS
// ==============================
export const deleteChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  // only owner can delete
  if (channel.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // optional: delete all videos of that channel
  await Video.deleteMany({ channel: channel._id });

  await channel.deleteOne();

  res.json({ message: "Channel deleted successfully" });
});

// ==============================
// EDit CHANNEL + ALL ITS VIDEOS
// ==============================
export const updateChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  if (channel.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  channel.channelName = req.body.channelName || channel.channelName;
  channel.description = req.body.description || channel.description;
  channel.channelPic = req.body.channelPic || channel.channelPic;
  channel.channelBanner = req.body.channelBanner || channel.channelBanner;

  const updated = await channel.save();

  res.json(updated);
});