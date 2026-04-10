import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, category, channelId } = req.body;

    // Create the video and associate it with the user and channel
    const video = await Video.create({
      title,
      description,
      videoUrl,
      category,
      channel: channelId,
      user: req.user,
    });

    if (channelId) {
      await Channel.findByIdAndUpdate(channelId, {
        $push: { videos: video._id },
      });
    }

    // Return the created video in the response
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all videos with optional search and category filters
export const getAllVideos = async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  // Populate user and channel details in the response
  const videos = await Video.find(query)
    .populate("user", "name")
    .populate("channel", "channelName");

  res.json(videos);
};

// Get video details by ID
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate("user", "name");

  res.json(video);
};

// Get videos by channel ID
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Not owner → 403
    if (video.user.toString() !== req.user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(video, req.body);
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a video (only by the video owner)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Not owner → 403
    if (video.user.toString() !== req.user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await video.deleteOne();

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a video
export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.likes++;
  await video.save();
  res.json(video);
};

// Dislike a video
export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.dislikes++;
  await video.save();
  res.json(video);
};