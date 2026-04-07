import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch video + comments
  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, []);

  // Fetch video details
  const fetchVideo = async () => {
    const res = await axios.get(
      `http://localhost:9090/api/videos/${id}`
    );
    setVideo(res.data);
  };

  // Fetch comments
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:9090/api/comments/${id}`
    );
    setComments(res.data);
  };

  // Like
  const handleLike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/like/${id}`
    );
    fetchVideo();
  };

  //  Dislike
  const handleDislike = async () => {
    await axios.put(
      `http://localhost:9090/api/videos/dislike/${id}`
    );
    fetchVideo();
  };

  // Add comment
  const addComment = async () => {
    await axios.post(
      "http://localhost:9090/api/comments",
      { videoId: id, text: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComment("");
    fetchComments();
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    await axios.delete(
      `http://localhost:9090/api/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchComments();
  };

  if (!video) return <p className="text-white">Loading...</p>;

  // Video page component to display video details, like/dislike buttons, and comments
  return (
    <div className="bg-black text-white min-h-screen p-5">

      {/* Video */}
      <video
        src={video.videoUrl}
        controls
        className="w-full rounded"
      />

      {/* Title */}
      <h2 className="text-xl mt-3">{video.title}</h2>

      {/* Buttons */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleLike}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          👍 {video.likes}
        </button>

        <button
          onClick={handleDislike}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          👎 {video.dislikes}
        </button>
      </div>

      {/* Comments */}
      <div className="mt-5">
        <h3 className="text-lg">Comments</h3>

        {/* Input */}
        <div className="flex gap-2 mt-2">
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
            className="flex justify-between bg-gray-900 p-2 mt-2 rounded"
          >
            <p>{c.text}</p>

            {/* Delete button */}
            <button
              onClick={() => deleteComment(c._id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default VideoPage;