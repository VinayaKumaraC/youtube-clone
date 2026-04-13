// handles CRUD for comments

import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { text, videoId } = req.body;

  const comment = await Comment.create({
    text,
    video: videoId,
    user: req.user,
  });

  res.status(201).json(comment);
};

export const getComments = async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId })
    .populate("user", "username");

  res.json(comments);
};

// UPDATE COMMENT
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // only owner can edit
    if (String(comment.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.json({ success: true, data: comment });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // only owner
    if (String(comment.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();

    res.json({ success: true, message: "Comment deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};