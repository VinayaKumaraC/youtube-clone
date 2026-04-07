import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get("http://localhost:9090/api/videos");
      setVideos(res.data);
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>All Videos</h2>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;