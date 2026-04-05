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

// Get video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("user", "name");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json(video);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.user.toString() !== req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    video.title = req.body.title || video.title;
    video.description = req.body.description || video.description;
    video.url = req.body.url || video.url;

    const updatedVideo = await video.save();

    res.json({
      message: "Video updated successfully",
      updatedVideo,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.user.toString() !== req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await video.deleteOne();

    res.json({
      message: "Video deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};