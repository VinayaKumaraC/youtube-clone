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
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Not owner → 403
    if (comment.user.toString() !== req.user) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    comment.text = req.body.text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment (only by the comment owner)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Not owner → 403
    if (comment.user.toString() !== req.user) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};