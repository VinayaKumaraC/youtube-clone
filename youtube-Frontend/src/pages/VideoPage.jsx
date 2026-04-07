import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VideoPage = () => {
  // Get video ID from URL
  const { id } = useParams();

  // State to store video data
  const [video, setVideo] = useState(null);

  // State for comment input
  const [comment, setComment] = useState("");

  // Fetch video details when page loads
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9090/api/videos/${id}`
        );
        setVideo(res.data);
      } catch (error) {
        console.log("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Handle like button
  const handleLike = async () => {
    try {
      await axios.put(
        `http://localhost:9090/api/videos/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error liking video:", error);
    }
  };

  // Add comment
  const handleComment = async () => {
    try {
      await axios.post(
        "http://localhost:9090/api/comments",
        {
          text: comment,
          videoId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear input after posting
      setComment("");
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  // Show loading if video not yet fetched
  if (!video) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen p-5">

      <h2 className="text-xl font-semibold mb-4">
        {video.title}
      </h2>

      <video
        src={video.url}
        controls
        className="w-full max-w-3xl rounded-lg"
      />

      <p className="mt-3 text-gray-300">{video.description}</p>

      <div className="mt-4 space-x-4">
        <button
          onClick={handleLike}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          👍 {video.likes}
        </button>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h3 className="text-lg">Comments</h3>

        <textarea
          className="w-full mt-2 p-2 bg-gray-900 border border-gray-700 rounded"
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleComment}
          className="mt-2 bg-red-600 px-4 py-2 rounded hover:bg-red-500"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default VideoPage;