import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    const channel = await Channel.create({
      channelName,
      description,
      owner: req.user,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChannel = async (req, res) => {
  const channel = await Channel.findById(req.params.id)
    .populate("owner", "name")
    .populate("videos");

  res.json(channel);
};

export const getChannelVideos = async (req, res) => {
  const videos = await Video.find({ channel: req.params.id });
  res.json(videos);
};