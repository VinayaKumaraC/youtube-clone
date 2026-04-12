import { useEffect, useState } from "react";
import API from "../api/axios";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchVideos = async () => {
    const res = await API.get(`/videos?search=${search}&category=${category}`);
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, [search, category]);

  return (
    <div>
      <Header setSearch={setSearch} />

      <div style={{ display: "flex" }}>
        <Sidebar setCategory={setCategory} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            padding: "20px",
            flex: 1,
          }}
        >
          {videos.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;