import { useEffect, useState } from "react";
import API from "../api/axios";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    API.get("/videos").then((res) => {
      const data = res.data;
      setVideos(Array.isArray(data) ? data : [data]);
    });
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {videos.map((v) => (
          <VideoCard key={v._id?.$oid || v._id} video={v} />
        ))}
      </div>
    </div>
  );
}
