import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    url: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // likes for video
    likes: {
      type: Number,
      default: 0,
    },

    // dislikes for video
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);