import Comment from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const comment = await Comment.create({
      text,
      user: req.user,
      video: videoId,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments by video
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({
      video: req.params.videoId,
    }).populate("user", "name");

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only login user can delete
    if (comment.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Unauthorized",
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