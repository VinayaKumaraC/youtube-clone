import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="hover:scale-105 transition">

        <img
          src={video.thumbnail}
          className="rounded-xl w-full h-44 object-cover"
        />

        <h3 className="mt-2 text-sm font-semibold">
          {video.title}
        </h3>

        <p className="text-gray-400 text-xs">
          {video.channel}
        </p>

      </div>
    </Link>
  );
};

export default VideoCard;