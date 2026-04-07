import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

// Home page component to display list of videos
const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch videos from backend
  const fetchVideos = async () => {
    const res = await axios.get("http://localhost:9090/api/videos");
    setVideos(res.data);
  };

  // Render home page with navbar, sidebar, and video cards
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/*Main content area with sidebar and video grid*/}
      <div className="flex">
        <Sidebar />

        {/* Video grid */}
        <div className="flex-1 p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;