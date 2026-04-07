import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="cursor-pointer">

        {/* ✅ Thumbnail */}
        <img
          src={
            video.thumbnail ||
            "https://via.placeholder.com/300x180?text=No+Thumbnail"
          }
          alt="thumbnail"
          className="rounded-lg w-full h-40 object-cover"
        />

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

            {/* Channel / User */}
            <p className="text-gray-400 text-xs">
              {video.channel || video.user?.email || "Unknown"}
            </p>

            {/* Stats */}
            <p className="text-gray-500 text-xs">
              👁 {video.views || 0} • 👍 {video.likes || 0} • 👎 {video.dislikes || 0}
            </p>

          </div>

        </div>
      </div>
    </Link>
  );
};

export default VideoCard;