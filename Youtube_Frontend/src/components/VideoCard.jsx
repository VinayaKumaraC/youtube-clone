// shows individual video

import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`}>
      <div>
        <img src={video.thumbnail || "https://via.placeholder.com/200"} width="200" />
        <h4>{video.title}</h4>
        <p>{video.channel?.channelName}</p>
        <p>{video.views} views</p>
      </div>
    </Link>
  );
}

export default VideoCard;