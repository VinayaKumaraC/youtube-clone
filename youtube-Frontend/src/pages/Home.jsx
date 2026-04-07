import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/videos");
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter videos
  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || v.category === category)
  );

  return (
    <div className="bg-black min-h-screen">

      {/* Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-5">

          {/* Filters */}
          <div className="flex gap-3 mb-5 overflow-x-auto">
            {["All", "React", "Music", "Gaming", "News", "Programming"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1 rounded-full ${
                  category === cat
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {filteredVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;