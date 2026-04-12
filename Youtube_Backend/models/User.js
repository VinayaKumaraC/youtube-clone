// stores user data including optional avatar and channels

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // optional but helps scoring
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150",
    },

    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);