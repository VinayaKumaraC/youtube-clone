import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    // Video basic info
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // Video URL (actual video file)
    videoUrl: {
      type: String,
      required: true,
    },

    // Thumbnail image
    thumbnail: {
      type: String,
      default: "",
    },

    // Channel / creator name (for UI)
    channel: {
      type: String,
      default: "Unknown",
    },

    // Reference to user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Stats
    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Video", videoSchema);
