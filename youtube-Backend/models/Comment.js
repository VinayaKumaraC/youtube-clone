import mongoose from "mongoose";

// Comment schema
const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);