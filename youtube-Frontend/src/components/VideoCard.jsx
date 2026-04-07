import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>

      <div className="cursor-pointer hover:scale-105 transition">

        {/* Thumbnail */}
        <div className="bg-gray-800 h-40 rounded-lg"></div>

        {/* Info */}
        <div className="mt-2">
          <h3 className="text-sm font-semibold text-white">
            {video.title}
          </h3>

          <p className="text-xs text-gray-400">
            👤 {video.user?.name}
          </p>
        </div>

      </div>

    </Link>
  );
};

export default VideoCard;