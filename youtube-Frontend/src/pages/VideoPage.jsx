import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Video page component
const VideoPage = () => {
  const { id } = useParams();

  // State for video
  const [video, setVideo] = useState(null);

  // State for new comment
  const [comment, setComment] = useState("");

  // State for all comments
  const [comments, setComments] = useState([]);

  // State for editing comment
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  // Fetch video and comments on load
  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, []);

  // Get video details
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:9090/api/videos/${id}`);
      setVideo(res.data);
    } catch (error) {
      console.log("Error fetching video:", error);
    }
  };

  // Get comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:9090/api/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  // 👍 Like video
  const handleLike = async () => {
    try {
      await axios.put(
        `http://localhost:9090/api/videos/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchVideo(); // refresh UI
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  // 👎 Dislike video
  const handleDislike = async () => {
    try {
      await axios.put(
        `http://localhost:9090/api/videos/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchVideo();
    } catch (error) {
      console.log("Dislike error:", error);
    }
  };

  // 💬 Add comment
  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await axios.post(
        "http://localhost:9090/api/comments",
        { videoId: id, text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComment("");
      fetchComments();
    } catch (error) {
      console.log("Add comment error:", error);
    }
  };

  // Update comment
  const updateComment = async (commentId) => {
    if (!editText.trim()) return;
    try {
      await axios.put(
        `http://localhost:9090/api/comments/${commentId}`,
        { text: editText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditId(null);
      setEditText("");
      fetchComments();
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:9090/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchComments();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Loading state
  if (!video) {
    return <p className="text-white p-5">Loading...</p>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-5">
      {/* 🎬 Video Player */}
      <video src={video.videoUrl} controls className="w-full rounded" />

      {/* Title */}
      <h2 className="text-xl mt-3">{video.title}</h2>

      {/*  Buttons */}
      <div className="flex gap-3 mt-3">
        <button onClick={handleLike} className="bg-gray-800 px-3 py-1 rounded">
          👍 {video.likes}
        </button>

        <button
          onClick={handleDislike}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          👎 {video.dislikes}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-5">
        <h3 className="text-lg">Comments</h3>

        {/* Add Comment */}
        <div className="flex gap-2 mt-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 bg-gray-800 p-2 rounded"
            placeholder="Add a comment..."
          />

          <button onClick={addComment} className="bg-blue-500 px-4 rounded">
            Post
          </button>
        </div>

        {/* Comment List */}
        {comments.map((c) => (
          <div key={c._id} className="bg-gray-900 p-2 mt-2 rounded">
            {editId === c._id ? (
              // ✏ Edit View
              <div className="flex gap-2">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-gray-800 p-1 rounded"
                />

                <button
                  onClick={() => updateComment(c._id)}
                  className="bg-blue-500 px-4 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              // 👁 Normal View
              <div className="flex justify-between items-center">
                <p>{c.text}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditId(c._id);
                      setEditText(c.text);
                    }}
                    className="text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteComment(c._id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
