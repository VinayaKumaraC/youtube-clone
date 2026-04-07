import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/videos"
        );
        setVideos(res.data);
      } catch (error) {
        console.log("Error fetching videos");
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <h2>All Videos</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Video List */}
      {filteredVideos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        filteredVideos.map((video) => (
          <div
            key={video._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            {/* Video Title (Clickable) */}
            <Link to={`/video/${video._id}`}>
              <h3>{video.title}</h3>
            </Link>

            <p>{video.description}</p>

            {/* Show uploader */}
            <p>
              <strong>By:</strong>{" "}
              {video.user?.name || "Unknown"}
            </p>

            {/* Show likes */}
            <p>
              👍 {video.likes || 0} | 👎 {video.dislikes || 0}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;