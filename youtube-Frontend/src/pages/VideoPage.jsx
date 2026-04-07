import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, []);

  // Fetch video
  const fetchVideo = async () => {
    const res = await axios.get(`http://localhost:9090/api/videos/${id}`);
    setVideo(res.data);
  };

  // Fetch comments
  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:9090/api/comments/${id}`);
    setComments(res.data);
  };

  // Like
  const handleLike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  // Dislike
  const handleDislike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  // Add comment
  const addComment = async () => {
    if (!comment.trim()) return;

    await axios.post(
      "http://localhost:9090/api/comments",
      { videoId: id, text: comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setComment("");
    fetchComments();
  };

  // Update comment
  const updateComment = async (commentId) => {
    await axios.put(
      `http://localhost:9090/api/comments/${commentId}`,
      { text: editText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditId(null);
    setEditText("");
    fetchComments();
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    await axios.delete(
      `http://localhost:9090/api/comments/${commentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchComments();
  };

  if (!video) return <p className="text-white p-5">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen p-5">

      {/* 🎬 Video Player */}
      <div className="max-w-4xl mx-auto">
        <video
          src={video.videoUrl}
          controls
          className="w-full rounded-lg"
        />

        {/* 🎯 Title */}
        <h2 className="text-xl font-semibold mt-3">
          {video.title}
        </h2>

        {/* 📊 Channel + Buttons */}
        <div className="flex justify-between items-center mt-4 flex-wrap gap-3">

          {/* Channel Info */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="font-semibold">{video.channel}</p>
              <p className="text-gray-400 text-sm">1.2M subscribers</p>
            </div>

            <button className="bg-red-600 px-4 py-1 rounded-full ml-3">
              Subscribe
            </button>
          </div>

          {/* Like / Dislike */}
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className="bg-gray-800 px-4 py-1 rounded-full"
            >
              👍 {video.likes}
            </button>

            <button
              onClick={handleDislike}
              className="bg-gray-800 px-4 py-1 rounded-full"
            >
              👎 {video.dislikes}
            </button>
          </div>

        </div>

        {/* 📄 Description */}
        <div className="bg-gray-900 p-3 rounded mt-4 text-sm">
          {video.description || "No description available"}
        </div>

        {/* 💬 Comments Section */}
        <div className="mt-6">

          <h3 className="text-lg mb-3">
            {comments.length} Comments
          </h3>

          {/* Add Comment */}
          <div className="flex gap-2 mb-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-gray-800 p-2 rounded"
              placeholder="Add a comment..."
            />

            <button
              onClick={addComment}
              className="bg-blue-500 px-4 rounded"
            >
              Post
            </button>
          </div>

          {/* Comment List */}
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 bg-gray-900 p-3 rounded mb-2"
            >
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full"
              />

              <div className="flex-1">

                {editId === c._id ? (
                  <div className="flex gap-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 bg-gray-800 p-1 rounded"
                    />

                    <button
                      onClick={() => updateComment(c._id)}
                      className="text-green-400"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm">{c.text}</p>

                    <div className="flex gap-3 mt-1 text-sm">

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
                  </>
                )}

              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default VideoPage;