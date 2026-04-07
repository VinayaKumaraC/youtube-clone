import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";



const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]); // suggested videos
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVideo();
    fetchComments();
    fetchAllVideos();
  }, [id]);

  // 🎥 Get single video
  const fetchVideo = async () => {
    const res = await axios.get(`http://localhost:9090/api/videos/${id}`);
    setVideo(res.data);
  };

  // 📺 Get all videos (for suggestions)
  const fetchAllVideos = async () => {
    const res = await axios.get("http://localhost:9090/api/videos");
    setVideos(res.data);
  };

  // 💬 Get comments
  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:9090/api/comments/${id}`);
    setComments(res.data);
  };

  // 👍 Like
  const handleLike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  // 👎 Dislike
  const handleDislike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  // ➕ Add comment
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

  // ✏️ Update comment
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

  // ❌ Delete comment
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

      <div className="flex gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex-1 max-w-4xl">

          {/* 🎬 VIDEO */}
          <video
            src={video.videoUrl}
            controls
            className="w-full rounded-lg"
          />

          {/* TITLE */}
          <h2 className="text-xl font-semibold mt-3">
            {video.title}
          </h2>

          {/* CHANNEL + ACTIONS */}
          <div className="flex justify-between items-center mt-4 flex-wrap gap-3">

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

            {/* LIKE / DISLIKE */}
            <div className="flex gap-3">
              <button
                onClick={handleLike}
                className="bg-gray-800 px-4 py-1 rounded-full hover:bg-gray-700"
              >
                👍 {video.likes}
              </button>

              <button
                onClick={handleDislike}
                className="bg-gray-800 px-4 py-1 rounded-full hover:bg-gray-700"
              >
                👎 {video.dislikes}
              </button>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="bg-gray-900 p-3 rounded mt-4 text-sm">
            {video.description || "No description available"}
          </div>

          {/* ================= COMMENTS ================= */}
          <div className="mt-6">

            <h3 className="text-lg mb-3">
              {comments.length} Comments
            </h3>

            {/* ADD COMMENT */}
            <div className="flex gap-2 mb-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-gray-800 p-2 rounded outline-none"
                placeholder="Add a comment..."
              />

              <button
                onClick={addComment}
                className="bg-blue-500 px-4 rounded hover:bg-blue-600"
              >
                Post
              </button>
            </div>

            {/* COMMENT LIST */}
            {comments.map((c) => (
              <div
                key={c._id}
                className="flex gap-3 bg-gray-900 p-3 rounded mb-2 hover:bg-gray-800"
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

                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditText("");
                        }}
                        className="text-gray-400"
                      >
                        Cancel
                      </button>

                    </div>
                  ) : (
                    <>
                      <p className="text-sm">{c.text}</p>

                      <div className="flex gap-4 mt-1 text-xs text-gray-400">

                        <button
                          onClick={() => {
                            setEditId(c._id);
                            setEditText(c.text);
                          }}
                          className="hover:text-blue-400"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteComment(c._id)}
                          className="hover:text-red-400"
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

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-80 hidden lg:block">

          <h3 className="mb-3 text-gray-400">Suggested Videos</h3>

          {videos
            .filter((v) => v._id !== video._id)
            .slice(0, 10)
            .map((v) => (
              <Link to={`/video/${v._id}`} key={v._id}>
                <div className="flex gap-3 mb-4 cursor-pointer hover:bg-gray-900 p-2 rounded">

                  <img
                    src={v.thumbnail}
                    className="w-40 h-24 object-cover rounded"
                  />

                  <div>
                    <p className="text-sm font-semibold line-clamp-2">
                      {v.title}
                    </p>

                    <p className="text-xs text-gray-400">
                      {v.channel}
                    </p>

                    <p className="text-xs text-gray-500">
                      👁 {v.views}
                    </p>
                  </div>

                </div>
              </Link>
            ))}

        </div>

      </div>
    </div>
  );
};

export default VideoPage;