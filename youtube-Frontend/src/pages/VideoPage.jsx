import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

// Video page component to display video details, comments, and suggested videos
const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [suggested, setSuggested] = useState([]);

  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  // Fetch video details, comments, and suggested videos on component mount
  useEffect(() => {
    fetchVideo();
    fetchComments();
    fetchSuggested();
  }, []);

  // Fetch video details from backend
  const fetchVideo = async () => {
    const res = await axios.get(`http://localhost:9090/api/videos/${id}`);
    setVideo(res.data);
  };

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:9090/api/comments/${id}`);
    setComments(res.data);
  };

  const fetchSuggested = async () => {
    const res = await axios.get("http://localhost:9090/api/videos");
    setSuggested(res.data);
  };

  // Handle like, dislike, add comment, update comment, and delete comment actions
  const like = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  const dislike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  const addComment = async () => {
    await axios.post(
      "http://localhost:9090/api/comments",
      { videoId: id, text: comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComment("");
    fetchComments();
  };

  const updateComment = async (cid) => {
    await axios.put(
      `http://localhost:9090/api/comments/${cid}`,
      { text: editText },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditId(null);
    fetchComments();
  };

  const deleteComment = async (cid) => {
    await axios.delete(
      `http://localhost:9090/api/comments/${cid}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchComments();
  };

  if (!video) return <p className="text-white p-5">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex p-5 gap-5">

        {/* LEFT */}
        <div className="flex-1">

          <video src={video.videoUrl} controls className="w-full rounded" />

          <h2 className="text-xl mt-3">{video.title}</h2>

          <p className="text-gray-400 text-sm">
            {video.views} • {new Date(video.createdAt).toDateString()}
          </p>

          <div className="flex gap-3 mt-3">
            <button onClick={like} className="bg-gray-800 px-3 rounded">
              👍 {video.likes}
            </button>

            <button onClick={dislike} className="bg-gray-800 px-3 rounded">
              👎 {video.dislikes}
            </button>
          </div>

          {/* COMMENTS */}
          <div className="mt-5">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-800 p-2 w-full rounded"
              placeholder="Add comment..."
            />

            <button onClick={addComment} className="bg-blue-500 mt-2 px-3">
              Post
            </button>

            {comments.map((c) => (
              <div key={c._id} className="mt-3 bg-gray-900 p-2 rounded">

                {editId === c._id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-gray-800 p-1"
                    />
                    <button onClick={() => updateComment(c._id)}>Save</button>
                  </>
                ) : (
                  <>
                    <p>{c.text}</p>
                    <button onClick={() => {
                      setEditId(c._id);
                      setEditText(c.text);
                    }}>Edit</button>

                    <button onClick={() => deleteComment(c._id)}>Delete</button>
                  </>
                )}

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="w-80 hidden md:block">
          {suggested.map((v) => (
            <div key={v._id} className="flex gap-2 mb-3">
              <img src={v.thumbnail} className="w-32 rounded" />
              <p className="text-sm">{v.title}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VideoPage;