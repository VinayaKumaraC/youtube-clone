import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { videos as sampleVideos } from "../data/videos";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch videos from backend
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/videos");

      // If backend has data → use it
      if (res.data.length > 0) {
        setVideos(res.data);
      } else {
        // fallback to sample data
        setVideos(sampleVideos);
      }

    } catch (error) {
      console.log("API failed, using sample data");

      // fallback if API fails
      setVideos(sampleVideos);
    }
  };

  // Filter videos
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="flex">

        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-5">

          {/* Search */}
          <input
            placeholder="Search videos..."
            className="mb-5 p-2 w-full bg-gray-900 border border-gray-700 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Video Grid */}
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