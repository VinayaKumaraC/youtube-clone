import { Link } from "react-router-dom";

// Video card component
const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="cursor-pointer">

        {/* Thumbnail (fallback UI if no thumbnail) */}
        <div className="bg-gray-800 h-40 rounded-lg"></div>

        {/* Details */}
        <div className="mt-2 flex gap-2">

          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />

          <div>
            {/* Title */}
            <h3 className="text-white text-sm font-semibold">
              {video.title}
            </h3>

            {/* User */}
            <p className="text-gray-400 text-xs">
              👤 {video.user?.email || "Unknown"}
            </p>

            {/* Likes */}
            <p className="text-gray-500 text-xs">
              👍 {video.likes || 0}
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default VideoCard;