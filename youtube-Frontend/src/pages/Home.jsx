import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get("http://localhost:9090/api/videos");
    setVideos(res.data);
  };

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout setSearch={setSearch}>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

    </Layout>
  );
};

export default Home;