import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { STATIC_RECOMMENDED } from "../assets/recommendedVideos.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import "../css/videoPlayer.css";

import API from "../api/axios.js";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { MdDownload } from "react-icons/md";

function VideoPlayer() {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // ==============================
  // 🎥 FETCH VIDEO + COMMENTS
  // ==============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, commentRes] = await Promise.all([
          API.get(`/videos/${videoId}`),
          API.get(`/comments/${videoId}`),
        ]);

        const videoData = videoRes.data.data;

        setVideo(videoData);
        setComments(commentRes.data.data || commentRes.data || []);

        if (user) {
          setLiked(videoData.likes?.includes(user._id));
          setDisliked(videoData.dislikes?.includes(user._id));
        }
      } catch (err) {
        console.error("LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId, user]);

  // ==============================
  // 👍 LIKE / DISLIKE
  // ==============================
  const handleLike = async () => {
    if (!user) return;

    const res = await API.put(`/videos/${videoId}/like`);

    setLiked(!liked);
    setDisliked(false);

    setVideo((prev) => ({
      ...prev,
      likes: res.data.likes,
      dislikes: res.data.dislikes,
    }));
  };

  const handleDislike = async () => {
    if (!user) return;

    const res = await API.put(`/videos/${videoId}/dislike`);

    setDisliked(!disliked);
    setLiked(false);

    setVideo((prev) => ({
      ...prev,
      likes: res.data.likes,
      dislikes: res.data.dislikes,
    }));
  };

  // ==============================
  // 💬 ADD COMMENT
  // ==============================
  const handleComment = async () => {
    if (!user || !comment.trim()) return;

    try {
      await API.post("/comments", {
        text: comment,
        videoId,
      });

      const res = await API.get(`/comments/${videoId}`);
      setComments(res.data.data || res.data || []);
      setComment("");
    } catch (err) {
      console.error("COMMENT ERROR:", err);
    }
  };

  // ==============================
  // ✏️ EDIT / DELETE COMMENT
  // ==============================
  const handleDeleteComment = async (id) => {
    try {
      await API.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const handleEditComment = (c) => {
    setEditingId(c._id);
    setEditText(c.text);
  };

  const handleUpdateComment = async () => {
    try {
      await API.put(`/comments/${editingId}`, {
        text: editText,
      });

      const res = await API.get(`/comments/${videoId}`);
      setComments(res.data.data || res.data || []);

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  // ==============================
  // 🎬 VIDEO OWNER ACTIONS
  // ==============================
  const handleDeleteVideo = async () => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await API.delete(`/videos/${videoId}`);
      alert("Video deleted");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditVideo = async () => {
    const newTitle = prompt("Enter new title", video.title);
    if (!newTitle) return;

    try {
      const res = await API.put(`/videos/${videoId}`, {
        title: newTitle,
      });

      setVideo(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==============================
  // UI STATES
  // ==============================
  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;
  if (!video) return <div>No video found</div>;

  return (
    <div className="video-player-page">
      <div className="video-player-main">

        {/* 🎬 VIDEO */}
        <video
          className="video-player"
          src={video.videoUrl}
          poster={video.thumbnail}
          controls
        />

        <h2 className="video-player-title">{video.title}</h2>

        {/* 👤 CHANNEL */}
        <div className="video-player-channel-row">
          <Link to={`/channels/${video?.channel?._id}`}>
            <img
              src={video.channel?.channelPic || "https://img.youtube.com/vi/bupN-xuCVt4/mqdefault.jpg"}
              className="video-player-channel-pic"
            />
          </Link>
          <div>{video.channel?.channelName}</div>
        </div>

        {/* 👍 ACTIONS */}
        <div className="video-player-actions">
          <button onClick={handleLike}>
            {liked ? <AiFillLike /> : <AiOutlineLike />}
            {video.likes?.length || 0}
          </button>

          <button onClick={handleDislike}>
            {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            {video.dislikes?.length || 0}
          </button>

          <button><IoMdShare /> Share</button>
          <button><MdDownload /> Download</button>
        </div>

        {/* 🎯 OWNER CONTROLS */}
        {String(user?._id) === String(video.user?._id || video.user) && (
          <div style={{ marginTop: 10 }}>
            <button onClick={handleEditVideo}>Edit</button>
            <button onClick={handleDeleteVideo}>Delete</button>
          </div>
        )}

        {/* 📄 DESCRIPTION */}
        <p className="video-player-description">{video.description}</p>

        {/* ==============================
            💬 COMMENTS SECTION
        ============================== */}
        <div className="video-player-comments">
          <h3 className="video-player-comments-title">
            {comments.length} Comments
          </h3>

          {/* ADD COMMENT */}
          <div className="video-player-add-comment">
            <input
              className="video-player-comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              className="video-player-comment-btn"
              onClick={handleComment}
            >
              Comment
            </button>
          </div>

          {/* COMMENT LIST */}
          <div className="video-player-comments-list">
            {comments.map((c) => (
              <div key={c._id} className="video-player-comment">

                {/* avatar */}
                <div className="video-player-comment-avatar">
                  {c.user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="video-player-comment-body">

                  <div className="video-player-comment-header">
                    <span className="video-player-comment-username">
                      {c.user?.username || "User"}
                    </span>
                  </div>

                  {/* edit mode */}
                  {editingId === c._id ? (
                    <div className="comment-edit-box">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={handleUpdateComment}>Save</button>
                    </div>
                  ) : (
                    <div className="video-player-comment-text">
                      {c.text}
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  {user?._id === video.user}{(
                    <div className="comment-actions">
                      <button onClick={() => handleEditComment(c)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteComment(c._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📺 SIDEBAR */}
      <div className="video-player-sidebar">
        {STATIC_RECOMMENDED.map((v) => (
          <Link key={v._id} to={`/video/${v._id}`}>
            <img src={v.thumbnail} width="120" />
            <p>{v.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;