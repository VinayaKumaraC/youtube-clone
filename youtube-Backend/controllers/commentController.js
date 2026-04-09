import Comment from "../models/Comment.js";

// Add a new comment to a video
export const addComment = async (req, res) => {
  const { text, videoId } = req.body;

  // Create the comment and associate it with the user and video
  const comment = await Comment.create({
    text,
    user: req.user,
    video: videoId,
  });

  res.status(201).json(comment);
};

// Get all comments for a specific video
export const getCommentsByVideo = async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId })
    .populate("user", "name");

  res.json(comments);
};

// Update a comment (only by the comment owner)
export const updateComment = async (req, res) => {
  const comment = await Comment.findOne({
    _id: req.params.id,
    user: req.user,
  });

  comment.text = req.body.text;
  await comment.save();

  res.json(comment);
};

// Delete a comment (only by the comment owner)
export const deleteComment = async (req, res) => {
  const comment = await Comment.findOne({
    _id: req.params.id,
    user: req.user,
  });

  // If comment not found or user is not the owner
  await comment.deleteOne();
  res.json({ message: "Deleted" });
};