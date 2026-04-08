import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    API.get("/videos").then((res) => setVideos(res.data));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="grid grid-cols-4 gap-4 p-4">
          {videos.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
}