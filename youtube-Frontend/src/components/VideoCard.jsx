import { Link } from "react-router-dom";

// Video card component to display video thumbnail and details
const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>

      <div className="cursor-pointer">

        <img src={video.thumbnail} className="rounded-lg" />

        <h3 className="text-white mt-2 text-sm">{video.title}</h3>
        <p className="text-gray-400 text-xs">{video.channel}</p>
        <p className="text-gray-500 text-xs">{video.views}</p>

      </div>

    </Link>
  );
};

export default VideoCard;