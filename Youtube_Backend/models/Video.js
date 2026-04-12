// video schema handles metadata, relations, and optimization

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },

    description: {
      type: String,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },

    thumbnail: {
      type: String,
      default: "https://via.placeholder.com/300x180",
    },

    category: {
      type: String,
      default: "All",
      enum: ["All", "Tech", "Music", "Gaming", "News", "Sports"],
    },

    uploadDate: {
      type: Date,
      default: Date.now,
    },

    // relations
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);


// ==============================
// INDEXING (FOR SEARCH PERFORMANCE)
// ==============================

// text index for fast search
videoSchema.index({ title: "text", description: "text" });

// compound index for category + uploadDate sorting

// total reactions (likes - dislikes)
videoSchema.virtual("score").get(function () {
  return this.likes.length - this.dislikes.length;
});


export default mongoose.model("Video", videoSchema);