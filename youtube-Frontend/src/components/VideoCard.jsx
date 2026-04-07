import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="cursor-pointer hover:scale-105 transition">

        <img
          src={video.thumbnail || "https://via.placeholder.com/300x180"}
          className="rounded-xl w-full h-44 object-cover"
        />

        <div className="flex gap-3 mt-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full"
          />

          <div>
            <h3 className="text-white text-sm font-semibold">
              {video.title}
            </h3>

            <p className="text-gray-400 text-xs">
              {video.channel}
            </p>

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