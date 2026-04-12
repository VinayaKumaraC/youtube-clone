// controller responsible for handling all video related operations
// includes CRUD + search + filter + likes + views

import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import APIFeatures from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";


// ==============================
// CREATE VIDEO
// ==============================
export const createVideo = asyncHandler(async (req, res) => {
  const { title, description, videoUrl, category, channelId } = req.body;

  // basic validation (kept simple and readable)
  if (!title || !videoUrl) {
    return res.status(400).json({ message: "Title and video URL required" });
  }

  const video = await Video.create({
    title,
    description,
    videoUrl,
    category,
    channel: channelId,
    user: req.user,
  });

  // add video to channel (if exists)
  if (channelId) {
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id },
    });
  }

  res.status(201).json(video);
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
    .populate("user", "username")
    .populate("channel", "channelName");

  res.json(videos);
});


// ==============================
// GET SINGLE VIDEO + INCREMENT VIEWS
// ==============================
export const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate("user", "username")
    .populate("channel", "channelName");

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // increment views every time video is opened
  video.views += 1;
  await video.save();

  res.json(video);
});


// ==============================
// UPDATE VIDEO
// ==============================
export const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // only owner can update
  if (video.user.toString() !== req.user) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // update fields dynamically
  Object.assign(video, req.body);

  await video.save();

  res.json(video);
});


// ==============================
// DELETE VIDEO + REMOVE FROM CHANNEL
// ==============================
export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // only owner can delete
  if (video.user.toString() !== req.user) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // remove video from channel (IMPORTANT FIX)
  if (video.channel) {
    await Channel.findByIdAndUpdate(video.channel, {
      $pull: { videos: video._id },
    });
  }

  await video.deleteOne();

  res.json({ message: "Video deleted successfully" });
});


// ==============================
// LIKE VIDEO (USER-BASED)
// ==============================
export const likeVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // if already liked → remove like
  if (video.likes.includes(req.user)) {
    video.likes.pull(req.user);
  } else {
    video.likes.push(req.user);

    // remove dislike if exists
    video.dislikes.pull(req.user);
  }

  await video.save();

  res.json({
    likes: video.likes.length,
    dislikes: video.dislikes.length,
  });
});


// ==============================
// DISLIKE VIDEO (USER-BASED)
// ==============================
export const dislikeVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  if (video.dislikes.includes(req.user)) {
    video.dislikes.pull(req.user);
  } else {
    video.dislikes.push(req.user);

    // remove like if exists
    video.likes.pull(req.user);
  }

  await video.save();

  res.json({
    likes: video.likes.length,
    dislikes: video.dislikes.length,
  });
});