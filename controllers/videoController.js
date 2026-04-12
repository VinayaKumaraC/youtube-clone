// handles video logic including pagination + search

import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// create video
export const createVideo = async (req, res) => {
  const { title, description, videoUrl, category, channelId } = req.body;

  const video = await Video.create({
    title,
    description,
    videoUrl,
    category,
    channel: channelId,
    user: req.user,
  });

  // push into channel
  if (channelId) {
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id },
    });
  }

  res.status(201).json(video);
};

// get videos with pagination + search
export const getAllVideos = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  const videos = await Video.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("user", "username");

  res.json(videos);
};

// increment views
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id);

  video.views++;
  await video.save();

  res.json(video);
};