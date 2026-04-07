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
      user: req.user, // user id from token
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

// ✏ Update comment (FINAL FIXED VERSION)
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;

    // Update only if comment belongs to logged-in user
    const updatedComment = await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user, // ownership check
      },
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: "Comment not found or unauthorized",
      });
    }

    res.json({
      message: "Comment updated successfully",
      updatedComment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
      user: req.user, // only owner can delete
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found or unauthorized",
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