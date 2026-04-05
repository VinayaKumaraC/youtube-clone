import Video from "../models/Video.js";

// Create video
export const createVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        message: "Title and URL are required",
      });
    }

    const video = await Video.create({
      title,
      description,
      url,
      user: req.user, // from middleware
    });

    res.status(201).json({
      message: "Video created successfully",
      video,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "name");

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

