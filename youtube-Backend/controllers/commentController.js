import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { text, videoId } = req.body;

  const comment = await Comment.create({
    text,
    user: req.user,
    video: videoId,
  });

  res.status(201).json(comment);
};

export const getCommentsByVideo = async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId })
    .populate("user", "name");

  res.json(comments);
};

export const updateComment = async (req, res) => {
  const comment = await Comment.findOne({
    _id: req.params.id,
    user: req.user,
  });

  comment.text = req.body.text;
  await comment.save();

  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const comment = await Comment.findOne({
    _id: req.params.id,
    user: req.user,
  });

  await comment.deleteOne();
  res.json({ message: "Deleted" });
};