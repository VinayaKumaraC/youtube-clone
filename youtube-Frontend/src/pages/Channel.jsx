import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const ChannelPage = () => {
  const { channelName } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchChannelVideos();
  }, [channelName]);

  const fetchChannelVideos = async () => {
    const res = await axios.get(
      `http://localhost:9090/api/videos/channel/${channelName}`
    );
    setVideos(res.data);
  };

  return (
    <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-5">

        {/* HEADER */}
        <div className="flex items-center gap-5 mb-6">
          <img src="https://i.pravatar.cc/100" className="rounded-full" />

          <div>
            <h2 className="text-2xl font-bold">{channelName}</h2>
            <p className="text-gray-500">
              {videos.length} videos
            </p>
          </div>
        </div>

        {/* VIDEOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((v) => (
            <Link to={`/video/${v._id}`} key={v._id}>
              <img src={v.thumbnail} className="rounded" />
              <p className="text-sm mt-2">{v.title}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ChannelPage;