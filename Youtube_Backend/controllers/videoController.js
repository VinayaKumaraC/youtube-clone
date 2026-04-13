// controller responsible for handling all video related operations
// includes CRUD + search + filter + likes + views
// upgraded to production-level standards (clean, consistent, secure)

import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import APIFeatures from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";


// ==============================
// CREATE VIDEO
// ==============================
export const createVideo = asyncHandler(async (req, res) => {
  const { title, description, videoUrl, thumbnail, category, channelId } = req.body;

  if (!title || !videoUrl || !category || !channelId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  const video = await Video.create({
    title,
    description,
    videoUrl,
    thumbnail,
    category,
    channel: channelId,
    user: req.user._id   // ✅ FIX
  });

  // attach to channel
  if (channelId) {
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id }
    });
  }

  res.status(201).json({
    success: true,
    message: "Video uploaded successfully",
    data: video
  });
});


// ==============================
// GET ALL VIDEOS (SEARCH + FILTER + PAGINATION)
// ==============================
export const getAllVideos = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Video.find(), req.query)
    .search()
    .filter()
    .pagination();

  const videos = await features.query
    .populate("user", "username avatar")
    .populate("channel", "channelName");

  res.json({
    success: true,
    count: videos.length,
    data: videos,
  });
});


// ==============================
// GET SINGLE VIDEO + INCREMENT VIEWS
// ==============================
export const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate("user", "username avatar")
    .populate("channel", "channelName");

  if (!video) {
    return res.status(404).json({ success: false, message: "Video not found" });
  }

  // increment views
  video.views += 1;
  await video.save();

  res.json({
    success: true,
    data: video,
  });
});


// ==============================
// UPDATE VIDEO
// ==============================
export const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ success: false, message: "Video not found" });
  }

  // secure ownership check
  if (video.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  // prevent invalid title update
  if (req.body.title && req.body.title.length < 3) {
    return res.status(400).json({ success: false, message: "Title too short" });
  }

  Object.assign(video, req.body);
  await video.save();

  res.json({
    success: true,
    message: "Video updated successfully",
    data: video,
  });
});


// ==============================
// DELETE VIDEO + REMOVE FROM CHANNEL
// ==============================
export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ success: false, message: "Video not found" });
  }

  if (video.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  // maintain data consistency
  if (video.channel) {
    await Channel.findByIdAndUpdate(video.channel, {
      $pull: { videos: video._id },
    });
  }

  await video.deleteOne();

  res.json({
    success: true,
    message: "Video deleted successfully",
  });
});


// ==============================
// LIKE VIDEO
// ==============================
export const likeVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ success: false, message: "Video not found" });
  }

  const userId = req.user;

  if (video.likes.includes(userId)) {
    video.likes.pull(userId);
  } else {
    video.likes.push(userId);
    video.dislikes.pull(userId);
  }

  await video.save();

  res.json({
    success: true,
    likes: video.likes.length,
    dislikes: video.dislikes.length,
  });
});


// ==============================
// DISLIKE VIDEO
// ==============================
export const dislikeVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ success: false, message: "Video not found" });
  }

  const userId = req.user;

  if (video.dislikes.includes(userId)) {
    video.dislikes.pull(userId);
  } else {
    video.dislikes.push(userId);
    video.likes.pull(userId);
  }

  await video.save();

  res.json({
    success: true,
    likes: video.likes.length,
    dislikes: video.dislikes.length,
  });
});