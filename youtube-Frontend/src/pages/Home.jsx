import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  //store all videos
  const [videos, setVideos] = useState([]);

  // search input
  const [search, setSearch] = useState("");

  // Fetch videos when component loads
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Call backend API
        const res = await axios.get("http://localhost:9090/api/videos");
        setVideos(res.data);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search input
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar section */}
      <div
        style={{
          width: "200px",
          padding: "10px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Menu</h3>
        <p>Home</p>
        <p>Trending</p>
        <p>Subscriptions</p>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, padding: "20px" }}>
        
        {/* Header with title and search */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <h2 style={{ marginRight: "20px" }}>🎥 YouTube Clone</h2>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />

          {/* Navigation links */}
          <Link to="/login" style={{ marginLeft: "10px" }}>
            Login
          </Link>
          <Link to="/register" style={{ marginLeft: "10px" }}>
            Register
          </Link>
        </div>

        {/* Video grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((video) => (
            <Link to={`/video/${video._id}`} key={video._id}>
              
              {/* Single video card */}
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <h4>{video.title}</h4>
                <p>{video.description}</p>

                {/* Show uploader name */}
                <p>👤 {video.user?.name}</p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;