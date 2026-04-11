import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// ✅ Create Channel
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

// Get Channel
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "name");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    console.log("Channel Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//Get Channel Videos)
export const getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({ channel: req.params.id });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};