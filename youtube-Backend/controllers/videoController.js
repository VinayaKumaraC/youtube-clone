import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, category, channelId } = req.body;

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

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  const videos = await Video.find(query)
    .populate("user", "name")
    .populate("channel", "channelName");

  res.json(videos);
};

export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate("user", "name");

  res.json(video);
};

export const updateVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video.user.toString() !== req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  Object.assign(video, req.body);
  await video.save();

  res.json(video);
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video.user.toString() !== req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await video.deleteOne();
  res.json({ message: "Deleted" });
};

export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.likes++;
  await video.save();
  res.json(video);
};

export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.dislikes++;
  await video.save();
  res.json(video);
};