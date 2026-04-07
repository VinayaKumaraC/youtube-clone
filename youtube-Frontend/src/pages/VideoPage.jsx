import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(
        `http://localhost:9090/api/videos/${id}`
      );
      setVideo(res.data);
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <video src={video.url} controls width="500" />
    </div>
  );
};

export default VideoPage;