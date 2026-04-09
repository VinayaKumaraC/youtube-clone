import mongoose from "mongoose";

// Video schema
const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    category: { type: String, default: "All" },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);