// shows individual video

import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <img
        src={video.thumbnail || "https://via.placeholder.com/300x180"}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h4 style={{ margin: "5px 0" }}>{video.title}</h4>
      <p style={{ color: "gray" }}>{video.channel?.channelName}</p>
      <p style={{ color: "gray" }}>{video.views} views</p>
    </div>
  );
}

export default VideoCard;