import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch videos
  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch all videos from the backend
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/videos");
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  // Render the home page with navbar, sidebar, search bar, and video grid
  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="flex">

        <Sidebar />

        {/* Content */}
        <div className="flex-1 p-5">

          {/* Search */}
          <input
            placeholder="Search videos..."
            className="mb-5 p-2 w-full bg-gray-900 border border-gray-700 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;