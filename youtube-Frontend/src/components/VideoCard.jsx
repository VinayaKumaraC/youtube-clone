import { Link } from "react-router-dom";

// VideoCard component to display video thumbnail, title, channel, views, and upload date
const VideoCard = ({ video }) => {
  return (
    // Link to video page on click
    <Link to={`/video/${video._id}`}>
      <div className="cursor-pointer">
        <img src={video.thumbnail} className="rounded-lg" />

        <h3 className="text-white mt-2 text-sm">{video.title}</h3>

        {/* Link to channel page on click */}
        <Link to={`/channel/${video.channel}`}>
          <p className="text-gray-400 text-xs">{video.channel}</p>
        </Link>

        {/* Views and upload date */}
        <p className="text-gray-500 text-xs">
          {video.views} • {new Date(video.createdAt).toDateString()}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;
