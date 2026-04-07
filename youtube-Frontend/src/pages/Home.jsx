import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch videos
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

  // Search filter
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Videos</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      {/* Video List */}
      <div>
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
              }}
            >
              <Link to={`/video/${video._id}`}>
                <h3>{video.title}</h3>
              </Link>

              <p>{video.description}</p>

              {/* Show uploader name */}
              <p>By: {video.user?.name || "Unknown"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;