// video player page with comments

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import CommentBox from "../components/CommentBox";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    API.get(`/videos/${id}`).then((res) => setVideo(res.data));
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <video src={video.videoUrl} controls width="600" />
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <p>{video.views} views</p>

      <button onClick={() => API.put(`/videos/${id}/like`)}>Like</button>
      <button onClick={() => API.put(`/videos/${id}/dislike`)}>Dislike</button>

      <CommentBox videoId={id} />
    </div>
  );
}

export default VideoPlayer;
