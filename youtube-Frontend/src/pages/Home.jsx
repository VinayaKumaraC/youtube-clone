import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";

const Home = () => {
  //store all videos
  const [videos, setVideos] = useState([]);

  // Fetch videos when component loads
   useEffect(() => {
    const fetchVideos = async () => {
        //  API call to get videos
      const res = await axios.get("http://localhost:9090/api/videos");
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

 return (
    <div className="bg-black min-h-screen">

      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <div className="w-56 p-4 text-gray-300 hidden md:block">
          <p className="mb-2">Home</p>
          <p className="mb-2">Trending</p>
          <p className="mb-2">Subscriptions</p>
        </div>

        {/* Videos */}
        <div className="flex-1 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;