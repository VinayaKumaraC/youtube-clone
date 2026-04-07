import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("All");

  // 🔹 Fetch videos from backend
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/videos");
      setVideos(res.data);
    } catch (error) {
      console.log("Error fetching videos:", error);
    }
  };

  // 🔹 Filter logic
  const filteredVideos =
    filter === "All"
      ? videos
      : videos.filter((v) => v.category === filter);
      
    // Home page component to display videos with filters, navbar, and sidebar  
    return (
    <div className="bg-black min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Filters setFilter={setFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">

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