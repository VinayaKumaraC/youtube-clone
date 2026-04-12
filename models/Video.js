// video schema handles metadata and relations

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    videoUrl: { type: String, required: true },
    thumbnail: String,

    category: { type: String, default: "All" },

    uploadDate: {
      type: Date,
      default: Date.now,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },

    views: { type: Number, default: 0 },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);