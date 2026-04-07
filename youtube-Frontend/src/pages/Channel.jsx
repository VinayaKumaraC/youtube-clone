import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

// Channel page component to display channel details and videos
const ChannelPage = () => {
  const { channelName } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchChannelVideos();
  }, []);

  // Fetch channel videos
  const fetchChannelVideos = async () => {
    const res = await axios.get(
      `http://localhost:9090/api/videos/channel/${channelName}`
    );
    setVideos(res.data);
  };

  // Render channel page
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-5">

        {/* Channel Header */}
        <div className="flex items-center gap-5 mb-6">
          <img
            src="https://i.pravatar.cc/100"
            className="w-24 h-24 rounded-full"
          />

          <div>
            <h2 className="text-2xl font-bold">{channelName}</h2>
            <p className="text-gray-400">32 subscribers • {videos.length} videos</p>

            <button className="bg-white text-black px-4 py-1 rounded-full mt-2">
              Subscribe
            </button>
          </div>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((v) => (
            <div key={v._id}>
              <img src={v.thumbnail} className="rounded" />
              <p className="text-sm mt-2">{v.title}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ChannelPage;