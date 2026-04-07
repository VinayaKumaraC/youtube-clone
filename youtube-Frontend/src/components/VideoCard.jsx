import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>

      <div className="cursor-pointer">

        {/* Thumbnail */}
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="rounded-lg w-full"
        />

        {/* Details */}
        <div className="mt-2 flex gap-2">

          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />

          <div>
            <h3 className="text-white text-sm font-semibold">
              {video.title}
            </h3>

            <p className="text-gray-400 text-xs">
              {video.channel}
            </p>

            <p className="text-gray-500 text-xs">
              {video.views}
            </p>
          </div>

        </div>

      </div>

    </Link>
  );
};

export default VideoCard;