import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const VideoPage = () => {
  // Get video ID from URL
  const { id } = useParams();

  // State to store video data
  const [video, setVideo] = useState(null);

  // Fetch video details when page loads
   useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`http://localhost:9090/api/videos/${id}`);
      setVideo(res.data);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="p-5">
        <h2 className="text-xl mb-3">{video.title}</h2>

        <video src={video.url} controls className="w-full max-w-3xl" />

        <p className="mt-3 text-gray-400">{video.description}</p>

        <button className="mt-4 bg-gray-800 px-4 py-2 rounded">
          👍 {video.likes}
        </button>
      </div>
    </div>
  );
};

export default VideoPage;