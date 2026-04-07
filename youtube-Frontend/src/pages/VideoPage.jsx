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
  if (!video) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Video title */}
      <h2>{video.title}</h2>

      {/* Video player */}
      <video src={video.url} controls width="600" />

      {/* Video description */}
      <p>{video.description}</p>

      {/* Like button */}
      <button onClick={handleLike}>
        👍 {video.likes}
      </button>

      <hr />

      {/* Comment section */}
      <h3>Comments</h3>

      {/* Comment input */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add comment"
      />

      <br />

      {/* Submit comment */}
      <button onClick={handleComment}>
        Post
      </button>
    </div>
  );
};

export default VideoPage;