import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get("http://localhost:9090/api/videos");
    setVideos(res.data);
  };

  const filtered = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || v.category === category)
  );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">

      <Navbar
        setSearch={setSearch}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">

        <Sidebar open={sidebarOpen} />

        <div className="flex-1 p-5 ml-0 md:ml-60">

          {/* FILTERS */}
          <div className="flex gap-3 mb-5 overflow-x-auto">
            {["All", "React", "Music", "Gaming", "News", "Programming"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1 rounded-full ${
                    category === cat
                      ? "bg-white text-black"
                      : "bg-gray-800"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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